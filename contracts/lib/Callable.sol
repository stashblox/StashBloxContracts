// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Lockable.sol';

contract Callable is Lockable {

    using SafeMath for uint256;


    /****************************
    EVENTS
    *****************************/


    event CallbackUpdated(uint256 indexed _CallbackId);


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


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


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


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

    function _isLegalAuthority(uint256 id, address legalAuthority) internal view returns (bool) {
        return _tokens[id].legalAuthority == legalAuthority;
    }

}
