// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "./Mintable.sol";

contract Maintenable is Mintable {


    /****************************
    EVENTS
    *****************************/


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
     * @dev Function to authorize an address to maintain a token.
     * @param account The authorized address
     */
    function setMaintenerAuthorization(uint256 id, address account, bool isMaintener) external onlyOwner {
        _holders[id][account].isMaintener = isMaintener;
    }


    /**
     * @dev Function to check if an address is authorized to maintain a token.
     * @param id the token id
     * @param account The authorized address
     * @return true if it"s a maintener address
     */
    function isMaintener(uint256 id, address account) external view returns (bool) {
        return _isMaintener(id, account);
    }

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

     * @param id ID of the token to be updated
     * @param params Token information
     */
    function updateToken(uint256 id, uint256[11] memory params) external onlyMaintener(id) {
        require(_tokens[id].supply > 0, "Unknown token");

        _setToken(id, params);

        emit TokenUpdated(id, params[0]);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isMaintener(uint256 id, address account) internal view returns (bool) {
        return _holders[id][account].isMaintener || (account == _config.owner);
    }

}
