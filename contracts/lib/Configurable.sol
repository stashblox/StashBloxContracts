// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";

contract Configurable is Ownable {


    /****************************
    EVENTS
    *****************************/


    event ConfigUpdated();


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to update the contract configuration
     * @param callbackAutoExecuteMaxAccounts max holders to execute the callback on acceptation
     * @param baseURI base URI for the metadata URLs
     * @param versionRecipient version needed by GSN relay
     * @param owner ew owner of the contract
     * @param gsnTrustedForwarder trusted GSN relay
     * @param proxyRegistryAccount trusted delegate proxy
     */
    function updateConfig(uint256 callbackAutoExecuteMaxAccounts,
                          string calldata baseURI,
                          string calldata versionRecipient,
                          address owner,
                          address gsnTrustedForwarder,
                          address proxyRegistryAccount,
                          address tokenizer) external onlyOwner {

        _config.callbackAutoExecuteMaxAccounts = callbackAutoExecuteMaxAccounts;
        _config.baseURI = baseURI;
        _config.versionRecipient = versionRecipient;
        if (_config.owner != owner) _transferOwnership(owner);
        _config.gsnTrustedForwarder = gsnTrustedForwarder;
        _config.proxyRegistryAccount = proxyRegistryAccount;
        _config.tokenizer = tokenizer;

        emit ConfigUpdated();
    }

    function getConfig() public returns (Config memory) {
        return _config;
    }

}
