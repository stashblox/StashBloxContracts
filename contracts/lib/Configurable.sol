// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Authorizable.sol";

contract Configurable is Authorizable {


    /****************************
    EVENTS
    *****************************/


    event ConfigUpdated();


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to update the contract configuration
     * @param baseURI base URI for the metadata URLs
     * @param versionRecipient version needed by GSN relay
     * @param proxyRegistryAccount trusted delegate proxy
     */
    function updateConfig(
        string calldata baseURI,
        string calldata versionRecipient,
        address proxyRegistryAccount
    )
        external onlyAuthorized(_msgSender(), Actions.UPDATE_CONFIG, 0)
    {

        _config.baseURI = baseURI;
        _config.versionRecipient = versionRecipient;
        _config.proxyRegistryAccount = proxyRegistryAccount;

        emit ConfigUpdated();
    }

    function getConfig() public view returns (Config memory) {
        return _config;
    }

}
