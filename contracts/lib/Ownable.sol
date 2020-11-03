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
contract Ownable is IERC173, GSNCapable {

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _transferOwnership(_msgSender());
    }


    /****************************
    MODIFIERS
    *****************************/


    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_isOwner(), "Ownable: caller is not the owner");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


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
    function transferOwnership(address account) public override onlyOwner {
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

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function _isOwner() internal view returns (bool) {
        return _msgSender() == _config.owner;
    }
}
