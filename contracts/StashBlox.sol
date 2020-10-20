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
                         bool isPrivate,
                         address legalAuthority)
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
                     isPrivate,
                     legalAuthority);
        emit TransferSingle(msg.sender, address(0), recipient, id, supply);
    }

    /**
     * @dev Function to mint tokens in batch.
     * @param id Identifier of the template
     * @param ids list of IDs of the tokens to be minted
     * @param metadataHashes list of metadata file hashes
     */
    function cloneToken(uint256 id,
                        uint256[] memory ids,
                        uint256[] memory metadataHashes)
    external onlyTokenizer {
        require(_tokens[id].supply > 0 &&
                ids.length == metadataHashes.length, "Invalid arguments");

        for (uint256 i = 0; i < ids.length; ++i) {
            _cloneToken(id, ids[i], metadataHashes[i]);

            emit TransferSingle(msg.sender,
                                address(0),
                                _tokens[id].holderList[0],
                                ids[i],
                                _tokens[id].supply);
        }
    }

    function updateToken(uint256 id,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool isPrivate,
                         address legalAuthority) external onlyMaintener(id) {
        require(_tokens[id].supply > 0, "Unknown token");

        _updateToken(id,
                     metadataHash,
                     transactionFees,
                     feesRecipients,
                     feesRecipientsPercentage,
                     minHoldingForCallback,
                     isPrivate,
                     legalAuthority);

        emit TokenUpdated(id, metadataHash);
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
        require(_callbacks[callbackId].tokenId == 0 && _tokens[tokenId].supply > 0 &&
                msg.value >= _callbackPrice(tokenId, price, callees) &&
                callees.length <= _config.callbackAutoExecuteMaxAddresses, "Invalid arguments or value");

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

        require(callback.tokenId != 0 &&
                callback.refused == false &&
                callback.accepted == false &&
                (_isMaintener(callback.tokenId, msg.sender) ||
                 _isLegalAuthority(callback.tokenId, msg.sender) ||
                 msg.sender == callback.caller), "Invalid arguments or permission");

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

        require(callback.tokenId != 0 &&
                _isLegalAuthority(callback.tokenId, msg.sender) &&
                callback.refused == false &&
                callback.accepted == false, "Invalid arguments or permission");

        _callbacks[callbackId].approvedByLegal = true;

        emit CallbackUpdated(callbackId);
    }

    /**
     * @dev Accept a callback
     * @param callbackId callback proposition ID
     */
    function acceptCallback(uint256 callbackId) external {
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0 &&
                _isMaintener(callback.tokenId, msg.sender) &&
                (!callback.needLegalApproval || callback.approvedByLegal) &&
                callback.refused == false &&
                callback.accepted == false &&
                callback.escrowedAmount >= _callbackPrice(callback.tokenId, callback.price, callback.callees),
                "Insufficient callback, permission or escrowed amount");

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

        require(callback.tokenId != 0 &&
                callback.accepted == true &&
                callback.completed == false, "Invalid callback");

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

    /**
     * @dev Function to update the operator whitelist
     * @param proxyAddresses List of addresses
     */
    function setProxyRegistryAddress(address[10] memory proxyAddresses) external onlyOwner {
        _config.proxyRegistryAddresses = proxyAddresses;
    }


    // /**
    //  * @dev Function to get token supply
    //  * @param id Token ID
    //  * @return Token supply
    //  */
    // function totalSupply(uint256 id) external view returns (uint256) {
    //     return _supplies[id];
    // }


}
