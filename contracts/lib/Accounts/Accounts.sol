// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;


import "./ERC1155Vault.sol";
import "./ETHVault.sol";

contract Accounts is ERC1155Vault, ETHVault {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    function getAccount(address account) public view returns (bool, uint256, uint256[] memory) {
        return (_accounts[account].isLocked, _accounts[account].nonce, _accounts[account].tokenList);
    }

    /**
        @notice Get the balance of ETH and external ERC1155 stored by the contract. These balances can be
        used to pay transfer fees and withdrawed with the functions `withdrawETH` and `withdrawERC1155`.
        @param    account The address of the holder
        @param    currencyId The ID of the currency
        @return   The account's balance of the currency requested
    */
    function getExternalBalance(
        address account,
        uint256 currencyId
    )
        public view returns (uint256)
    {
        require(_currencies[currencyId].currencyType != 1, "no balance for erc20");
        return _accounts[account].externalBalances[currencyId];
    }

    /**
        @dev Function to register a currency that can be used to pay chargeable transfer
        @param currencyId       ID of the new currency
        @param contractAddress  contract address for erc20 and erc1155 tokens
        @param tokenId          ID of the erc1155 token
    */
    function registerCurreny(
        uint256 currencyId,
        address contractAddress,
        uint256 tokenId
    )
        external onlyAuthorized(_msgSender(), Actions.REGISTER_CURRENCY, 0)
    {
        require(currencyId != 0 &&
                contractAddress != address(0) &&
                _currencies[currencyId].contractAddress == address(0),
                "invalid arguments");

        _currencies[currencyId] = Currency(
            tokenId == 0 ? 1 : 2, // erc20 if no tokenId, else erc1155
            tokenId,
            contractAddress
        );

        // TODO: event or getter
    }

}
