// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Ownable.sol';

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
     * @param GSNTrustedForwarder trusted GSN relay
     * @param proxyRegistryAddress trusted delegate proxy
     */
    function updateConfig(uint256 callbackAutoExecuteMaxAccounts,
                          string calldata baseURI,
                          string calldata versionRecipient,
                          address owner,
                          address GSNTrustedForwarder,
                          address proxyRegistryAddress) external onlyOwner {
        _config.callbackAutoExecuteMaxAccounts = callbackAutoExecuteMaxAccounts;
        _config.baseURI = baseURI;
        _config.versionRecipient = versionRecipient;
        if (_config.owner != owner) _transferOwnership(owner);
        _config.GSNTrustedForwarder = GSNTrustedForwarder;
        _config.proxyRegistryAddress = proxyRegistryAddress;

        emit ConfigUpdated();
    }

}
