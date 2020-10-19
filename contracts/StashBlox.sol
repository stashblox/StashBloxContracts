// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import './lib/ERC1155/ERC1155.sol';
import "./lib/utils/SafeMath.sol";
import './lib/ERC1155/IERC1155Metadata.sol';
import './lib/utils/StringUtils.sol';

contract StashBlox is ERC1155, IERC1155Metadata, StringUtils {

    using SafeMath for uint256;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _config.callbackAutoExecuteMaxAddresses = 50;
        _config.baseURI = "http://stashblox.com/tokens/";
        _transferOwnership(msg.sender);
    }

    /***************************************
    TOKENIZERS
    ****************************************/


    /**
     * @dev Function to authorize an address to create a token.
     * @param tokenizer The authorized address
     */
    function authorizeTokenizer(address tokenizer) external onlyOwner {
        _users[tokenizer].isTokenizer = true;
    }

    /**
     * @dev Function to revoke the authorization to create a token.
     * @param tokenizer The authorized address
     */
    function revokeTokenizer(address tokenizer) external onlyOwner {
        _users[tokenizer].isTokenizer = false;
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
        _tokens[id].holders[maintener].isMaintener = true;
    }

    /**
     * @dev Function to revoke the authorization to maintain a token.
     * @param id the token id
     * @param maintener The authorized address
     */
    function revokeMaintener(uint256 id, address maintener) external onlyOwner {
        _tokens[id].holders[maintener].isMaintener = false;
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
        _tokens[id].holders[holder].isApproved = true;
    }


    /**
     * @dev Function to revoke holder for a private token.
     * @param id the token id
     * @param holder The authorized address
     */
    function revokeHolder(uint256 id, address holder) external onlyMaintener(id) {
        _tokens[id].holders[holder].isApproved = false;
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
        _users[addr].isLocked = true;
    }

    /**
     * @dev Function to unlock an address.
     * @param addr The address to unlock
     */
    function unlockAddress(address addr) external onlyOwner {
        _users[addr].isLocked = false;
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
                         uint256 decimals,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool isPrivate)
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
                     isPrivate);
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
        require(_templates[templateID].supply > 0, "Unknown token template");
        require(ids.length == metadataHashes.length, "Invalid arguments");

        for (uint256 i = 0; i < ids.length; ++i) {
            _createToken(_templates[templateID].holderList[0],
                         ids[i],
                         _templates[templateID].supply,
                         _templates[templateID].decimals,
                         metadataHashes[i],
                         [
                           _templates[templateID].lumpSumTransactionFees,
                           _templates[templateID].valueTransactionFees,
                           _templates[templateID].storageCostHistory[0][1]
                         ],
                         _templates[templateID].feesRecipients,
                         _templates[templateID].feesRecipientsPercentage,
                         _templates[templateID].minHoldingForCallback,
                         _templates[templateID].isPrivate);

            emit TransferSingle(msg.sender,
                                address(0),
                                _templates[templateID].holderList[0],
                                ids[i],
                                _templates[templateID].supply);
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
                              uint256 decimals,
                              uint256[3] memory transactionFees,
                              address[] memory feesRecipients,
                              uint256[] memory feesRecipientsPercentage,
                              uint256 minHoldingForCallback,
                              bool isPrivate)
    external onlyTokenizer {
        Token storage template = _templates[templateID];
        template.holderList.push(recipient);
        template.supply = supply;
        template.decimals = decimals;
        template.lumpSumTransactionFees = transactionFees[0];
        template.valueTransactionFees = transactionFees[1];
        template.storageCostHistory.push([0, transactionFees[2]]);
        template.feesRecipients = feesRecipients;
        template.feesRecipientsPercentage = feesRecipientsPercentage;
        template.minHoldingForCallback = minHoldingForCallback;
        template.isPrivate = isPrivate;
    }


    function updateToken(uint256 id,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool isPrivate) external onlyMaintener(id) {
        require(_tokens[id].supply > 0, "Unknown token");

        _updateToken(id,
                     metadataHash,
                     transactionFees,
                     feesRecipients,
                     feesRecipientsPercentage,
                     minHoldingForCallback,
                     isPrivate);

        emit TokenUpdated(id, metadataHash);
    }


    /**
     * @dev Function to update the legal authority address.
     * @param id The token ID
     * @param legalAuthority legal authority address
     */
    function updateLegalAuthority(uint256 id, address legalAuthority) external onlyMaintener(id) {
        _tokens[id].legalAuthority = legalAuthority;
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
        _config.callbackAutoExecuteMaxAddresses = newMax;
    }

    /**
     * @dev Propose to buy the whole supply of a token.
     * The proposer must hold minHoldingForCallback% of the total supply.
     * StashBlox must approve the price with acceptCallback();
     * @param tokenId Token ID
     * @param price proposed price
     * @param callees list of calless. Empty list means all holders.
     */
    function proposeCallback(uint256 callbackId, uint256 tokenId, uint256 price, address[] memory callees, uint256 documentHash) external payable {
        require(_callbacks[callbackId].tokenId == 0, "callbackId already used");
        require(_tokens[tokenId].supply > 0, "Unknown token");
        require(msg.value >= _callbackPrice(tokenId, price, callees), "Insufficient ETH");
        require(callees.length <= _config.callbackAutoExecuteMaxAddresses, "Too much callees");

        uint256 minHolding = (_tokens[tokenId].supply.mul(_tokens[tokenId].minHoldingForCallback)).div(10000);

        _callbacks[callbackId] = Callback({
            tokenId: tokenId,
            caller: msg.sender,
            callees: callees,
            price: price,
            escrowedAmount: msg.value,
            needLegalApproval: (price == 0) ||
                               (_tokens[tokenId].holders[msg.sender].balance < minHolding) ||
                               (callees.length > 0),
            approvedByLegal: false,
            refused: false,
            accepted: false,
            callCounter: 0,
            completed: false,
            documentHash: documentHash
        });

        emit CallbackUpdated(callbackId);
    }

    /**
     * @dev Refuse a callback if the price is not enough.
     * @param callbackId callback proposition ID
     */
    function refuseCallback(uint256 callbackId) external {
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0, "Callback not found");

        require(_isMaintener(callback.tokenId, msg.sender) ||
                _isLegalAuthority(callback.tokenId, msg.sender) ||
                msg.sender == callback.caller, "Insufficient permission");

        require(callback.refused == false, "Callback already refused");
        require(callback.accepted == false, "Callback already accepted");

        _callbacks[callbackId].refused = true;
        _users[callback.caller].ETHBalance += callback.escrowedAmount;

        emit CallbackUpdated(callbackId);
    }

    /**
     * @dev Approve a callback
     * @param callbackId callback proposition ID
     */
    function approveCallback(uint256 callbackId) external {
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0, "Callback not found");

        require(_isLegalAuthority(callback.tokenId, msg.sender), "Insufficient permission");

        require(callback.refused == false, "Callback already refused");
        require(callback.accepted == false, "Callback already accepted");

        _callbacks[callbackId].approvedByLegal = true;

        emit CallbackUpdated(callbackId);
    }

    /**
     * @dev Accept a callback
     * @param callbackId callback proposition ID
     */
    function acceptCallback(uint256 callbackId) external {
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0, "Callback not found");

        require(_isMaintener(callback.tokenId, msg.sender), "Insufficient permission.");
        require(!callback.needLegalApproval || callback.approvedByLegal, "Need legal approval");

        require(callback.refused == false, "Callback already refused");
        require(callback.accepted == false, "Callback already accepted");
        require(callback.escrowedAmount >= _callbackPrice(callback.tokenId, callback.price, callback.callees), "Insufficient escrowed amount");

        _callbacks[callbackId].accepted = true;

        emit CallbackUpdated(callbackId);

        if (callback.callees.length > 0) {
            _executeCallback(callbackId, callback.callees.length);
        } else if (_tokens[callback.tokenId].holderList.length <= _config.callbackAutoExecuteMaxAddresses) {
            _executeCallback(callbackId, _tokens[callback.tokenId].holderList.length);
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
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0, "Callback not found");
        require(callback.accepted == true, "Callback not accepted");
        require(callback.completed == false, "Callback already completed");

        _executeCallback(callbackId, maxCall);

        if (_callbacks[callbackId].completed) {
            _unlockToken(callback.tokenId, callback.documentHash);
        }
    }


    function _executeCallback(uint256 callbackId, uint256 maxCall) internal {
        uint256 tokenId = _callbacks[callbackId].tokenId;

        address[] memory callees = _callbacks[callbackId].callees.length > 0 ?
                                   _callbacks[callbackId].callees :
                                   _tokens[tokenId].holderList;

        uint256 max = callees.length - 1;
        uint256 start = _callbacks[callbackId].callCounter;
        uint256 end = start + maxCall <  max ? start + maxCall : max;

        uint256 callbackAmount = 0;
        for (uint256 i = start; i <= end; i++) {
            address callee = callees[i];
            if (_tokens[tokenId].holders[callee].balance > 0) {
                callbackAmount += _tokens[tokenId].holders[callee].balance;
                _users[callee].ETHBalance += _tokens[tokenId].holders[callee].balance.mul(_callbacks[callbackId].price);

                emit TransferSingle(msg.sender,
                                    callee,
                                    _callbacks[callbackId].caller,
                                    tokenId,
                                    _tokens[tokenId].holders[callee].balance);

                _tokens[tokenId].holders[callee].balance = 0;
            }
        }
        _addToBalance(_callbacks[callbackId].caller, tokenId, callbackAmount);

        _callbacks[callbackId].callCounter = end;
        if (end == max) {
            _callbacks[callbackId].completed = true;
            emit CallbackUpdated(callbackId);
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
        require(_users[to].ETHBalance >= amount, "Insufficient balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdrawal failed");
        _users[to].ETHBalance -= amount;
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param to recipent address
     */
    function deposit(address to) external payable {
        _users[to].ETHBalance += msg.value;
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _users[msg.sender].ETHBalance += msg.value;
    }


    /***************************************
    UTILS
    ****************************************/

    /**
     * @param id Token ID
     * @return URI string
     */
    function uri(uint256 id) external view override returns (string memory) {
        return _strConcat(_config.baseURI, _toHexString(id));
    }


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
    //         if (_tokens[id].balances[account] > 0) {
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
    //         if (_tokens[id].balances[account] > 0) {
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
    function setProxyRegistryAddress(address[10] memory proxyAddresses) external onlyOwner {
        _config.proxyRegistryAddresses = proxyAddresses;
    }
}
