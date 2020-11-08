// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./lib/Callable.sol";
import "./lib/Withdrawable.sol";
import "./lib/Configurable.sol";

/**
    @title A simulator for trees
    @author Larry A. Gardner
    @notice You can use this contract for only the most basic simulation
    @dev All function calls are currently implemented without side effects
 */
contract StashBlox is Callable, Withdrawable, Configurable {

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _config.callbackAutoExecuteMaxAccounts = 50;
        _config.baseURI = "http://stashblox.com/tokens/";
        _config.versionRecipient = "1.0.0+opengsn.stashblox";
        _config.tokenizer = msg.sender;
        _transferOwnership(msg.sender);

        _initTokenStructMap();

        uint256 chainId;
        assembly { chainId := chainid() }

        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("StashBloxContract")),
            keccak256(bytes("1.0.0")),
            chainId,
            address(this)
        ));
        PERMIT_TYPEHASH = keccak256("FreeSetApprovalForAll(address operator,address account,uint256 nonce,uint256 expiry,bool approved)");
    }

}
