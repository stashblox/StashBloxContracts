// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;


import "./ERC1155Vault.sol";
import "./ETHVault.sol";

contract Accounts is ERC1155Vault, ETHVault {


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


    function getExternalBalance(address account, uint256 currencyId) public view returns (uint256) {
        return _accounts[account].externalBalances[currencyId];
    }


}
