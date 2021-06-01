// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./lib/Accounts/Accounts.sol";
import "./lib/Config.sol";
import "./lib/Tokens/Tokens.sol";

/**
    @title Stashblox contract
    @author Ouziel Slama
    @notice The ultimate token factory
 */
contract StashBlox is Config, Accounts, Tokens {

    /**
        @dev Initializes the contract setting the deployer as the initial owner.
        @param salt       The salt used to generate the ERC712 DOMAIN_SEPARATOR
    */
    constructor (bytes32 salt) {
        _config.baseURI = "http://stashblox.com/tokens/";
        _config.versionRecipient = "1.0.0+opengsn.stashblox";

        _supportedInterfaces[0x01ffc9a7] = true; // ERC165
        _supportedInterfaces[0xd9b67a26] = true; // ERC1155
        _supportedInterfaces[0x0e89341c] = true; // ERC1155Metadata
        // TODO: complete interfaces

        _transferOwnership(msg.sender);
        _initTokenStructMap();
        _initGasLessTransactions(salt);

        _currencies[0] = Currency(0, 0, address(0)); //register ETH currency
    }

}
