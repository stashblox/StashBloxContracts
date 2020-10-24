// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Lockable.sol';

contract Callable is Lockable {

    using SafeMath for uint256;


    /****************************
    EVENTS
    *****************************/


    event CallbackUpdated(uint256 indexed _callbackId);


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


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
                callees.length <= _config.callbackAutoExecuteMaxAccounts, "Invalid arguments or value");

        _callbacks[callbackId] = Callback({
            tokenId: tokenId,
            caller: _msgSender(),
            callees: callees,
            price: price,
            escrowedAmount: msg.value,
            needLegalApproval: _needLegalApproval(tokenId, price, callees),
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
                (_isMaintener(callback.tokenId, _msgSender()) ||
                 _isLegalAuthority(callback.tokenId, _msgSender()) ||
                 _msgSender() == callback.caller), "Invalid arguments or permission");

        _callbacks[callbackId].refused = true;
        _accounts[callback.caller].ETHBalance += callback.escrowedAmount;

        emit CallbackUpdated(callbackId);
    }

    /**
     * @dev Approve a callback
     * @param callbackId callback proposition ID
     */
    function approveCallback(uint256 callbackId) external {
        Callback memory callback = _callbacks[callbackId];

        require(callback.tokenId != 0 &&
                _isLegalAuthority(callback.tokenId, _msgSender()) &&
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
                _isMaintener(callback.tokenId, _msgSender()) &&
                (!callback.needLegalApproval || callback.approvedByLegal) &&
                callback.refused == false &&
                callback.accepted == false &&
                callback.escrowedAmount >= _callbackPrice(callback.tokenId, callback.price, callback.callees),
                "Insufficient callback, permission or escrowed amount");

        _callbacks[callbackId].accepted = true;

        emit CallbackUpdated(callbackId);

        if (callback.callees.length > 0) {
            _executeCallback(callbackId, callback.callees.length);
        } else if (_tokens[callback.tokenId].holderList.length <= _config.callbackAutoExecuteMaxAccounts) {
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


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _needLegalApproval(uint256 tokenId, uint256 price, address[] memory callees) internal view returns (bool) {
        uint256 minHolding = (_tokens[tokenId].supply.mul(_tokens[tokenId].minHoldingForCallback)).div(10000);

        return price == 0 ||
               _tokens[tokenId].holders[_msgSender()].balance < minHolding ||
               callees.length > 0;
    }

    function _executeCallback(uint256 callbackId, uint256 maxCall) internal {
        uint256 tokenId = _callbacks[callbackId].tokenId;

        address[] memory callees = _callbacks[callbackId].callees.length > 0 ?
                                   _callbacks[callbackId].callees :
                                   _tokens[tokenId].holderList;

        uint256 start = _callbacks[callbackId].callCounter;
        uint256 end = start + maxCall <  callees.length - 1 ? start + maxCall : callees.length - 1;

        uint256 callbackAmount = 0;
        uint256 callbackPrice = 0;

        for (uint256 i = start; i <= end; i++) {
            uint256 calleeBalance = _tokens[tokenId].holders[callees[i]].balance;
            if (calleeBalance == 0) continue;

            uint256 price = calleeBalance.mul(_callbacks[callbackId].price);
            // pay the callee
            _accounts[callees[i]].ETHBalance = _accounts[callees[i]].ETHBalance.add(price);
            // and remove token from his account
            _tokens[tokenId].holders[callees[i]].balance = 0;
            // increment total amount and total price for the caller
            callbackAmount = callbackAmount.add(calleeBalance);
            callbackPrice = callbackPrice.add(price);
            // emit transfer event
            emit TransferSingle(_msgSender(), callees[i], _callbacks[callbackId].caller, tokenId, calleeBalance);
        }
        // remove total price from the escrowedAmount
        _callbacks[callbackId].escrowedAmount = _callbacks[callbackId].escrowedAmount.sub(callbackPrice);
        // add total token to the caller account
        _addToBalance(_callbacks[callbackId].caller, tokenId, callbackAmount);

        _callbacks[callbackId].callCounter = end;
        if (end == callees.length - 1) {
            _callbacks[callbackId].completed = true;
            emit CallbackUpdated(callbackId);
        }
    }

    function _callbackPrice(uint256 tokenId, uint256 price, address[] memory callees) internal view returns (uint256) {
        if (callees.length == 0) {
            // price for all the supply less the caller holding
            return (_tokens[tokenId].supply.sub(_tokens[tokenId].holders[_msgSender()].balance)).mul(price);
        }

        uint256 callbackAmount = 0;
        for (uint i; i < callees.length; i++) {
            callbackAmount += _tokens[tokenId].holders[callees[i]].balance;
        }
        return callbackAmount.mul(price);
    }

    function _isLegalAuthority(uint256 id, address account) internal view returns (bool) {
        return _tokens[id].legalAuthority == account;
    }

}
