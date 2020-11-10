// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Mintable.sol";

contract Privatizable is Mintable {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to approve holder for a private token.
     * @param id the token id
     * @param account The authorized address
     */
    function setAccountApproval(uint256 id, address account, bool isApproved) external onlyMaintener(id) {
        _accounts[account].tokens[id].isApproved = isApproved;
    }


    /**
     * @dev Function to check if an account is approved for a given token.
     * @param id The token ID
     */
    function isApprovedAccount(uint256 id, address account) external view returns (bool){
        return _accounts[account].tokens[id].isApproved;
    }

  

}
