// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import "./MultiToken.sol";

contract Mintable is MultiToken {

    using SafeMath for uint256;


    /****************************
    MODIFIERS
    *****************************/


    modifier onlyTokenizer() {
        require(_isTokenizer(_msgSender()), "Insufficient permission");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to authorize an address to create a token.
     * @param account The authorized address
     */
    function setTokenizerAuthorization(address account, bool isTokenizer) external onlyOwner {
        _accounts[account].isTokenizer = isTokenizer;
    }

    /**
     * @dev Function to check if an address is authorized to create a token.
     * @param account The authorized address
     */
    function isTokenizer(address account) external view returns (bool) {
        return _isTokenizer(account);
    }

    /**
     * @dev Function to mint an amount of a token with the given ID.
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

     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param params Token information
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256[12] memory params)
    external onlyTokenizer {
        _createToken(recipient,
                     id,
                     supply,
                     params);
        emit TransferSingle(_msgSender(), address(0), recipient, id, supply);
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

            emit TransferSingle(_msgSender(),
                                address(0),
                                _holderList[id][0],
                                ids[i],
                                _tokens[id].supply);
        }
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isTokenizer(address account) internal view returns (bool) {
        return _accounts[account].isTokenizer || (account == _config.owner);
    }
    /*
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
    */
    function _setToken(uint256 id, uint256[12] memory params) internal {
        require(params[2] < 10000 &&      // minHoldingForCallback
                params[7] <= 2,         // 0 ether, 1 erc20, 2 erc1155
                "Invalid arguments");

        if (_tokens[id].metadataHash != params[0]) emit URI(uri(id), id);
        _tokens[id].metadataHash = params[0];
        _tokens[id].isPrivate = params[1] > 0;
        _tokens[id].minHoldingForCallback = params[2];
        _tokens[id].legalAuthority = address(uint160(params[3]));
        _tokens[id].standardFees = params[4];
        _tokens[id].lumpSumFees = params[5];
        _storageFees[id].push([block.timestamp, params[6]]);
        _tokens[id].feesUnitType = params[7];
        _tokens[id].feesUnitAddress = address(uint160(params[8]));
        _tokens[id].feesUnitId = params[9];
        _tokens[id].feesRecipient = address(uint160(params[10]));
        _tokens[id].decimals = params[11];
    }


    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          uint256[12] memory params)
    internal {
        require(_tokens[id].supply == 0 && supply > 0, "Invalid arguments");

        _tokens[id].supply = supply;
        _holders[id][_msgSender()].isMaintener = true;
        _holders[id][recipient].isApproved = true;

        _setToken(id, params);

        _addToBalance(recipient, id, supply);
    }

    function _cloneToken(uint256 id, uint256 cloneId, uint256 metadataHash) internal {
        _createToken(_holderList[id][0],
                     cloneId,
                     _tokens[id].supply,
                     [
                         metadataHash,
                         _tokens[id].isPrivate ? 1 : 0,
                         _tokens[id].minHoldingForCallback,
                         uint256(uint160(_tokens[id].legalAuthority)),
                         _tokens[id].standardFees,
                         _tokens[id].lumpSumFees,
                         _storageFees[id][0][1],
                         _tokens[id].feesUnitType,
                         uint256(uint160(_tokens[id].feesUnitAddress)),
                         _tokens[id].feesUnitId,
                         uint256(uint160(_tokens[id].feesRecipient)),
                         _tokens[id].decimals
                     ]);
    }

}
