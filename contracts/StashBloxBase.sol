// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import "./lib/utils/SafeMath.sol";
import "./lib/ERC173/ERC173.sol";

contract OwnableDelegateProxy { }

contract ProxyRegistry {
  mapping(address => OwnableDelegateProxy) public proxies;
}

contract StashBloxBase is ERC173 {

    using SafeMath for uint256;

    /***************************************
    TYPES
    ****************************************/


    struct User {
        bool isTokenizer;
        bool isLocked;
        uint256 ETHBalance;
        uint256[] tokens;
    }

    struct Holder {
        uint256 balance;
        uint256 birthday;
        bool isMaintener;
        bool isHolder; // never come back to false
        bool isApproved; // for private tokens
    }

    struct Token {
        uint256 supply;
        uint256 decimals;
        uint256 lumpSumTransactionFees;
        uint256 valueTransactionFees;
        uint256 minHoldingForCallback;
        uint256 metadataHash;
        address legalAuthority;
        bool isPrivate;
        bool locked;
        mapping(address => Holder) holders;
        address[] holderList; // Can contains zero balance
        address[] feesRecipients;
        uint256[] feesRecipientsPercentage;
        uint256[2][] storageCostHistory; //list of tuple [timestamp, price]
    }

    struct Callback {
        uint256 tokenId;
        uint256 price;
        uint256 escrowedAmount;
        uint256 callCounter;
        uint256 documentHash;
        address caller;
        bool needLegalApproval;
        bool approvedByLegal;
        bool refused;
        bool accepted;
        bool completed;
        address[] callees;
    }

    struct Config {
        uint256 callbackAutoExecuteMaxAddresses;
        string baseURI;
        address[10] proxyRegistryAddresses;
    }


    /***************************************
    GLOBAL VARIABLES
    ****************************************/

    Config public  _config;
    mapping (address => User) public _users;
    mapping (uint256 => Token) public _tokens;
    mapping (uint256 => Callback) public _callbacks;


    /***************************************
    EVENTS
    ****************************************/


    event CallbackUpdated(uint256 indexed _CallbackId);
    event TokenUpdated(uint256 indexed _id, uint256 _documentHash);


    /***************************************
    PERMISSIONS
    ****************************************/

    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _users[tokenizer].isTokenizer || _isOwner();
    }

    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "Insufficient permission");
        _;
    }

    function _isMaintener(uint256 id, address maintener) internal view returns (bool) {
        return _tokens[id].holders[maintener].isMaintener || _isOwner();
    }

    modifier onlyMaintener(uint256 id) {
        require(_isMaintener(id, msg.sender), "Insufficient permission");
        _;
    }

    function _isLegalAuthority(uint256 id, address legalAuthority) internal view returns (bool) {
        return _tokens[id].legalAuthority == legalAuthority;
    }


    /***************************************
    LOCKS FUNCTIONS
    ****************************************/


    function _lockToken(uint256 id, uint256 documentHash) internal {
        _tokens[id].locked = true;
        emit TokenUpdated(id, documentHash);
    }

    function _unlockToken(uint256 id, uint256 documentHash) internal {
        _tokens[id].locked = false;
        emit TokenUpdated(id, documentHash);
    }

    function _isLockedToken(uint256 id) internal view returns (bool) {
        return _tokens[id].locked;
    }

    function _isLockedAddress(address addr) internal view returns (bool) {
        return _users[addr].isLocked;
    }

    function _isLockedMove(address from, address to, uint256 id, uint256 value) internal view returns (bool) {
        return _isLockedToken(id) || _isLockedAddress(from) || _isLockedAddress(to) || (value == 0);
    }


    /***************************************
    TOKENS TRANSFER FUNCTIONS
    ****************************************/


    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address recipient, uint256 id, uint256 value) internal {
        require(!_tokens[id].isPrivate || _tokens[id].holders[recipient].isApproved, "Address not approved");

        uint256 newBalance = _tokens[id].holders[recipient].balance.add(value);

        if (_tokens[id].holders[recipient].balance == 0) {

            if (!_tokens[id].holders[recipient].isHolder) {
                _users[recipient].tokens.push(id);
                _tokens[id].holderList.push(recipient);
                _tokens[id].holders[recipient].isHolder;
            }

            _tokens[id].holders[recipient].birthday = block.timestamp;

        } else {

            // calculate the average birthday of the received and hold tokens
            uint256 oldTokensAge = block.timestamp.sub(_tokens[id].holders[recipient].birthday);
            uint256 newTokenAge = (_tokens[id].holders[recipient].balance.mul(oldTokensAge)).div(newBalance);

            _tokens[id].holders[recipient].birthday = block.timestamp - newTokenAge;
        }

        _tokens[id].holders[recipient].balance = newBalance;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _tokens[id].storageCostHistory.length - 1; i >= 0; i--) {

            uint256 costStartAt = _tokens[id].storageCostHistory[i][0];
            uint256 cost = _tokens[id].storageCostHistory[i][1];
            uint256 storageDays;

            if (_tokens[id].holders[account].birthday >= costStartAt) {
                storageDays = (timeCursor.sub(_tokens[id].holders[account].birthday)).div(86400);
                if (storageDays == 0) storageDays = 1;
                totalCost += (storageDays.mul(cost)).mul(value);
                break;
            } else {
                storageDays = (timeCursor.sub(costStartAt)).div(86400);
                if (storageDays == 0) storageDays = 1;
                timeCursor = costStartAt;
                totalCost += (storageDays.mul(cost)).mul(value);
            }
        }

        // TODO!
        totalCost = totalCost.div(10**_tokens[id].decimals); // storage cost are for one full token

        uint256 valueFees = (value.mul(_tokens[id].valueTransactionFees)).div(10**8);

        return totalCost.add(_tokens[id].lumpSumTransactionFees.add(valueFees));
    }

    // Used by ERC1155.sol in safeTransferFrom and safeTransferFromBatch functions
    function _moveTokens(address from, address to, uint256 id, uint256 value, uint256 feesBalance) internal returns (uint256 fees) {
        require(!_isLockedMove(from, to, id, value), "Locked");

        fees = _transactionFees(from, id, value);
        require(feesBalance >= fees, "Insufficient ETH for fees");

        _tokens[id].holders[from].balance = _tokens[id].holders[from].balance.sub(value, "Insufficient balance");

        _addToBalance(to, id, value);

        for (uint256 i = 0; i < _tokens[id].feesRecipients.length; ++i) {
            address feesRecipient = _tokens[id].feesRecipients[i];
            uint256 feesRecipientsPercentage = _tokens[id].feesRecipientsPercentage[i];
            _users[feesRecipient].ETHBalance += (fees.mul(feesRecipientsPercentage)).div(10000);
        }

        return fees;
    }


    /***************************************
    TOKENS CREATION AND MAINTENANCE FUNCTIONS
    ****************************************/


    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          uint256 decimals,
                          uint256 metadataHash,
                          uint256[3] memory transactionFees,
                          address[] memory feesRecipients,
                          uint256[] memory feesRecipientsPercentage,
                          uint256 minHoldingForCallback,
                          bool isPrivate)
    internal {
        require(_tokens[id].supply == 0 && supply > 0, "Invalid arguments");

        _tokens[id].supply = supply;
        _tokens[id].decimals = decimals;
        _tokens[id].holders[msg.sender].isMaintener = true;
        _tokens[id].holders[recipient].isApproved = true;

        _updateToken(id,
                     metadataHash,
                     transactionFees,
                     feesRecipients,
                     feesRecipientsPercentage,
                     minHoldingForCallback,
                     isPrivate);

        _addToBalance(recipient, id, supply);
    }

    function _cloneToken(uint256 id, uint256 cloneId, uint256 metadataHash) internal {
        _createToken(_tokens[id].holderList[0],
                     cloneId,
                     _tokens[id].supply,
                     _tokens[id].decimals,
                     metadataHash,
                     [
                       _tokens[id].lumpSumTransactionFees,
                       _tokens[id].valueTransactionFees,
                       _tokens[id].storageCostHistory[0][1]
                     ],
                     _tokens[id].feesRecipients,
                     _tokens[id].feesRecipientsPercentage,
                     _tokens[id].minHoldingForCallback,
                     _tokens[id].isPrivate);
    }

    function _updateToken(uint256 id,
                          uint256 metadataHash,
                          uint256[3] memory transactionFees,
                          address[] memory feesRecipients,
                          uint256[] memory feesRecipientsPercentage,
                          uint256 minHoldingForCallback,
                          bool isPrivate)
    internal {
        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < feesRecipientsPercentage.length; ++i)
            totalPercentage += feesRecipientsPercentage[i];

        require(feesRecipients.length > 0 && feesRecipients.length == feesRecipients.length &&
                totalPercentage == 10000 &&
                minHoldingForCallback < 10000,
                "Invalid arguments");

        _tokens[id].metadataHash = metadataHash;
        _tokens[id].lumpSumTransactionFees = transactionFees[0];
        _tokens[id].valueTransactionFees = transactionFees[1];
        _tokens[id].storageCostHistory.push([block.timestamp, transactionFees[2]]);
        _tokens[id].feesRecipients = feesRecipients;
        _tokens[id].feesRecipientsPercentage = feesRecipientsPercentage;
        _tokens[id].minHoldingForCallback = minHoldingForCallback;
        _tokens[id].isPrivate = isPrivate;
    }


    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        for (uint256 i = 0; i < _config.proxyRegistryAddresses.length; ++i) {
            if (_config.proxyRegistryAddresses[i] != address(0)) {
                ProxyRegistry proxyRegistry = ProxyRegistry(_config.proxyRegistryAddresses[i]);
                if (address(proxyRegistry.proxies(account)) == operator) {
                    return true;
                }
            }
        }
        return false;
    }

    function _callbackPrice(uint256 tokenId, uint256 price, address[] memory callees) internal view returns (uint256) {
        uint256 callbackAmount = 0;
        if (callees.length == 0) {
            callbackAmount = _tokens[tokenId].supply.sub(_tokens[tokenId].holders[msg.sender].balance);
        } else {
            for (uint i; i < callees.length; i++) {
                callbackAmount += _tokens[tokenId].holders[callees[i]].balance;
            }
        }
        return callbackAmount.mul(price);
    }

}
