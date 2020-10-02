pragma solidity ^0.7.1;

import './lib/ERC1155/ERC1155.sol';
import './lib/ERC1155/ERC1155Metadata.sol';
import "./lib/utils/SafeMath.sol";

contract StashBlox is ERC1155, ERC1155Metadata {

    using SafeMath for uint256;


    /***************************************
    TOKENIZERS
    ****************************************/


    /**
     * @dev Function to authorize an address to create a token.
     * @param tokenizer The authorized address
     */
    function authorizeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = true;
    }

    /**
     * @dev Function to revoke the authorization to create a token.
     * @param tokenizer The authorized address
     */
    function revokeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = false;
    }

    /**
     * @dev Function to check if an address is authorized to create a token.
     * @param tokenizer The authorized address
     */
    function isTokenizer(address tokenizer) external view returns (bool) {
        return _isTokenizer(tokenizer);
    }


    /***************************************
    LOCKS
    ****************************************/


    /**
     * @dev Function to lock a token.
     * @param id The token ID
     */
    function lockToken(uint256 id) external onlyOwner {
        _tokenLocks[id] = true;
    }

    /**
     * @dev Function to unlock a token.
     * @param id The token ID
     */
    function unlockToken(uint256 id) external onlyOwner {
        _tokenLocks[id] = false;
    }

    /**
     * @dev Function to check if a token is locked.
     * @param id The token ID
     */
    function isLockedToken(uint256 id) external view returns (bool){
        return _isLockedToken(id);
    }

    /**
     * @dev Function to lock an address.
     * @param addr The address to lock
     */
    function lockAddress(address addr) external onlyOwner {
        _addressLocks[addr] = true;
    }

    /**
     * @dev Function to unlock an address.
     * @param addr The address to unlock
     */
    function unlockAddress(address addr) external onlyOwner {
        _addressLocks[addr] = false;
    }

    /**
     * @dev Function to check if an address is lockec.
     * @param addr The address to check
     */
    function isLockedAddress(address addr) external view returns (bool){
        return _isLockedAddress(addr);
    }


    /***************************************
    TOKEN CREATION
    ****************************************/


    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param metadataHash Metadata file hash
     * @param storageCreditCost cost for 24h storage in storageCredit (x 10 ^ 8 for the precision)
     * @param minHoldingForCallback minimum holding to propose a callback
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256 metadataHash,
                         uint256 storageCreditCost,
                         uint256 minHoldingForCallback,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage)
    external onlyTokenizer {

        require(_supplies[id] == 0 &&
                supply > 0 &&
                storageCreditCost > 0 &&
                minHoldingForCallback > 0 &&
                minHoldingForCallback <= 10000 &&
                feesRecipients.length > 0 &&
                feesRecipients.length == feesRecipientsPercentage.length, "StashBlox: Invalid arguments");

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < feesRecipientsPercentage.length; ++i) {
            totalPercentage += feesRecipientsPercentage[i];
            require(feesRecipientsPercentage[i] > 0, "StashBlox: feesRecipientsPercentage should be greater than 0");
        }
        require(totalPercentage == 10000, "StashBlox: Total of feesRecipientsPercentage must be equal to 10000");

        _isHolder[id][recipient] = true;
        _tokensByAddress[recipient].push(id);
        _supplies[id] = supply;
        _balances[id][recipient] = supply;
        _updateMetadataHash(id, metadataHash);
        _birthdays[id][recipient] = block.timestamp;
        _storageCostHistory[id].push([block.timestamp, storageCreditCost]);
        _minHoldingForCallback[id] = minHoldingForCallback;
        _feesRecipients[id] = feesRecipients;
        _feesRecipientsPercentage[id] = feesRecipientsPercentage;

        emit TransferSingle(msg.sender, address(0), recipient, id, supply);
        // emit URI(uri, id);
    }


    /***************************************
    STORAGE PRICE
    ****************************************/


    /**
     * @dev Function to update the price of one "storage credit".
     * @param newPrice The new price
     */
    function updateStorageCreditPrice(uint256 newPrice) external onlyTokenizer {
        storageCreditPrice = newPrice;
        emit UpdateStorageCreditPrice(msg.sender, newPrice);
    }

    /**
     * @dev Function to update the storage cost of a token for one day, expressed in "storage credit".
     * @param newPrice The new price
     */
    function updateStorageCost(uint256 id, uint256 newCost) external onlyTokenizer {
        _storageCostHistory[id].push([block.timestamp, newCost]);
        emit UpdateStorageCost(msg.sender, id, newCost);
    }

    /**
     * @dev Function to get the transaction price to transfer tokens.
     * @param account the address from where to transfer the tokens
     * @param id The token ID
     * @param value The amount to transfer
     */
    function storageFees(address account, uint256 id, uint256 value) public view returns (uint256) {
        return _storageFees(account, id, value);
    }


    /***************************************
    CALLBACKS
    ****************************************/


    /**
     * @dev Propose to buy the whole supply of a token.
     * The proposer must hold minHoldingForCallback% of the total supply.
     * StashBlox must approve the price with acceptCallback();
     * @param id Token ID
     * @param price proposed price
     */
    function proposeCallback(uint256 id, uint256 price) external payable {
        require(_supplies[id] > 0, "StashBlox: Unknown token.");
        require(price > 0, "StashBlox: Price must be greater than 0.");

        uint256 minHolding = (_supplies[id].mul(_minHoldingForCallback[id])).div(10000);
        require(_balances[id][msg.sender] >= minHolding, "StashBlox: insufficient balance to propose a callback.");

        uint256 callbackAmount = _supplies[id].sub(_balances[id][msg.sender]);
        uint256 callbackPrice = callbackAmount.mul(price);
        require(msg.value >= callbackPrice, "StashBlox: insufficient value for the proposed price.");

        _callbackPropositions[id][msg.sender] = [price, msg.value];
        emit CallbackProposed(id, msg.sender, price);
    }

    /**
     * @dev Refuse a callback if the price is not enough.
     * @param id Token ID
     * @param proposer address of the proposer
     */
    function refuseCallback(uint256 id, address proposer) external onlyOwner {
        uint256 price = _callbackPropositions[id][proposer][0];
        uint256 escrowedAmount = _callbackPropositions[id][proposer][1];

        require(price > 0, "StashBlox: callback proposition not found.");

        // return escrowed amount. Proposer must use withdraw() function to get
        // escrowed amount.
        _ETHBalances[proposer] += escrowedAmount;

        _callbackPropositions[id][proposer] = [0, 0];
        emit CallbackRefused(id, proposer, price);
    }

    /**
     * @dev Accept a callback
     * @param id Token ID
     * @param proposer address of the proposer
     */
    function acceptCallback(uint256 id, address proposer) external onlyOwner {
        uint256 price = _callbackPropositions[id][proposer][0];
        uint256 escrowedAmount = _callbackPropositions[id][proposer][1];

        require(price > 0, "StashBlox: callback proposition not found.");

        uint256 minHolding = (_supplies[id].mul(_minHoldingForCallback[id])).div(10000);
        require(_balances[id][proposer] >= minHolding, "StashBlox: insufficient balance to execute the callback.");

        uint256 callbackAmount = _supplies[id].sub(_balances[id][proposer]);
        uint256 callbackPrice = callbackAmount.mul(price);
        require(escrowedAmount >= callbackPrice, "StashBlox: insufficient escrowed value to execute the callback.");

        // move tokens to the proposer address and escrowed ETH to the holders addresses
        // Holders must use withdraw() function to get paiement amount.
        for (uint256 i = 0; i < _addressesByToken[id].length; ++i) {
            address holderAddress = _addressesByToken[id][i];
            uint256 holderBalance = _balances[id][holderAddress];
            if (holderBalance > 0) {
                uint256 holderPrice = price.mul(holderBalance);
                _ETHBalances[holderAddress] += holderPrice;
                _balances[id][holderAddress] = 0;
            }
        }

        _balances[id][proposer] = _supplies[id];

        if (escrowedAmount > callbackPrice) {
            _ETHBalances[proposer] += escrowedAmount - callbackPrice;
        }

        _callbackPropositions[id][proposer] = [0, 0];
        emit CallbackAccepted(id, proposer, price);
    }


    /***************************************
    WITHDRAWAL
    ****************************************/


    /**
     * @dev Function to withdraw ETH from the contract.
     * @param to recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address to, uint256 amount) external onlyOwner {
        require(_ETHBalances[to] >= amount, "StashBlox: Insufficient balance.");
        (bool success, ) = to.call{value: amount}("");
        require(success, "StashBlox: Withdrawal failed.");
        _ETHBalances[to] -= amount;
    }


    /***************************************
    UTILS
    ****************************************/


    /**
     * @dev Function to get token supply
     * @param id Token ID
     * @return Token supply
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _supplies[id];
    }

    /**
     * @dev Function to get the list of token hold by an address
     * @param account holder address
     * @return space separated listof IDs
     */
    function tokensByAddress(address account) public view returns (string memory result) {
        require(account != address(0), "ERC1155: balance query for the zero address");

        for (uint i = 0; i < _tokensByAddress[account].length; i++) {
            uint256 id = _tokensByAddress[account][i];
            if (_balances[id][account] > 0) {
                if (bytes(result).length > 0) {
                    result = _strConcat(result, " ");
                    result = _strConcat(result, _toHexString(id));
                } else {
                    result = _toHexString(id);
                }
            }
        }
        return result;
    }

    /**
     * @dev Function to get the list of token hold by an address
     * @param account holder address
     * @return space separated listof IDs
     */
    function addressesByToken(uint256 id) public view returns (string memory result) {

        for (uint i = 0; i < _addressesByToken[id].length; i++) {
            address account = _addressesByToken[id][i];
            if (_balances[id][account] > 0) {
                if (bytes(result).length > 0) {
                    result = _strConcat(result, " ");
                    result = _strConcat(result, _toHexString(uint256(account)));
                } else {
                    result = _toHexString(uint256(account));
                }
            }
        }
        return result;
    }
}
