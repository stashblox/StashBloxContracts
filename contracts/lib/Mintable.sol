// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../utils/SafeMath.sol";
import "./GasLess.sol";

contract Mintable is GasLess {

    using SafeMath for uint256;

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
     * @notice create token
     * @dev Function to mint an amount of a token with the given ID.
     * @param recipient The address that will own the minted tokens
     * @param ids ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param properties Token information
     * @param values Token information
    */
    function createTokens(address recipient,
                          uint256[] memory ids,
                          uint256 supply,
                          string[] memory properties,
                          uint256[] memory values)
    external {
        address account = _msgSender();
        require((account == _config.tokenizer) || (account == _config.owner), "Insufficient permission");

        for (uint256 i = 0; i < ids.length; i++) {
            _createToken(recipient, ids[i], supply, properties, values);
            emit TransferSingle(_msgSender(), address(0), recipient, ids[i], supply);
        }
    }


    function updateToken(uint256 id, string[] memory properties, uint256[] memory values) external onlyMaintener(id) {
        require(properties.length == values.length, "invalid arguments");

        for (uint256 i = 0; i < properties.length; i++) {
            _setTokenProperty(id, properties[i], values[i]);
        }
        emit TokenUpdated(id, _tokens[id].metadataHash);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/

    // called once by the constructor
    function _initTokenStructMap() internal {
        string[13] memory fieldList = [
          "decimals", "metadataHash", "minHoldingForCallback", "lumpSumFees", "standardFees", "feesUnitType", "feesUnitId",
          "feesUnitAddress", "feesRecipient", "legalAuthority", "maintener",
          "isPrivate", "locked"
        ];
        for (uint8 i = 0; i < fieldList.length; i++) {
            string memory skey = fieldList[i];
            bytes32 key;
            assembly { key := mload(add(skey, 32)) }
            tokenStructMap[key] = i + 1;
        }
        tokenStructMap["demurrageFees"] = 100;
    }

    function _setTokenProperties(uint256 id, string[] memory properties, uint256[] memory values) internal {
        require(properties.length == values.length, "invalid arguments");

        for (uint256 i = 0; i < properties.length; i++) {
            _setTokenProperty(id, properties[i], values[i]);
        }
    }

    function _setTokenProperty(uint256 id, string memory property, uint256 value) internal {
        Token memory token = _tokens[id];

        bytes32 key;
        assembly { key := mload(add(property, 32)) }

        uint8 index = tokenStructMap[key];
        require(index > 0, "invalid property name");

        if (index == 100) {
            _demurrageFees[id].push(DemurrageFees(block.timestamp, value));
        } else {
            assembly { mstore(add(token, mul(32, index)), value) }
            _tokens[id] = token;
        }
    }

    function _createToken(address recipient,
                          uint256 id,
                          uint256 supply,
                          string[] memory properties,
                          uint256[] memory values)
    internal {
        require(_tokens[id].supply == 0 && supply > 0, "Invalid arguments");

        _tokens[id].supply = supply;
        _setTokenProperties(id, properties, values);

        _accounts[recipient].tokens[id].isApproved = true;
        _addToBalance(recipient, id, supply);
    }

    function _cloneToken(uint256 id, uint256 cloneId, uint256 metadataHash) internal {
        require(_tokens[cloneId].supply == 0, "invalid clone ID");

        Token memory token = _tokens[id];
        token.metadataHash = metadataHash;
        _tokens[cloneId] = token;
        uint256 latestDemurrageFees = _demurrageFees[id][_demurrageFees[id].length-1].price;
        _demurrageFees[cloneId].push(DemurrageFees(block.timestamp, latestDemurrageFees));

        address recipient = _tokens[id].holderList[0];
        _accounts[recipient].tokens[id].isApproved = true;
        _addToBalance(recipient, cloneId, _tokens[cloneId].supply);
    }

    function _isMaintener(uint256 id, address account) internal view returns (bool) {
        return _tokens[id].maintener == account || _config.owner == account;
    }

}
