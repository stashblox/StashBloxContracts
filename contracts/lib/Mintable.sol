// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.4;

import "../utils/SafeMath.sol";
import "./MultiToken.sol";

contract Mintable is MultiToken {

    using SafeMath for uint256;


    /****************************
    MODIFIERS
    *****************************/


    modifier onlyTokenizer() {
        address account = _msgSender();
        require((account == _config.tokenizer) || (account == _config.owner), "Insufficient permission");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    /**
     * @notice create token
     * @dev Function to mint an amount of a token with the given ID.
     * `params` must contains the following informations:<br />
     * <br />
     *                          [0]: metadataHas<br />
     *                          [1]: isPrivate<br />
     *                          [2]: minHoldingForCallback<br />
     *                          [3]: legalAuthority<br />
     *                          [4]: standardFees<br />
     *                          [5]: lumpSumFees<br />
     *                          [6]: storageFees<br />
     *                          [7]: feesUnitType<br />
     *                          [8]: feesUnitAddress<br />
     *                          [9]: feesUnitId<br />
     *                         [10]: feesRecipient<br />
     *                         [11]: decimals<br />
     *                         [12]: maintener<br />
     *                         [13]: locked<br />
     * <br />
     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param params Token information
    */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256[14] memory params)
    external onlyTokenizer {
        _createToken(recipient, id, supply, params);
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
        require(_tokens[id].supply > 0 && ids.length == metadataHashes.length, "Invalid arguments");
        for (uint256 i = 0; i < ids.length; ++i) {
            _cloneToken(id, ids[i], metadataHashes[i]);
            emit TransferSingle(_msgSender(), address(0),  _holderList[id][0], ids[i], _tokens[id].supply);
        }
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


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
                   [12]: maintener
                   [13]: locked
    */
    function _setToken(uint256 id, uint256[14] memory params) internal {
        require(params[2] < 10000 &&      // minHoldingForCallback
                params[7] <= 2,         // 0 ether, 1 erc20, 2 erc1155
                "Invalid arguments");

        Token memory token;
        token.supply = _tokens[id].supply;
        token.metadataHash = params[0];
        token.isPrivate = params[1] > 0;
        token.minHoldingForCallback = params[2];
        token.legalAuthority = address(uint160(params[3]));
        token.standardFees = params[4];
        token.lumpSumFees = params[5];
        _storageFees[id].push([block.timestamp, params[6]]);
        token.feesUnitType = params[7];
        token.feesUnitAddress = address(uint160(params[8]));
        token.feesUnitId = params[9];
        token.feesRecipient = address(uint160(params[10]));
        token.decimals = params[11];
        token.maintener = address(uint160(params[12]));
        token.locked = params[13] > 0;

        if (_tokens[id].metadataHash != params[0]) emit URI(uri(id), id);

        _tokens[id] = token;
    }


    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          uint256[14] memory params)
    internal {
        require(_tokens[id].supply == 0 && supply > 0, "Invalid arguments");

        _tokens[id].supply = supply;
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
                         _tokens[id].decimals,
                         uint256(uint160(_tokens[id].maintener)),
                         _tokens[id].locked ? 1 : 0
                     ]);
    }

}
