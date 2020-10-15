// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import './lib/ERC1155/ERC1155.sol';
import "./lib/utils/SafeMath.sol";

contract StashBlox is ERC1155 {

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
    MAINTENERS
    ****************************************/


    /**
     * @dev Function to authorize an address to maintain a token.
     * @param maintener The authorized address
     */
    function authorizeMaintener(uint256 id, address maintener) external onlyOwner {
        _tokenMainteners[id][maintener] = true;
    }

    /**
     * @dev Function to revoke the authorization to maintain a token.
     * @param id the token id
     * @param maintener The authorized address
     */
    function revokeMaintener(uint256 id, address maintener) external onlyOwner {
        _tokenMainteners[id][maintener] = false;
    }

    /**
     * @dev Function to check if an address is authorized to maintain a token.
     * @param id the token id
     * @param maintener The authorized address
     * @return true if it's a maintener address
     */
    function isMaintener(uint256 id, address maintener) external view returns (bool) {
        return _isMaintener(id, maintener);
    }

    /**
     * @dev Function to approve holder for a private token.
     * @param id the token id
     * @param holder The authorized address
     */
    function approveHolder(uint256 id, address holder) external onlyMaintener(id) {
        _approvedHolders[id][holder] = true;
    }


    /**
     * @dev Function to revoke holder for a private token.
     * @param id the token id
     * @param holder The authorized address
     */
    function revokeHolder(uint256 id, address holder) external onlyMaintener(id) {
        _approvedHolders[id][holder] = false;
    }


    /***************************************
    LOCKS
    ****************************************/


    /**
     * @dev Function to lock a token.
     * @param id The token ID
     */
    function lockToken(uint256 id, uint256 documentHash) external onlyMaintener(id) {
        _lockToken(id, documentHash);
    }

    /**
     * @dev Function to unlock a token.
     * @param id The token ID
     */
    function unlockToken(uint256 id, uint256 documentHash) external onlyMaintener(id) {
        _unlockToken(id, documentHash);
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
    TOKEN CREATION AND MAINTENANCE
    ****************************************/


    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param metadataHash Metadata file hash
     * @param transactionFees transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     * @param minHoldingForCallback minimum holding to propose a callback
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint8 decimals,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool privateToken)
    external onlyTokenizer {
        _createToken(recipient,
                     id,
                     supply,
                     decimals,
                     metadataHash,
                     transactionFees,
                     feesRecipients,
                     feesRecipientsPercentage,
                     minHoldingForCallback,
                     privateToken);
        emit TransferSingle(msg.sender, address(0), recipient, id, supply);
    }

    /**
     * @dev Function to mint tokens.
     * @param templateID Identifier of the template
     * @param ids list of IDs of the tokens to be minted
     * @param metadataHashes list of metadata file hashes
     */
    function createTokens(uint256 templateID,
                          uint256[] memory ids,
                          uint256[] memory metadataHashes)
    external onlyTokenizer {
        require(_tokenTemplates[templateID].supply > 0, "StashBlox: Unknown token template");
        require(ids.length == metadataHashes.length, "StashBlox: Invalid arguments");

        for (uint256 i = 0; i < ids.length; ++i) {
            _createToken(_tokenTemplates[templateID].recipient,
                         ids[i],
                         _tokenTemplates[templateID].supply,
                         _tokenTemplates[templateID].decimals,
                         metadataHashes[i],
                         _tokenTemplates[templateID].transactionFees,
                         _tokenTemplates[templateID].feesRecipients,
                         _tokenTemplates[templateID].feesRecipientsPercentage,
                         _tokenTemplates[templateID].minHoldingForCallback,
                         _tokenTemplates[templateID].privateToken);

            emit TransferSingle(msg.sender, address(0),
                                _tokenTemplates[templateID].recipient, ids[i],
                                _supplies[ids[i]]);
        }
    }

    /**
     * @dev Function to create or update a token template for batch creation.
     * @param templateID Identifier of the template
     * @param recipient The address that will own the minted tokens
     * @param supply Amount of the token to be minted
     * @param transactionFees transaction fees
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     * @param minHoldingForCallback minimum holding to propose a callback
     */
    function setTokenTemplate(uint256 templateID,
                              address recipient,
                              uint256 supply,
                              uint8 decimals,
                              uint256[3] memory transactionFees,
                              address[] memory feesRecipients,
                              uint256[] memory feesRecipientsPercentage,
                              uint256 minHoldingForCallback,
                              bool privateToken)
    external onlyTokenizer {
        _tokenTemplates[templateID] = TokenTemplate({
            recipient: recipient,
            supply: supply,
            decimals: decimals,
            transactionFees: transactionFees,
            feesRecipients: feesRecipients,
            feesRecipientsPercentage: feesRecipientsPercentage,
            minHoldingForCallback: minHoldingForCallback,
            privateToken: privateToken
        });
    }

    /**
     * @dev Function to update the metadata hash of a token.
     * @param id The token ID
     * @param metadataHash The new metadata hash
     */
    function updateMetadataHash(uint256 id, uint256 metadataHash) external onlyMaintener(id) {
      _setMetadataHash(id, metadataHash);
    }

    /**
     * @dev Function to update transaction fees.
     * @param id The token ID
     * @param newFees The new transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]
     */
    function updateTransactionFees(uint256 id, uint256[3] memory newFees) external onlyMaintener(id) {
        _setTransactionFees(id, newFees);
    }

    /**
     * @dev Function to update the minimum holding to propose a callback.
     * @param id The token ID
     * @param newFeesRecipients list of addresses receiving transfer fees
     * @param newFeesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     */
    function updateFeesRecipients(uint256 id,
                                  address[] memory newFeesRecipients,
                                  uint256[] memory newFeesRecipientsPercentage)
    external onlyMaintener(id) {
      _setFeesRecipients(id, newFeesRecipients, newFeesRecipientsPercentage);
    }

    /**
     * @dev Function to update the minimum holding to propose a callback.
     * @param id The token ID
     * @param newMinHoldingForCallback The new minimum holding
     */
    function updateMinHoldingForCallback(uint256 id, uint256 newMinHoldingForCallback) external onlyMaintener(id) {
        _setMinHoldingForCallback(id, newMinHoldingForCallback);
    }


    /***************************************
    TRANSFER PRICE
    ****************************************/

    /**
     * @dev Function to get the transaction price to transfer tokens.
     * @param account the address from where to transfer the tokens
     * @param id The token ID
     * @param value The amount to transfer
     */
    function transactionFees(address account, uint256 id, uint256 value) public view returns (uint256) {
        return _transactionFees(account, id, value);
    }


    /***************************************
    CALLBACKS
    ****************************************/

    /**
     * @dev Maximum addresses to execute automatically the callback when is accepted.
     * @param newMax new maximum
     */
    function setCallbackAutoExecuteMaxAddresses(uint256 newMax) external onlyOwner {
        _callbackAutoExecuteMaxAddresses = newMax;
    }

    /**
     * @dev Propose to buy the whole supply of a token.
     * The proposer must hold minHoldingForCallback% of the total supply.
     * StashBlox must approve the price with acceptCallback();
     * @param tokenId Token ID
     * @param price proposed price
     * @param callees list of calless. Empty list means all holders.
     */
    function proposeCallback(uint256 tokenId, uint256 price, address[] memory callees, uint256 documentHash) external payable returns (uint256) {
        require(_supplies[tokenId] > 0, "StashBlox: Unknown token.");
        require(msg.value >= _callbackPrice(tokenId, price, callees), "StashBlox: insufficient value for the proposed price.");
        require(callees.length <= _callbackAutoExecuteMaxAddresses, "StashBlox: too much callees");

        uint256 minHolding = (_supplies[tokenId].mul(_minHoldingForCallback[tokenId])).div(10000);

        _callbackPropositions[_nextCallbackPropositionId] = CallbackProposition({
            tokenId: tokenId,
            caller: msg.sender,
            callees: callees,
            price: price,
            escrowedAmount: msg.value,
            needLegalApproval: (price == 0) ||
                               (_balances[tokenId][msg.sender] < minHolding) ||
                               (callees.length > 0),
            approvedByLegal: false,
            refused: false,
            accepted: false,
            callCounter: 0,
            completed: false,
            documentHash: documentHash
        });

        emit CallbackProposed(_nextCallbackPropositionId);
        _nextCallbackPropositionId++;

        return _nextCallbackPropositionId - 1;
    }

    /**
     * @dev Refuse a callback if the price is not enough.
     * @param callbackId callback proposition ID
     */
    function refuseCallback(uint256 callbackId) external {
        CallbackProposition memory callback = _callbackPropositions[callbackId];

        require(callback.tokenId != 0, "StashBlox: callback proposition not found.");

        require(_isMaintener(callback.tokenId, msg.sender) ||
                _isLegalAuthority(callback.tokenId, msg.sender) ||
                msg.sender == callback.caller, "StashBlox: insufficient permission.");

        require(callback.refused == false, "StashBlox: callback already refused.");
        require(callback.accepted == false, "StashBlox: callback already accepted.");

        _callbackPropositions[callbackId].refused = true;
        _ETHBalances[callback.caller] += callback.escrowedAmount;

        emit CallbackRefused(callbackId);
    }

    /**
     * @dev Approve a callback
     * @param callbackId callback proposition ID
     */
    function approveCallback(uint256 callbackId) external {
        CallbackProposition memory callback = _callbackPropositions[callbackId];

        require(callback.tokenId != 0, "StashBlox: callback proposition not found.");

        require(_isLegalAuthority(callback.tokenId, msg.sender), "StashBlox: insufficient permission.");

        require(callback.refused == false, "StashBlox: callback already refused.");
        require(callback.accepted == false, "StashBlox: callback already accepted.");

        _callbackPropositions[callbackId].approvedByLegal = true;

        emit CallbackApproved(callbackId);
    }

    /**
     * @dev Accept a callback
     * @param callbackId callback proposition ID
     */
    function acceptCallback(uint256 callbackId) external {
        CallbackProposition memory callback = _callbackPropositions[callbackId];

        require(callback.tokenId != 0, "StashBlox: callback proposition not found.");

        require(_isMaintener(callback.tokenId, msg.sender), "StashBlox: insufficient permission.");
        require(!callback.needLegalApproval || callback.approvedByLegal, "StashBlox: need legal approval.");

        require(callback.refused == false, "StashBlox: callback already refused.");
        require(callback.accepted == false, "StashBlox: callback already accepted.");
        require(callback.escrowedAmount >= _callbackPrice(callback.tokenId, callback.price, callback.callees), "StashBlox: insufficient escrowed amount for the proposed price.");

        _callbackPropositions[callbackId].accepted = true;

        emit CallbackAccepted(callbackId);

        if (callback.callees.length > 0) {
            _executeCallback(callbackId, callback.callees.length);
        } else if (_addressesByToken[callback.tokenId].length <= _callbackAutoExecuteMaxAddresses) {
            _executeCallback(callbackId, _addressesByToken[callback.tokenId].length);
        } else {
            _lockToken(callback.tokenId, callback.documentHash);
        }

    }

    /**
     * @dev Accept a callback. Caller need to recall the function to continue the callback until completed.
     * @param callbackId callback proposition ID
     * @param maxCall maximal call to excute
     */
    function executeCallback(uint256 callbackId, uint256 maxCall) external {
        CallbackProposition memory callback = _callbackPropositions[callbackId];

        require(callback.tokenId != 0, "StashBlox: callback proposition not found.");
        require(callback.accepted == true, "StashBlox: callback not accepted.");
        require(callback.completed == false, "StashBlox: callback already completed.");

        _executeCallback(callbackId, maxCall);

        if (_callbackPropositions[callbackId].completed) {
            _unlockToken(callback.tokenId, callback.documentHash);
        }
    }


    function _executeCallback(uint256 callbackId, uint256 maxCall) internal {
        uint256 tokenId = _callbackPropositions[callbackId].tokenId;

        address[] memory callees = _callbackPropositions[callbackId].callees.length > 0 ?
                                   _callbackPropositions[callbackId].callees :
                                   _addressesByToken[tokenId];

        uint256 max = callees.length - 1;
        uint256 start = _callbackPropositions[callbackId].callCounter;
        uint256 end = start + maxCall <  max ? start + maxCall : max;

        uint256 callbackAmount = 0;
        for (uint256 i = start; i <= end; i++) {
            address callee = callees[i];
            if (_balances[tokenId][callee] > 0) {
                callbackAmount += _balances[tokenId][callee];
                _ETHBalances[callee] += _balances[tokenId][callee].mul(_callbackPropositions[callbackId].price);

                emit TransferSingle(msg.sender,
                                    callee,
                                    _callbackPropositions[callbackId].caller,
                                    tokenId,
                                    _balances[tokenId][callee]);

                _balances[tokenId][callee] = 0;
            }
        }
        _addToBalance(_callbackPropositions[callbackId].caller, tokenId, callbackAmount);

        _callbackPropositions[callbackId].callCounter = end;
        if (end == max) {
            _callbackPropositions[callbackId].completed = true;
            emit CallbackCompleted(callbackId);
        }
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

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param to recipent address
     */
    function deposit(address to) external payable {
        _ETHBalances[to] += msg.value;
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _ETHBalances[msg.sender] += msg.value;
    }


    /***************************************
    UTILS
    ****************************************/


    // /**
    //  * @dev Function to get token supply
    //  * @param id Token ID
    //  * @return Token supply
    //  */
    // function totalSupply(uint256 id) external view returns (uint256) {
    //     return _supplies[id];
    // }

    // /**
    //  * @dev Function to get the list of token hold by an address
    //  * @param account holder address
    //  * @return result space separated listof IDs
    //  */
    // function tokensByAddress(address account) public view returns (string memory result) {
    //     for (uint i = 0; i < _tokensByAddress[account].length; i++) {
    //         uint256 id = _tokensByAddress[account][i];
    //         if (_balances[id][account] > 0) {
    //             if (bytes(result).length > 0) {
    //                 result = _strConcat(result, " ");
    //                 result = _strConcat(result, _toHexString(id));
    //             } else {
    //                 result = _toHexString(id);
    //             }
    //         }
    //     }
    //     return result;
    // }
    //
    // /**
    //  * @dev Function to get the list of token hold by an address
    //  * @param id Token ID
    //  * @return result space separated list of addresses
    //  */
    // function addressesByToken(uint256 id) public view returns (string memory result) {
    //     for (uint i = 0; i < _addressesByToken[id].length; i++) {
    //         address account = _addressesByToken[id][i];
    //         if (_balances[id][account] > 0) {
    //             if (bytes(result).length > 0) {
    //                 result = _strConcat(result, " ");
    //                 result = _strConcat(result, _toHexString(uint256(account)));
    //             } else {
    //                 result = _toHexString(uint256(account));
    //             }
    //         }
    //     }
    //     return result;
    // }

    /**
     * @dev Function to update the operator whitelist
     * @param proxyAddresses List of addresses
     */
    function setProxyRegistryAddress(address[] memory proxyAddresses) external onlyOwner {
        _proxyRegistryAddresses = proxyAddresses;
    }
}
