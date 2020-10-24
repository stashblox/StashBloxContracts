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
    function approveHolder(uint256 id, address account) external onlyMaintener(id) {
        _tokens[id].holders[account].isApproved = true;
    }


    /**
     * @dev Function to revoke holder for a private token.
     * @param id the token id
     * @param account The authorized address
     */
    function revokeHolder(uint256 id, address account) external onlyMaintener(id) {
        _tokens[id].holders[account].isApproved = false;
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
