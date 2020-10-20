// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import "./ERC1155.sol";

contract Mintable is ERC1155 {

    using SafeMath for uint256;
    

    /****************************
    MODIFIERS
    *****************************/


    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "Insufficient permission");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to authorize an address to create a token.
     * @param tokenizer The authorized address
     */
    function authorizeTokenizer(address tokenizer) external onlyOwner {
        _users[tokenizer].isTokenizer = true;
    }

    /**
     * @dev Function to revoke the authorization to create a token.
     * @param tokenizer The authorized address
     */
    function revokeTokenizer(address tokenizer) external onlyOwner {
        _users[tokenizer].isTokenizer = false;
    }

    /**
     * @dev Function to check if an address is authorized to create a token.
     * @param tokenizer The authorized address
     */
    function isTokenizer(address tokenizer) external view returns (bool) {
        return _isTokenizer(tokenizer);
    }

    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param metadataHash Metadata file hash
     * @param transactionFees transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     * @param minHoldingForCallback minimum holding to propose a callback
     * @param isPrivate true if holder need approval
     * @param legalAuthority address of the legal authority
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256 decimals,
                         uint256 metadataHash,
                         uint256[3] memory transactionFees,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage,
                         uint256 minHoldingForCallback,
                         bool isPrivate,
                         address legalAuthority)
    external onlyTokenizer {
        _createToken(recipient,
                     id,
                     supply,
                     decimals,
                     metadataHash,
                     transactionFees,
                     feesRecipients,
                     feesRecipientsPercentage,
                     minHoldingForCallback,
                     isPrivate,
                     legalAuthority);
        emit TransferSingle(msg.sender, address(0), recipient, id, supply);
    }

    /**
     * @dev Function to mint tokens in batch.
     * @param id Identifier of the template
     * @param ids list of IDs of the tokens to be minted
     * @param metadataHashes list of metadata file hashes
     */
    function cloneToken(uint256 id,
                        uint256[] memory ids,
                        uint256[] memory metadataHashes)
    external onlyTokenizer {
        require(_tokens[id].supply > 0 &&
                ids.length == metadataHashes.length, "Invalid arguments");

        for (uint256 i = 0; i < ids.length; ++i) {
            _cloneToken(id, ids[i], metadataHashes[i]);

            emit TransferSingle(msg.sender,
                                address(0),
                                _tokens[id].holderList[0],
                                ids[i],
                                _tokens[id].supply);
        }
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _users[tokenizer].isTokenizer || _isOwner();
    }

    function _setToken(uint256 id,
                       uint256 metadataHash,
                       uint256[3] memory transactionFees,
                       address[] memory feesRecipients,
                       uint256[] memory feesRecipientsPercentage,
                       uint256 minHoldingForCallback,
                       bool isPrivate,
                       address legalAuthority)
    internal {
        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < feesRecipientsPercentage.length; ++i)
            totalPercentage += feesRecipientsPercentage[i];

        require(feesRecipients.length > 0 && feesRecipients.length == feesRecipients.length &&
                totalPercentage == 10000 &&
                minHoldingForCallback < 10000,
                "Invalid arguments");

        _tokens[id].metadataHash = metadataHash;
        _tokens[id].lumpSumTransactionFees = transactionFees[0];
        _tokens[id].valueTransactionFees = transactionFees[1];
        _tokens[id].storageCostHistory.push([block.timestamp, transactionFees[2]]);
        _tokens[id].feesRecipients = feesRecipients;
        _tokens[id].feesRecipientsPercentage = feesRecipientsPercentage;
        _tokens[id].minHoldingForCallback = minHoldingForCallback;
        _tokens[id].isPrivate = isPrivate;
        _tokens[id].legalAuthority = legalAuthority;
    }


    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          uint256 decimals,
                          uint256 metadataHash,
                          uint256[3] memory transactionFees,
                          address[] memory feesRecipients,
                          uint256[] memory feesRecipientsPercentage,
                          uint256 minHoldingForCallback,
                          bool isPrivate,
                          address legalAuthority)
    internal {
        require(_tokens[id].supply == 0 && supply > 0, "Invalid arguments");

        _tokens[id].supply = supply;
        _tokens[id].decimals = decimals;
        _tokens[id].holders[msg.sender].isMaintener = true;
        _tokens[id].holders[recipient].isApproved = true;

        _setToken(id,
                  metadataHash,
                  transactionFees,
                  feesRecipients,
                  feesRecipientsPercentage,
                  minHoldingForCallback,
                  isPrivate,
                  legalAuthority);

        _addToBalance(recipient, id, supply);
    }

    function _cloneToken(uint256 id, uint256 cloneId, uint256 metadataHash) internal {
        _createToken(_tokens[id].holderList[0],
                     cloneId,
                     _tokens[id].supply,
                     _tokens[id].decimals,
                     metadataHash,
                     [
                       _tokens[id].lumpSumTransactionFees,
                       _tokens[id].valueTransactionFees,
                       _tokens[id].storageCostHistory[0][1]
                     ],
                     _tokens[id].feesRecipients,
                     _tokens[id].feesRecipientsPercentage,
                     _tokens[id].minHoldingForCallback,
                     _tokens[id].isPrivate,
                     _tokens[id].legalAuthority);
    }

}
