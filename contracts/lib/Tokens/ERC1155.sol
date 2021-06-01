// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

// import "../../interfaces/IERC1155.sol";
import "../../interfaces/IERC1155Metadata.sol";
import "../../interfaces/IERC1155Receiver.sol";

import "../../utils/SafeMath.sol";
import "../../utils/Address.sol";
import "../../utils/StringUtils.sol";

import "./ChargeableTransfer.sol";
import "./DelegableTransfer.sol";


/**
 * @title Standard ERC1155 token
 *
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 */
contract ERC1155 is ChargeableTransfer, DelegableTransfer, IERC1155Metadata
/*IERC1155,*/ {

    using SafeMath for uint256;
    using Address for address;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @dev Get the specified address' balance for token with specified ID.
        @param account  The address of the token holder
        @param id       ID of the token
        @return The account's balance of the token type requested
    */
    function balanceOf(address account, uint256 id) public view  returns (uint256) {
        require(account != address(0), "invalid account");
        return _accounts[account].tokens[id].balance;
    }

    /**
        @dev Get the balance of multiple account/token pairs.
        @param accounts   The addresses of the token holders
        @param ids        IDs of the tokens
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
       @dev Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.
       @param operator  address to set the approval
       @param approved  representing the status of the approval to be set
     */
    function setApprovalForAll(address operator, bool approved) external  {
        _setApprovalForAll(_msgSender(), operator, approved);
    }


    /**
        @notice Queries the approval status of an operator for a given account.
        @param account    The account of the Tokens
        @param operator   Address of authorized operator
        @return           True if the operator is approved, false if not
    */
    function isApprovedForAll(address account, address operator) public view  returns (bool) {
        return _isApprovedForAll(account, operator);
    }

    /**
        @dev Transfers `value` amount of an `id` from the `from` address to the `to` address specified.
        Caller must be approved to manage the tokens being transferred out of the `from` account.
        If `to` is a smart contract, will call `onERC1155Received` on `to` and act appropriately.
        @param from   Source address
        @param to     Target address
        @param id     ID of the token type
        @param value  Transfer amount
        @param data   Optional. This function can be called by a third party by providing
                      the payload signed by `from`. `data` must respect the following format:<br />
                      ```
                      data = web3.eth.abi.encodeParameters(
                          ['uint256', 'uint256', 'uint256', 'uint8', 'bytes32', 'bytes32'],
                          [format, nonce, expiry, sign.v, sign.r, sign.s]
                      );
                      ```
                      <br />
                      `format` indicates how the digest is signed: <br />
                      `0` means `sign = ecsign(digest)`<br />
                      `1` means `sign = ecsign(keccak256("\x19Ethereum Signed Message:\n32" + digest))`<br />
                      `2` means `sign = ecsign(sha256("\x19Ethereum Signed Message:\n32" + digest))`<br />
                      `sign.v`, `sign.r` and `sign.s` are the signature of the digest.<br />
                      The digest and the nonce can be craft or can be provided by the function `safeTransferFromDigest`.
                      Data is forwarded to `onERC1155Received` if `to` is a contract receiver
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

        bool approved = from == operator ||
                        _isApprovedForAll(from, operator) == true ||
                        (data.length == 192 && _checkSafeTransferFromSignature(from, to, id, value, data));
   
        require(to != address(0) && approved, "invalid operator or 0 address");

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
        @param from     Source address
        @param to       Target address
        @param ids      IDs of each token type
        @param values   Transfer amounts per token type
        @param data     Data forwarded to `onERC1155Received` if `to` is a contract receiver
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
       @notice Function to get token's metadata URL
       @param id  Token ID
       @return URI string
    */
    function uri(uint256 id) public view override returns (string memory) {
        return StringUtils._strConcat(_config.baseURI, StringUtils._toHexString(id));
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


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
