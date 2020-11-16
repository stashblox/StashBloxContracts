// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Mintable.sol";

contract Lockable is Mintable {

    /****************************
    EVENTS
    *****************************/


    event AccountUpdated(address indexed _account, uint256 _documentHash);


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    /**
     * @dev Function to unlock an address.
     * @param account The address to unlock
     */
    function setAccountLock(
        address account,
        bool lock,
        uint256 documentHash
    )
        external onlyAuthorized(_msgSender(), Actions.LOCK_ACCOUNT, 0)
    {
        _accounts[account].isLocked = lock;
        emit AccountUpdated(account, documentHash);
    }

    /**
     * @dev Function to check if an address is lockec.
     * @param account The address to check
     */
    function isLockedAccount(address account) external view returns (bool){
        return _accounts[account].isLocked;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/

    // override ChargeableTransfer._moveTokens
    function _moveTokens(address operator, address from, address to, uint256 id, uint256 value) internal override returns (uint256 fees) {
        require(!(_tokens[id].locked || _accounts[from].isLocked || _accounts[to].isLocked || value == 0), "Locked");
        return super._moveTokens(operator, from, to, id, value);
    }
}
