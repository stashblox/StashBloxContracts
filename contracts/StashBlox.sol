// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./lib/Lockable.sol";
import "./lib/Withdrawable.sol";
import "./lib/Configurable.sol";

/**
    @title A simulator for trees
    @author Larry A. Gardner
    @notice You can use this contract for only the most basic simulation
    @dev All function calls are currently implemented without side effects
 */
contract StashBlox is Lockable, Withdrawable, Configurable {

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor (bytes32 salt) {
        _config.baseURI = "http://stashblox.com/tokens/";
        _config.versionRecipient = "1.0.0+opengsn.stashblox";

        _config.INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;
        _config.INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;
        _config.RECEIVER_SINGLE_MAGIC_VALUE = 0xf23a6e61;
        _config.RECEIVER_BATCH_MAGIC_VALUE = 0xbc197c81;

        _transferOwnership(msg.sender);
        _initTokenStructMap();
        _initGasLessTransactions(salt);

        _currencies[0] = Currency(0, 0, address(0)); //register ETH currency
    }

}
