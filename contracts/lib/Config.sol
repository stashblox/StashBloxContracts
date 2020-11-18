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

    /**
     * @notice Query if a contract implements an interface
     * @param _interfaceID  The interface identifier, as specified in ERC-165
     * @return `true` if the contract implements `_interfaceID` and
     */
    function supportsInterface(bytes4 _interfaceID) external view override returns (bool) {
        return _supportedInterfaces[_interfaceID];
    }


    function registerCurreny(
        uint256 currencyId,
        address contractAddress,
        uint256 tokenId
    )
        external onlyAuthorized(_msgSender(), Actions.REGISTER_CURRENCY, 0)
    {
        require(currencyId !=0 &&
                contractAddress != address(0) &&
                _currencies[currencyId].contractAddress == address(0),
                "invalid arguments");

        _currencies[currencyId] = Currency(
            tokenId == 0 ? 1 : 2, // erc20 if no tokenId, else erc1155
            tokenId,
            contractAddress
        );
    }
}
