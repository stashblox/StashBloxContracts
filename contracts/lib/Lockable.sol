// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Privatizable.sol';

contract Lockable is Privatizable {

    /****************************
    EVENTS
    *****************************/


    event AccountUpdated(address indexed _account, uint256 _documentHash);


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


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
     * @param account The address to lock
     */
    function lockAccount(address account, uint256 documentHash) external onlyOwner {
        _accounts[account].isLocked = true;
        emit AccountUpdated(account, documentHash);
    }

    /**
     * @dev Function to unlock an address.
     * @param account The address to unlock
     */
    function unlockAccount(address account, uint256 documentHash) external onlyOwner {
        _accounts[account].isLocked = false;
        emit AccountUpdated(account, documentHash);
    }

    /**
     * @dev Function to check if an address is lockec.
     * @param account The address to check
     */
    function isLockedAccount(address account) external view returns (bool){
        return _isLockedAccount(account);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _lockToken(uint256 id, uint256 documentHash) internal {
        _tokens[id].locked = true;
        emit TokenUpdated(id, documentHash);
    }

    function _unlockToken(uint256 id, uint256 documentHash) internal {
        _tokens[id].locked = false;
        emit TokenUpdated(id, documentHash);
    }

    function _isLockedToken(uint256 id) internal view returns (bool) {
        return _tokens[id].locked;
    }

    function _isLockedAccount(address account) internal view returns (bool) {
        return _accounts[account].isLocked;
    }

    function _isLockedMove(address from, address to, uint256 id, uint256 value) internal view returns (bool) {
        return _isLockedToken(id) || _isLockedAccount(from) || _isLockedAccount(to) || (value == 0);
    }

    // override ChargeableTransfer._moveTokens
    function _moveTokens(address operator, address from, address to, uint256 id, uint256 value) internal override returns (uint256 fees) {
        require(!_isLockedMove(from, to, id, value), "Locked");
        return super._moveTokens(operator, from, to, id, value);
    }
}
