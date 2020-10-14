// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import "./lib/utils/SafeMath.sol";
import "./lib/ERC173/ERC173.sol";
import './lib/ERC1155/ERC1155Metadata.sol';

contract OwnableDelegateProxy { }

contract ProxyRegistry {
  mapping(address => OwnableDelegateProxy) public proxies;
}

contract StashBloxBase is ERC173, ERC1155Metadata {

    using SafeMath for uint256;


    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    // Mapping from token ID to account balances
    mapping (uint256 => mapping(address => uint256)) public _balances;
    // Mapping from token ID to Supply and decimals
    mapping (uint256 => uint256) internal _supplies;
    mapping (uint256 => uint256) internal _decimals;
    // Mapping from token ID to account age
    mapping (uint256 => mapping(address => uint256)) public _birthdays;
    // Mapping from token ID to list of tuple [timestamp, price]
    mapping (uint256 => uint256[2][]) internal _storageCostHistory;
    // Lump sum transaction fees for each token
    mapping (uint256 => uint256) _lumpSumTransactionFees;
    // Value proportional transaction fees for each token
    mapping (uint256 => uint256) _valueTransactionFees;
    // For each token a list of addresses receiving transfer fees
    mapping (uint256 => address[]) internal _feesRecipients;
    // For each token a list of percentage, each one for the corresponding _feesRecipients index
    mapping (uint256 => uint256[]) internal _feesRecipientsPercentage;
    // Balances ETH for fees recipients and callbacks
    mapping (address => uint256) public _ETHBalances;
    // For each address a list of token IDs. Can contains zero balance.
    mapping (address => uint256[]) public _tokensByAddress;
    // For each token a list of addresses. Can contains zero balance.
    mapping (uint256 => address[]) public _addressesByToken;
    // Initialize to true on the first token received, never come back to false.
    mapping (uint256 => mapping(address => bool)) internal _isHolder;
    // Mapping for locked tokens
    mapping (uint256 => bool) internal _tokenLocks;
    // Mapping for locked addresses
    mapping (address => bool) internal _addressLocks;

    // list of callback propositions
    struct CallbackProposition {
        uint256 tokenId;
        address caller;
        address[] callees;
        uint256 price;
        uint256 escrowedAmount;
        bool needLegalApproval;
        bool approvedByMaintener;
        bool approvedByLegal;
        bool refused;
        bool accepted;
        uint256 callCounter;
        bool completed;
        uint256 documentHash;
    }
    uint256 _nextCallbackPropositionId = 1;
    mapping (uint256 => CallbackProposition) public _callbackPropositions;

    // list of addresses authorized to create a token
    mapping (address => bool) _authorizedTokenizers;
    // List of token mainteners
    mapping (uint256 => mapping(address => bool)) _tokenMainteners;
    // Minimum holding to propose a callback for each token
    mapping (uint256 => uint256) _minHoldingForCallback;
    // Token template for batch creation
    struct TokenTemplate {
        address recipient;
        uint256 supply;
        uint8 decimals;
        uint256[3] transactionFees;
        address[] feesRecipients;
        uint256[] feesRecipientsPercentage;
        uint256 minHoldingForCallback;
    }
    mapping(uint256 => TokenTemplate) _tokenTemplates;
    // Exchanges proxy addresses
    address[] _proxyRegistryAddresses;
    // Legal authority addresses
    mapping (uint256 => address) _legalAuthorityAddresses;

    uint256 _callbackAutoExecuteMaxAddresses = 50;

    /***************************************
    EVENTS
    ****************************************/


    // Callback events
    event CallbackProposed(uint256 indexed _callbackPropositionId);
    event CallbackRefused(uint256 indexed _callbackPropositionId);
    event CallbackAccepted(uint256 indexed _callbackPropositionId);
    event CallbackCompleted(uint256 indexed _callbackPropositionId);

    // Update transactions prices events
    event UpdateTransactionFees(address indexed _maintener, uint256 _id, uint256[3] _fees);

    event TokenLocked(uint256 indexed _id, uint256 _documentHash);
    event TokenUnlocked(uint256 indexed _id, uint256 _documentHash);


    /***************************************
    MODIFIERS
    ****************************************/

    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _authorizedTokenizers[tokenizer] || _isOwner();
    }

    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "[StashBlox]: caller is not a tokenizer");
        _;
    }

    function _isMaintener(uint256 id, address maintener) internal view returns (bool) {
        return _tokenMainteners[id][maintener] || _isOwner();
    }

    modifier onlyMaintener(uint256 id) {
        require(_isMaintener(id, msg.sender), "[StashBlox]: caller is not a token maintener");
        _;
    }

    function _isLegalAuthority(uint256 id, address legalAuthority) internal view returns (bool) {
        return _legalAuthorityAddresses[id] == legalAuthority;
    }


    /***************************************
    LOCKS FUNCTIONS
    ****************************************/

    function _lockToken(uint256 id, uint256 documentHash) internal {
        _tokenLocks[id] = true;
        emit TokenLocked(id, documentHash);
    }

    function _unlockToken(uint256 id, uint256 documentHash) internal {
        _tokenLocks[id] = false;
        emit TokenUnlocked(id, documentHash);
    }

    function _isLockedToken(uint256 id) internal view returns (bool) {
        return _tokenLocks[id];
    }

    function _isLockedAddress(address addr) internal view returns (bool) {
        return _addressLocks[addr];
    }

    function _isLockedMove(address from, address to, uint256 id, uint256 value) internal view returns (bool) {
        return _isLockedToken(id) || _isLockedAddress(from) || _isLockedAddress(to) || (value == 0);
    }


    /***************************************
    TOKENS TRANSFER FUNCTIONS
    ****************************************/


    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address recipient, uint256 id, uint256 value) internal {
        uint256 newBalance = _balances[id][recipient].add(value);

        if (_balances[id][recipient] == 0) {

            if (!_isHolder[id][recipient]) {

                _tokensByAddress[recipient].push(id);
                _addressesByToken[id].push(recipient);
                _isHolder[id][recipient];
            }

            _birthdays[id][recipient] = block.timestamp;

        } else {

            // calculate the average birthday of the received and hold tokens
            uint256 oldTokensAge = block.timestamp.sub(_birthdays[id][recipient]);
            uint256 newTokenAge = (_balances[id][recipient].mul(oldTokensAge)).div(newBalance);

            _birthdays[id][recipient] = block.timestamp - newTokenAge;
        }

        _balances[id][recipient] = newBalance;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");

        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _storageCostHistory[id].length - 1; i >= 0; i--) {

            uint256 costStartAt = _storageCostHistory[id][i][0];
            uint256 cost = _storageCostHistory[id][i][1];
            uint256 storageDays;

            if (_birthdays[id][account] >= costStartAt) {
                storageDays = (timeCursor.sub(_birthdays[id][account])).div(86400);
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

        totalCost = totalCost.div(10**_decimals[id]); // storage cost are for one full token

        uint256 valueFees = (value.mul(_valueTransactionFees[id])).div(10**8);

        return totalCost.add(_lumpSumTransactionFees[id].add(valueFees));
    }

    // Used by ERC1155.sol in safeTransferFrom and safeTransferFromBatch functions
    function _moveTokens(address from, address to, uint256 id, uint256 value, uint256 feesBalance) internal returns (uint256 fees) {
        require(!_isLockedMove(from, to, id, value), "Locked");

        fees = _transactionFees(from, id, value);
        require(feesBalance >= fees, "ERC1155: insufficient ETH for transfer fees");

        _balances[id][from] = _balances[id][from].sub(value, "ERC1155: insufficient balance for transfer");

        _addToBalance(to, id, value);

        for (uint256 i = 0; i < _feesRecipients[id].length; ++i) {
            address feesRecipient = _feesRecipients[id][i];
            uint256 feesRecipientsPercentage = _feesRecipientsPercentage[id][i];
            _ETHBalances[feesRecipient] += (fees.mul(feesRecipientsPercentage)).div(10000);
        }

        return fees;
    }


    /***************************************
    TOKENS CREATION AND MAINTENANCE FUNCTIONS
    ****************************************/


    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          uint8 decimals,
                          uint256 metadataHash,
                          uint256[3] memory transactionFees,
                          address[] memory feesRecipients,
                          uint256[] memory feesRecipientsPercentage,
                          uint256 minHoldingForCallback)
    internal {
        require(_supplies[id] == 0, "StashBlox: Token ID already used");
        require(supply > 0, "StashBlox: Supply must be greater than 0");

        _supplies[id] = supply;
        _decimals[id] = decimals;
        _tokenMainteners[id][msg.sender] = true;

        _addToBalance(recipient, id, supply);
        _setMetadataHash(id, metadataHash);
        _setTransactionFees(id, transactionFees);
        _setFeesRecipients(id, feesRecipients, feesRecipientsPercentage);
        _setMinHoldingForCallback(id, minHoldingForCallback);
    }

    function _setMetadataHash(uint256 id, uint256 hash) internal {
         _metadataHashes[id] = hash;
         emit MetadataHashUpdated(id, hash);
    }

    function _setTransactionFees(uint256 id, uint256[3] memory newFees) internal {
        _lumpSumTransactionFees[id] = newFees[0];
        _valueTransactionFees[id] = newFees[1];
        _storageCostHistory[id].push([block.timestamp, newFees[2]]);

        emit UpdateTransactionFees(msg.sender, id, newFees);
    }

    function _setMinHoldingForCallback(uint256 id, uint256 newMinHoldingForCallback) internal {
        require(newMinHoldingForCallback < 10000, "StashBlox: minimum holding must be lower than 10000 (100%)");
        _minHoldingForCallback[id] = newMinHoldingForCallback;
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

        _feesRecipients[id] = newFeesRecipients;
        _feesRecipientsPercentage[id] = newFeesRecipientsPercentage;
    }

    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        for (uint256 i = 0; i < _proxyRegistryAddresses.length; ++i) {
            ProxyRegistry proxyRegistry = ProxyRegistry(_proxyRegistryAddresses[i]);
            if (address(proxyRegistry.proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }


    function _callbackPrice(uint256 tokenId, uint256 price, address[] memory callees) internal view returns (uint256) {
        uint256 callbackAmount = 0;
        if (callees.length == 0) {
            callbackAmount = _supplies[tokenId].sub(_balances[tokenId][msg.sender]);
        } else {
            for (uint i; i < callees.length; i++) {
                callbackAmount += _balances[tokenId][callees[i]];
            }
        }
        return callbackAmount.mul(price);
    }



}
