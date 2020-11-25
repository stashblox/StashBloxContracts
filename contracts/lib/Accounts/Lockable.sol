// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;


import "../Core/Core.sol";

contract Lockable is Core {


    /****************************
    MODIFIERS
    *****************************/


    modifier onlyUnlockedAccount(address account) {
        require(!_accounts[account].isLocked, "account locked");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @dev Function to unlock an address
        @param account The address to unlock
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
        @dev Function to check if an address is locked
        @param account The address to check
    */
    function isLockedAccount(address account) external view returns (bool) {
        return _accounts[account].isLocked;
    }

}
