// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "./GSNCapable.sol";
import "../interfaces/IERC173.sol";
/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Authorizable is IERC173, GSNCapable {


    /****************************
    MODIFIERS
    *****************************/

    modifier onlyAuthorized(address account, Actions action, uint256 objectId) {
        require(isAuthorized(account, action, objectId), "not authorized");
        _;
    }

    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    function setAuthorization(
        address account,
        Actions action,
        uint256 objectId,
        bool authorized
    )
        external onlyAuthorized(_msgSender(), Actions.SET_AUTHORIZATION, 0)
    {
        _permissions[account][action][objectId] = authorized;
    }


    function isAuthorized(
        address account,
        Actions action,
        uint256 objectId
    )
        public view returns (bool)
    {
        if (account == _config.owner) return true;
        return _permissions[account][action][objectId];
    }


    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view override returns (address) {
        return _config.owner;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * @param account address of the new owner
     * Can only be called by the current owner.
     */
    function transferOwnership(
        address account
    )
        public override onlyAuthorized(_msgSender(), Actions.TRANSFER_OWNERSHIP, 0)
    {
        _transferOwnership(account);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address account) internal {
        require(account != address(0), "invalid account");
        emit OwnershipTransferred(_config.owner, account);
        _config.owner = account;
    }

}
