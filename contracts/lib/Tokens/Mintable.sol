// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./ChargeableTransfer.sol";

contract Mintable is ChargeableTransfer {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @notice mint one or several tokens. For each token an ERC20 contract is deployed and
        the address is used as token ID. Use the event TokenCreated to retrieve this ID.
        @param recipient        The address that will own the minted tokens
        @param supply           Amount of the token to be minted
        @param metadataHashes   List of metadataHash, one by token.
        @param symbols          List of symbols, one by token, must be unique.
        @param properties       List of property names to set. Accepted values:
                                "decimals", "lumpSumFees", "standardFees",
                                "feesCurrencyId", "feesRecipient", "isPrivate", "locked",
                                "demurrageFees".
        @param values           List of values corresponding to the property names.
                                IMPORTANT: Those values are set for all the tokens created by the function call.
                                Order or property doesn't matter but should be identical for `properties` and `values`.
                                All properties are optional.
    */
    function createTokens(
        address recipient,
        uint256 supply,
        uint256[] memory metadataHashes,
        bytes16[] memory symbols,
        string[] memory properties,
        uint256[] memory values
    )
        external onlyAuthorized(_msgSender(), Actions.CREATE_TOKEN, 0)
    {
        require(metadataHashes.length == symbols.length, "invalid arguments");

        for (uint256 i = 0; i < metadataHashes.length; i++) {
            uint256 newId = _createToken(recipient, supply, metadataHashes[i], symbols[i], properties, values);
            emit TransferSingle(_msgSender(), address(0), recipient, newId, supply);
        }
    }

    /**
       @notice Function to get a property for a given token.
       @param id         Token ID
       @param property   Name of the property. Accepted values:
                         "decimals", "metadataHash", "lumpSumFees", "standardFees",
                         "feesCurrencyId", "feesRecipient", "isPrivate", "locked",
                         "demurrageFees".
       @return Value of the property. Should be cast if not uint256.
    */
    function getTokenProperty(uint256 id, string memory property) public view returns (uint256) {
        Token memory token = _tokens[id];
        uint8 index = _getPropertyIndex(property);
        uint256 value;

        if (index == 100) {
            value = _demurrageFees[id][_demurrageFees[id].length - 1].price;
        } else {
            assembly { value := mload(add(token, mul(32, index))) }
        }
        // TODO: support symbol
        return value;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    // called once by the constructor
    function _initTokenStructMap() internal {
        string[8] memory fieldList = [
          "decimals", "metadataHash", "lumpSumFees", "standardFees",
          "feesCurrencyId", "feesRecipient",
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
        uint8 index = _getPropertyIndex(property);

        if (index == 100) {
            _demurrageFees[id].push(DemurrageFees(block.timestamp, value));
        } else {
            assembly { mstore(add(token, mul(32, index)), value) }
            _tokens[id] = token;
        }
    }

    function _getPropertyIndex(string memory property) internal view returns (uint8) {
        bytes32 key;
        assembly { key := mload(add(property, 32)) }

        require(tokenStructMap[key] > 0, "invalid property name");

        return tokenStructMap[key];
    }

    function _createToken(
        address recipient,
        uint256 supply,
        uint256 metadataHash,
        bytes16 symbol,
        string[] memory properties,
        uint256[] memory values
    )
        internal returns (uint256)
    {
        require(_symbols[symbol] == 0 && supply > 0, "Invalid symbol or supply");

        uint256 id = nextTokenId;
        nextTokenId++;

        // set properties
        _setTokenProperties(id, properties, values);
        _tokens[id].supply = supply;
        _tokens[id].metadataHash = metadataHash;
        _tokens[id].symbol = symbol;
        _symbols[symbol] = id;
        // set default permissions
        _permissions[recipient][Actions.UPDATE_TOKEN][id] = true;
        _permissions[recipient][Actions.HOLD_PRIVATE_TOKEN][id] = true;
        // increase balance
        _addToBalance(recipient, id, supply);

        emit TokenCreated(id, metadataHash);
        return id;
    }

}
