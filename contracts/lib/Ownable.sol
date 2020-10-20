// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

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
contract Ownable is IERC173 {
    address private _owner;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _transferOwnership(msg.sender);
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
        return _owner;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public override onlyOwner {
        _transferOwnership(newOwner);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function _isOwner() internal view returns (bool) {
        return msg.sender == _owner;
    }
}
