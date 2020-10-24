// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './Mintable.sol';

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
    function authorizeMaintener(uint256 id, address account) external onlyOwner {
        _tokens[id].holders[account].isMaintener = true;
    }

    /**
     * @dev Function to revoke the authorization to maintain a token.
     * @param id the token id
     * @param account The authorized address
     */
    function revokeMaintener(uint256 id, address account) external onlyOwner {
        _tokens[id].holders[account].isMaintener = false;
    }

    /**
     * @dev Function to check if an address is authorized to maintain a token.
     * @param id the token id
     * @param account The authorized address
     * @return true if it's a maintener address
     */
    function isMaintener(uint256 id, address account) external view returns (bool) {
        return _isMaintener(id, account);
    }

    /**
     * @dev Function to update a token with the given ID.
     * @param id ID of the token to be updated
     * @param metadataHash Metadata file hash
     * @param transactionFees transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     * @param minHoldingForCallback minimum holding to propose a callback
     * @param isPrivate true if holder need approval
     * @param legalAuthority address of the legal authority
     */
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


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isMaintener(uint256 id, address account) internal view returns (bool) {
        return _tokens[id].holders[account].isMaintener || _isOwner();
    }

}
