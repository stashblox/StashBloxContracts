// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.4;

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

    /**
     * @dev Function to update a token with the given ID.
     `params` must contains the following informations:

                             [0]: metadataHash
                             [1]: isPrivate
                             [2]: minHoldingForCallback
                             [3]: legalAuthority
                             [4]: standardFees
                             [5]: lumpSumFees
                             [6]: storageFees
                             [7]: feesUnitType
                             [8]: feesUnitAddress
                             [9]: feesUnitId
                            [10]: feesRecipient
                            [11]: decimals
                            [12]: maintener
                            [13]: locked

     * @param id ID of the token to be updated
     * @param params Token information
     */
    function updateToken(uint256 id, uint256[14] memory params) external onlyMaintener(id) {
        require(_tokens[id].supply > 0, "Unknown token");
        _setToken(id, params);
        emit TokenUpdated(id, params[0]);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isMaintener(uint256 id, address account) internal view returns (bool) {
        return _tokens[id].maintener == account || _config.owner == account;
    }

}
