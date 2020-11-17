// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../../interfaces/IERC1155.sol";
import "../../interfaces/IERC1155Metadata.sol";
import "../../interfaces/IERC1155Receiver.sol";

import "../../utils/SafeMath.sol";
import "../../utils/Address.sol";
import "../../utils/StringUtils.sol";

import "../Core/Core.sol";
import "./ChargeableTransfer.sol";
import "./DelegableTransfer.sol";

contract OwnableDelegateProxy { } // solhint-disable-line no-empty-blocks

interface ProxyRegistry {
    function proxies(address account) view external returns (OwnableDelegateProxy);
}


/**
 * @title Standard ERC1155 token
 *
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 */
contract Tokens is ChargeableTransfer, DelegableTransfer, IERC1155Metadata
/*IERC1155,*/ {

    using SafeMath for uint256;
    using Address for address;



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
    function createTokens(
        address recipient,
        uint256[] memory ids,
        uint256 supply,
        string[] memory properties,
        uint256[] memory values
    )
        external onlyAuthorized(_msgSender(), Actions.CREATE_TOKEN, 0)
    {
        for (uint256 i = 0; i < ids.length; i++) {
            _createToken(recipient, ids[i], supply, properties, values);
            emit TransferSingle(_msgSender(), address(0), recipient, ids[i], supply);
        }
    }


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
            emit URI(uri(id), id);
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

    /**
        @dev Get the specified address' balance for token with specified ID.

        Attempting to query the zero account for a balance will result in a revert.

        @param account The address of the token holder
        @param id ID of the token
        @return The account's balance of the token type requested
     */
    function balanceOf(address account, uint256 id) public view  returns (uint256) {
        require(account != address(0), "invalid account");
        return _accounts[account].tokens[id].balance;
    }

    /**
        @dev Get the balance of multiple account/token pairs.

        If any of the query accounts is the zero account, this query will revert.

        @param accounts The addresses of the token holders
        @param ids IDs of the tokens
        @return Balances for each account and token id pair
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    )
        public
        view
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "invalid arguments");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            require(accounts[i] != address(0), "invalid account");
            batchBalances[i] = _accounts[accounts[i]].tokens[ids[i]].balance;
        }

        return batchBalances;
    }

    /**
     * @dev Sets or unsets the approval of a given operator.
     *
     * An operator is allowed to transfer all tokens of the sender on their behalf.
     *
     * Because an account already has operator privileges for itself, this function will revert
     * if the account attempts to set the approval status for itself.
     *
     * @param operator address to set the approval
     * @param approved representing the status of the approval to be set
     */
    function setApprovalForAll(address operator, bool approved) external  {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function setApprovalForAll2(address account, address operator, bool approved, bytes calldata data) external {
        if (account != _msgSender()) {
            require(data.length > 0 && // TODO: check exact length
                    _checkSetApprovalForAll2Signature(account, operator, approved, data),
                    "invalid signature");
            _accounts[account].nonce += 1;
        }
        _setApprovalForAll(account, operator, approved);
    }

    function _setApprovalForAll(address account, address operator, bool approved) internal {
        require(account != operator, "invalid operator");
        _permissions[operator][Actions.TRANSFER_TOKEN_FOR][uint256(uint160(account))] = approved;
        emit ApprovalForAll(account, operator, approved);
    }



    /**
        @notice Queries the approval status of an operator for a given account.
        @param account   The account of the Tokens
        @param operator  Address of authorized operator
        @return           True if the operator is approved, false if not
    */
    function isApprovedForAll(address account, address operator) public view  returns (bool) {
        if (_permissions[operator][Actions.TRANSFER_TOKEN_FOR][uint256(uint160(account))]) {
            return true;
        }
        if (_config.proxyRegistryAccount != address(0)) {
            if (address(ProxyRegistry(_config.proxyRegistryAccount).proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }

    /**
        @dev Transfers `value` amount of an `id` from the `from` address to the `to` address specified.
        Caller must be approved to manage the tokens being transferred out of the `from` account.
        If `to` is a smart contract, will call `onERC1155Received` on `to` and act appropriately.
        @param from Source address
        @param to Target address
        @param id ID of the token type
        @param value Transfer amount
        @param data Data forwarded to `onERC1155Received` if `to` is a contract receiver
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external payable
    {
        address operator = _msgSender();

        require(to != address(0), "invalid recipient");
        require(
            from == operator ||
            isApprovedForAll(from, operator) == true ||
            (data.length == 192 && _checkSafeTransferFromSignature(from, to, id, value, data)),
            "operator not approved"
        );
        // increase ETH balance
        _accounts[operator].externalBalances[0] = _accounts[operator].externalBalances[0].add(msg.value);

        _moveTokens(operator, from, to, id, value);

        emit TransferSingle(operator, from, to, id, value);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, value, data);
    }

    /**
        @dev Transfers `values` amount(s) of `ids` from the `from` address to the
        `to` address specified. Caller must be approved to manage the tokens being
        transferred out of the `from` account. If `to` is a smart contract, will
        call `onERC1155BatchReceived` on `to` and act appropriately.
        @param from Source address
        @param to Target address
        @param ids IDs of each token type
        @param values Transfer amounts per token type
        @param data Data forwarded to `onERC1155Received` if `to` is a contract receiver
    */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
        external payable
    {
        address operator = _msgSender();

        require(ids.length == values.length, "invalid arguments");
        require(to != address(0), "invalid account");
        require(
            from == operator || isApprovedForAll(from, operator) == true,
            "operator not approved"
        );
        // increase ETH balance
        _accounts[operator].externalBalances[0] = _accounts[operator].externalBalances[0].add(msg.value);

        _moveTokensBatch(operator, from, to, ids, values);

        emit TransferBatch(operator, from, to, ids, values);

        _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, values, data);
    }

    /**
     * @param id Token ID
     * @return URI string
     */
    function uri(uint256 id) public view override returns (string memory) {
        return StringUtils._strConcat(_config.baseURI, StringUtils._toHexString(id));
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

        _permissions[recipient][Actions.UPDATE_TOKEN][id] = true;
        _permissions[recipient][Actions.HOLD_PRIVATE_TOKEN][id] = true;
        _addToBalance(recipient, id, supply);
    }


    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    )
        internal
    {
        if(to.isContract()) {
            require(
                IERC1155Receiver(to).onERC1155Received(operator, from, id, value, data) ==
                    IERC1155Receiver(to).onERC1155Received.selector,
                "unknown value from receiver"
            );
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    )
        internal
    {
        if(to.isContract()) {
            require(
                IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, values, data) ==
                    IERC1155Receiver(to).onERC1155BatchReceived.selector,
                "unknown value from receiver"
            );
        }
    }
}
