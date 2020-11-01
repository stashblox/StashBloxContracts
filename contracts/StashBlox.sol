// SPDX-License-Identifier: GPL-3.0-or-later
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
    }

}
