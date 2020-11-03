// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

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

        string[13] memory fieldList = [
          "decimals", "metadataHash", "minHoldingForCallback",
          "lumpSumFees", "standardFees", "feesUnitType",
          "feesUnitId", "feesUnitAddress", "feesRecipient",
          "legalAuthority", "maintener", "isPrivate",
          "locked"
        ];
        for (uint8 i = 0; i < fieldList.length; i++) {
            string memory skey = fieldList[i];
            bytes32 key;
            assembly {
                key := mload(add(skey, 32))
            }
            tokenStructMap[key] = i + 1;
        }
    }

}
