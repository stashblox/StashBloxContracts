// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import './Mintable.sol';


contract Maintenable is Mintable {

    using SafeMath for uint256;


    /***************************************
    PERMISSIONS
    ****************************************/


    function _isMaintener(uint256 id, address maintener) internal view returns (bool) {
        return _tokens[id].holders[maintener].isMaintener || _isOwner();
    }

    modifier onlyMaintener(uint256 id) {
        require(_isMaintener(id, msg.sender), "Insufficient permission");
        _;
    }

    /**
     * @dev Function to authorize an address to maintain a token.
     * @param maintener The authorized address
     */
    function authorizeMaintener(uint256 id, address maintener) external onlyOwner {
        _tokens[id].holders[maintener].isMaintener = true;
    }

    /**
     * @dev Function to revoke the authorization to maintain a token.
     * @param id the token id
     * @param maintener The authorized address
     */
    function revokeMaintener(uint256 id, address maintener) external onlyOwner {
        _tokens[id].holders[maintener].isMaintener = false;
    }

    /**
     * @dev Function to check if an address is authorized to maintain a token.
     * @param id the token id
     * @param maintener The authorized address
     * @return true if it's a maintener address
     */
    function isMaintener(uint256 id, address maintener) external view returns (bool) {
        return _isMaintener(id, maintener);
    }


    /***************************************
    TOKENS CREATION AND MAINTENANCE FUNCTIONS
    ****************************************/


    function updateToken(uint256 id,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool isPrivate,
                         address legalAuthority) external onlyMaintener(id) {
        require(_tokens[id].supply > 0, "Unknown token");

        _setToken(id,
                  metadataHash,
                  transactionFees,
                  feesRecipients,
                  feesRecipientsPercentage,
                  minHoldingForCallback,
                  isPrivate,
                  legalAuthority);

        emit TokenUpdated(id, metadataHash);
    }

}
