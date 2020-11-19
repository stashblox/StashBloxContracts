// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;


import "./ERC1155Vault.sol";
import "./ETHVault.sol";

contract Accounts is ERC1155Vault, ETHVault {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    function getExternalBalance(address account, uint256 currencyId) public view returns (uint256) {
        return _accounts[account].externalBalances[currencyId];
    }


}
