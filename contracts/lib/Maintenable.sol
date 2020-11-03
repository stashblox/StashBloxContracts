// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./Mintable.sol";

contract Maintenable is Mintable {


    /****************************
    EVENTS
    *****************************/

    /**
        @dev  TokenUpdated when token is updated
        @notice  TokenUpdated when token is updated
    */
    event TokenUpdated(uint256 indexed _id, uint256 _documentHash);


    /****************************
    MODIFIERS
    *****************************/


    modifier onlyMaintener(uint256 id) {
        require(_isMaintener(id, _msgSender()), "Insufficient permission");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/
    

    function setTokenProperties(uint256 id, string[] memory properties, uint256[] memory values) external onlyMaintener(id) {
        require(properties.length == values.length, "invalid arguments");

        for (uint256 i = 0; i < properties.length; i++) {
            _setTokenProperty(id, properties[i], values[i]);
        }
        emit TokenUpdated(id, _tokens[id].metadataHash);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isMaintener(uint256 id, address account) internal view returns (bool) {
        return _tokens[id].maintener == account || _config.owner == account;
    }

}
