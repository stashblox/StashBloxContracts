// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Core/Core.sol";
import "../interfaces/IERC165.sol";

contract Config is Core, IERC165 {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @dev Function to update the contract configuration
        @param baseURI base URI for the metadata URLs
        @param versionRecipient version needed by GSN relay
        @param proxyRegistryAccount trusted delegate proxy
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

    /**
        @dev Function get the current configuration
        @return return a Config struct containing the following meembers:<br />
        <br />
            address owner;<br />
            address proxyRegistryAccount;<br />
            address ERC20Code;<br />
            bytes32 DOMAIN_SEPARATOR;<br />
            bytes32 APPROVAL_TYPEHASH;<br />
            bytes32 ESCROW_TYPEHASH;<br />
            bytes32 SALT;<br />
            string baseURI;<br />
            string versionRecipient;<br />
        <br />
    */
    function getConfig() public view returns (Config memory) {
        return _config;
    }

    /**
       @notice Query if a contract implements an interface
       @param interfaceID  The interface identifier, as specified in ERC-165
       @return `true` if the contract implements `interfaceID` and
    */
    function supportsInterface(bytes4 interfaceID) external view override returns (bool) {
        return _supportedInterfaces[interfaceID];
    }

}
