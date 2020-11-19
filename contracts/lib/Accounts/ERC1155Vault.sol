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


    function onERC1155Received(address operator,
                               address from,
                               uint256 id,
                               uint256 value,
                               bytes calldata data)
    external override onlyUnlockedAccount(from) returns(bytes4) {
        require(!_accounts[from].isLocked, "account locked");

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

            IERC1155(address(this)).safeTransferFrom(from_, to_, id_, value_, data_); // TODO test success ?
        }
        return 0xf23a6e61; //RECEIVER_SINGLE_MAGIC_VALUE
    }


    function onERC1155BatchReceived(address operator,
                                    address from,
                                    uint256[] calldata ids,
                                    uint256[] calldata values,
                                    bytes calldata data)
    external override onlyUnlockedAccount(from) returns(bytes4) {
        // here msg.sender is the ERC1155 contract
        address sender = _msgSender();
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 currencyId = _currencyIDs[sender][ids[i]];
            require(currencyId > 0, "unknown erc1155");
            _accounts[from].externalBalances[currencyId] = _accounts[from].externalBalances[currencyId].add(values[i]);
        }
        return 0xbc197c81; //RECEIVER_BATCH_MAGIC_VALUE
    }

    function withdrawERC1155(address erc1155Address, uint256 tokenId, address account, uint256 amount) external onlyUnlockedAccount(account) {
        uint256 currencyId = _currencyIDs[erc1155Address][tokenId];
        require(currencyId > 0, "unknown erc1155");

        IERC1155(erc1155Address).safeTransferFrom(
            address(this),
            account,
            tokenId,
            amount,
            ''
        ); // TODO test success ?
        _accounts[account].externalBalances[currencyId] = _accounts[account].externalBalances[currencyId].sub(amount, "Insufficient balance");
    }

}
