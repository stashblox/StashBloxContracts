// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import "./lib/utils/SafeMath.sol";
import "./lib/ERC173/ERC173.sol";

contract StashBloxBase is ERC173 {

    using SafeMath for uint256;


    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    // Mapping from token ID to account balances
    mapping (uint256 => mapping(address => uint256)) _balances;
    // Mapping from token ID to Supply
    mapping (uint256 => uint256) internal _supplies;
    // Mapping from token ID to account age
    mapping (uint256 => mapping(address => uint256)) public _birthdays;
    // Mapping from token ID to list of tuple [timestamp, price]
    mapping (uint256 => uint256[2][]) internal _storageCostHistory;
    // price of one storage credit in wei
    uint256 storageCreditPrice = 1000;
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
    // _callbackPropositions[tokenID][proposer] = [priceForEachToken, ETHAmountEscrowed]
    mapping (uint256 => mapping(address => uint256[2])) _callbackPropositions;
    // list of addresses authorized to create a token
    mapping (address => bool) _authorizedTokenizers;
    // Minimum holding to propose a callback for each token
    mapping (uint256 => uint256) _minHoldingForCallback;


    /***************************************
    EVENTS
    ****************************************/


    // Callback events
    event CallbackProposed(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackRefused(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackAccepted(uint256 indexed _id, address _proposer, uint256 _price);

    // Update storage prices events
    event UpdateStorageCost(address indexed _tokenizer, uint256 _id, uint256 _cost);
    event UpdateStorageCreditPrice(address indexed _owner, uint256 _price);


    /***************************************
    MODIFIERS
    ****************************************/


    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "Mintable: caller is not a tokenizer");
        _;
    }


    /***************************************
    INTERNAL FUNCTIONS
    ****************************************/


    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _authorizedTokenizers[tokenizer] || _isOwner();
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

    // Used by ERC1155.sol in tranfers functions
    function _moveTokens(address from, address to, uint256 id, uint256 value, uint256 feesBalance) internal returns (uint256 fees) {
        require(!_isLockedMove(from, to, id, value), "Locked");

        fees = _storageFees(from, id, value);
        require(feesBalance >= fees, "ERC1155: insufficient ETH for transfer fees");

        _balances[id][from] = _balances[id][from].sub(value, "ERC1155: insufficient balance for transfer");

        uint256 newBalanceTo = _balances[id][to].add(value);

        if (_balances[id][to] == 0) {

            if (!_isHolder[id][to]) {
                _tokensByAddress[to].push(id);
                _addressesByToken[id].push(to);
                _isHolder[id][to];
            }

            _birthdays[id][to] = block.timestamp;

        } else {
            // calculate the average birthday of the received and hold tokens
            uint256 oldTokensAge = block.timestamp.sub(_birthdays[id][to]);
            uint256 newTokenAge = (_balances[id][to].mul(oldTokensAge)).div(newBalanceTo);

            _birthdays[id][to] = block.timestamp - newTokenAge;
        }

        _balances[id][to] = newBalanceTo;

        for (uint256 i = 0; i < _feesRecipients[id].length; ++i) {
            address feesRecipient = _feesRecipients[id][i];
            uint256 feesRecipientsPercentage = _feesRecipientsPercentage[id][i];
            _ETHBalances[feesRecipient] += (fees.mul(feesRecipientsPercentage)).div(10000);
        }

        return fees;
    }

    // Calculate transaction fees
    function _storageFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");

        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _storageCostHistory[id].length - 1; i >= 0; i--) {

            uint256 costStartAt = _storageCostHistory[id][i][0];
            uint256 cost = (_storageCostHistory[id][i][1] * storageCreditPrice) / 10**8;
            uint256 storageDays;

            if (_birthdays[id][account] >= costStartAt) {
                storageDays = (timeCursor - _birthdays[id][account]) / 86400;
                if (storageDays == 0) storageDays = 1;
                totalCost += storageDays * cost * value;
                break;
            } else {
                storageDays = (timeCursor - costStartAt) / 86400;
                if (storageDays == 0) storageDays = 1;
                timeCursor = costStartAt;
                totalCost += storageDays * cost * value;
            }
        }
        return totalCost;
    }

}
