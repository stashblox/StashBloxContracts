// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "../../utils/SafeMath.sol";
import "../../interfaces/IERC1155Receiver.sol";
import "../../interfaces/IERC1155.sol";
import "./Lockable.sol";

contract ERC1155Vault is Lockable, IERC1155Receiver {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @notice Handle the receipt of a single ERC1155 token type, increase the recipient's balance hold by the contract.
        @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated
        This function MAY throw to revert and reject the transfer
        Return of other amount than the magic value MUST result in the transaction being reverted
        Note: The token contract address is always the message sender
        @param operator   The address which called the `safeTransferFrom` function
        @param from       The address which previously owned the token
        @param id         The id of the token being transferred
        @param value      The amount of tokens being transferred
        @param data       Additional data with no specified format. If the length of the data is 356, this function
                          will use it to call a safeTransferFrom. This functionnality makes one able to pay erc1155 transfer fees
                          with only one transaction.
        @return           `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
    */
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external override onlyUnlockedAccount(from) returns(bytes4)
    {
        // here msg.sender is the ERC1155 contract
        uint256 currencyId = _currencyIDs[_msgSender()][id];
        require(currencyId > 0, "unknown erc1155");

        _accounts[from].externalBalances[currencyId] = _accounts[from].externalBalances[currencyId].add(value);

        if (data.length == 356) {
            (
                address from_,
                address to_,
                uint256 id_,
                uint256 value_,
                bytes memory data_
            ) = abi.decode(data, (address, address, uint256, uint256, bytes));
            IERC1155(address(this)).safeTransferFrom(from_, to_, id_, value_, data_);
        }
        return 0xf23a6e61; //RECEIVER_SINGLE_MAGIC_VALUE
    }

    /**
        @notice Handle the receipt of multiple ERC1155 token types
        @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeBatchTransferFrom` after the balances have been updated
        This function MAY throw to revert and reject the transfer
        Return of other amount than the magic value WILL result in the transaction being reverted
        Note: The token contract address is always the message sender
        @param operator   The address which called the `safeBatchTransferFrom` function
        @param from       The address which previously owned the token
        @param ids        An array containing ids of each token being transferred
        @param values     An array containing amounts of each token being transferred
        @param data       Additional data with no specified format
        @return           `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
    */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
        external override onlyUnlockedAccount(from) returns(bytes4)
    {
        // here msg.sender is the ERC1155 contract
        address sender = _msgSender();
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 currencyId = _currencyIDs[sender][ids[i]];
            require(currencyId > 0, "unknown erc1155");
            _accounts[from].externalBalances[currencyId] = _accounts[from].externalBalances[currencyId].add(values[i]);
        }
        return 0xbc197c81; //RECEIVER_BATCH_MAGIC_VALUE
    }

    /**
        @notice Use to withdraw ERC1155 tokens hold by the contract.
        @param currencyId   Id of the currency to withdraw
        @param account      Address of the holder
        @param amount       The amount to withdraw
    */
    function withdrawERC1155(
        uint256 currencyId,
        address account,
        uint256 amount
    )
        external onlyUnlockedAccount(account)
    {
        Currency memory currency = _currencies[currencyId];
        require(currency.currencyType == 2 &&
                (account == _msgSender() || _config.owner == _msgSender()), "invalid arguments");

        _accounts[account].externalBalances[currencyId] = _accounts[account].externalBalances[currencyId].sub(amount, "Insufficient balance");
        IERC1155(currency.contractAddress).safeTransferFrom(
            address(this),
            account,
            currency.id,
            amount,
            ''
        );
    }

}
