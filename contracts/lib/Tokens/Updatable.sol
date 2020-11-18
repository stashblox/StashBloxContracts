// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../../utils/SafeMath.sol";
import "../../utils/StringUtils.sol";
import "./Mintable.sol";

contract Updatable is Mintable {

    using SafeMath for uint256;

    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    function updateToken(
        uint256 id,
        string[] memory properties,
        uint256[] memory values
    )
        external onlyAuthorized(_msgSender(), Actions.UPDATE_TOKEN, id)
    {
        require(properties.length == values.length, "invalid arguments");
        uint256 originalMeta = _tokens[id].metadataHash;

        for (uint256 i = 0; i < properties.length; i++) {
            _setTokenProperty(id, properties[i], values[i]);
        }
        emit TokenUpdated(id, _tokens[id].metadataHash);
        if (originalMeta != _tokens[id].metadataHash) {
            emit URI(StringUtils._strConcat(_config.baseURI, StringUtils._toHexString(id)), id);
        }
    }


    /**
     * @dev Function to approve holder for a private token.
     * @param id the token id
     * @param account The authorized address
     */
    function setAccountApproval(
        uint256 id,
        address account,
        bool isApproved
    )
        external onlyAuthorized(_msgSender(), Actions.UPDATE_TOKEN, id)
    {
        _permissions[account][Actions.HOLD_PRIVATE_TOKEN][id] = isApproved;
    }


    function callTokens(
        address caller,
        address[] calldata callees,
        uint256 id,
        uint256 price,
        uint256 currencyId
    )
        external onlyAuthorized(_msgSender(), Actions.CALL_TOKENS, id)
    {
        for (uint256 i = 0; i < callees.length; i++) {
            uint256 totalPrice = _accounts[callees[i]].tokens[id].balance.mul(price);
            // move tokens
            _accounts[caller].tokens[id].balance = _accounts[caller].tokens[id].balance.add(_accounts[callees[i]].tokens[id].balance);
            _accounts[callees[i]].tokens[id].balance = 0;
            // move price
            _accounts[caller].externalBalances[currencyId] = _accounts[caller].externalBalances[currencyId].sub(totalPrice, "Insufficient balance");
            _accounts[callees[i]].externalBalances[currencyId] = _accounts[callees[i]].externalBalances[currencyId].add(totalPrice);
        }
    }


}
