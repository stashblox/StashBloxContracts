// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import './Maintenable.sol';

contract Privatizable is Maintenable {


    /**
     * @dev Function to approve holder for a private token.
     * @param id the token id
     * @param holder The authorized address
     */
    function approveHolder(uint256 id, address holder) external onlyMaintener(id) {
        _tokens[id].holders[holder].isApproved = true;
    }


    /**
     * @dev Function to revoke holder for a private token.
     * @param id the token id
     * @param holder The authorized address
     */
    function revokeHolder(uint256 id, address holder) external onlyMaintener(id) {
        _tokens[id].holders[holder].isApproved = false;
    }


    function _addToBalance(address recipient, uint256 id, uint256 value) internal override {
        require(!_tokens[id].isPrivate || _tokens[id].holders[recipient].isApproved, "Address not approved");
        super._addToBalance(recipient, id, value);
    }

}
