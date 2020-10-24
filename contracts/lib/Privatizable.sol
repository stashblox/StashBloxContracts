// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Maintenable.sol';

contract Privatizable is Maintenable {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to approve holder for a private token.
     * @param id the token id
     * @param account The authorized address
     */
    function approveAccount(uint256 id, address account) external onlyMaintener(id) {
        _tokens[id].holders[account].isApproved = true;
    }


    /**
     * @dev Function to revoke holder for a private token.
     * @param id the token id
     * @param account The authorized address
     */
    function revokeAccount(uint256 id, address account) external onlyMaintener(id) {
        _tokens[id].holders[account].isApproved = false;
    }


    /**
     * @dev Function to check if an account is approved for a given token.
     * @param id The token ID
     */
    function isApprovedAccount(uint256 id, address account) external view returns (bool){
        return _tokens[id].holders[account].isApproved;
    }

    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    // override ChargeableTransfer._addToBalance()
    function _addToBalance(address account, uint256 id, uint256 value) internal override {
        require(!_tokens[id].isPrivate || _tokens[id].holders[account].isApproved, "Account not approved");
        super._addToBalance(account, id, value);
    }

}
