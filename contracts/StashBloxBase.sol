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
    mapping (address => User) public  _users;
    mapping (uint256 => Token) public _templates;
    mapping (uint256 => Token) public _tokens;
    mapping (uint256 => Callback) public _callbacks;


    /***************************************
    EVENTS
    ****************************************/


    // Callback events
    event CallbackUpdated(uint256 indexed _CallbackId);

    // Update transactions prices events
    event UpdateTransactionFees(address indexed _maintener, uint256 _id, uint256[3] _fees);

    event TokenLocked(uint256 indexed _id, uint256 _documentHash);
    event TokenUnlocked(uint256 indexed _id, uint256 _documentHash);

    event MetadataHashUpdated(uint256 indexed _id, uint256 indexed _hash);


    /***************************************
    MODIFIERS
    ****************************************/

    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _users[tokenizer].isTokenizer || _isOwner();
    }

    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "[StashBlox]: caller is not a tokenizer");
        _;
    }

    function _isMaintener(uint256 id, address maintener) internal view returns (bool) {
        return _tokens[id].holders[maintener].isMaintener || _isOwner();
    }

    modifier onlyMaintener(uint256 id) {
        require(_isMaintener(id, msg.sender), "[StashBlox]: caller is not a token maintener");
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
        emit TokenLocked(id, documentHash);
    }

    function _unlockToken(uint256 id, uint256 documentHash) internal {
        _tokens[id].locked = false;
        emit TokenUnlocked(id, documentHash);
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
        require(!_tokens[id].isPrivate || _tokens[id].holders[recipient].isApproved, "StashBlox: address not approved");

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
        require(feesBalance >= fees, "ERC1155: insufficient ETH for transfer fees");

        _tokens[id].holders[from].balance = _tokens[id].holders[from].balance.sub(value, "ERC1155: insufficient balance for transfer");

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
        require(_tokens[id].supply == 0, "StashBlox: Token ID already used");
        require(supply > 0, "StashBlox: Supply must be greater than 0");

        _tokens[id].supply = supply;
        _tokens[id].decimals = decimals;
        _tokens[id].holders[msg.sender].isMaintener = true;
        _tokens[id].isPrivate = isPrivate;
        _tokens[id].holders[recipient].isApproved = true;

        _addToBalance(recipient, id, supply);
        _setMetadataHash(id, metadataHash);
        _setTransactionFees(id, transactionFees);
        _setFeesRecipients(id, feesRecipients, feesRecipientsPercentage);
        _setMinHoldingForCallback(id, minHoldingForCallback);
    }

    function _setMetadataHash(uint256 id, uint256 hash) internal {
         _tokens[id].metadataHash = hash;
         emit MetadataHashUpdated(id, hash);
    }

    function _setTransactionFees(uint256 id, uint256[3] memory newFees) internal {
        _tokens[id].lumpSumTransactionFees = newFees[0];
        _tokens[id].valueTransactionFees = newFees[1];
        _tokens[id].storageCostHistory.push([block.timestamp, newFees[2]]);

        emit UpdateTransactionFees(msg.sender, id, newFees);
    }

    function _setMinHoldingForCallback(uint256 id, uint256 newMinHoldingForCallback) internal {
        require(newMinHoldingForCallback < 10000, "StashBlox: minimum holding must be lower than 10000 (100%)");
        _tokens[id].minHoldingForCallback = newMinHoldingForCallback;
    }

    function _setFeesRecipients(uint256 id,
                                address[] memory newFeesRecipients,
                                uint256[] memory newFeesRecipientsPercentage)
    internal {
        require(newFeesRecipients.length > 0 &&
                newFeesRecipients.length == newFeesRecipientsPercentage.length, "StashBlox: Invalid arguments");

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < newFeesRecipientsPercentage.length; ++i) {
            totalPercentage += newFeesRecipientsPercentage[i];
            require(newFeesRecipientsPercentage[i] > 0, "StashBlox: feesRecipientsPercentage should be greater than 0");
        }
        require(totalPercentage == 10000, "StashBlox: Total of feesRecipientsPercentage must be equal to 10000");

        _tokens[id].feesRecipients = newFeesRecipients;
        _tokens[id].feesRecipientsPercentage = newFeesRecipientsPercentage;
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
