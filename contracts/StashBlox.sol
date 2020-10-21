// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './lib/Callable.sol';
import './lib/Withdrawable.sol';

contract StashBlox is Callable, Withdrawable {

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _config.callbackAutoExecuteMaxAddresses = 50;
        _config.baseURI = "http://stashblox.com/tokens/";
        _transferOwnership(msg.sender);
    }

}
