// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "../utils/SafeMath.sol";
import "../interfaces/IERC1155Receiver.sol";
import "../interfaces/IERC1155.sol";
import "./GSNCapable.sol";

contract Withdrawable is GSNCapable, IERC1155Receiver {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to withdraw ETH from the contract. TODO: Add permission ??
     * @param account recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address account, uint256 amount) external {
        _accounts[account].ethBalance = _accounts[account].ethBalance.sub(amount, "Insufficient balance");
        (bool success, ) = account.call{value: amount}(""); // solhint-disable-line avoid-low-level-calls
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param account recipent address
     */
    function deposit(address account) external payable {
        _accounts[account].ethBalance = _accounts[account].ethBalance.add(msg.value);
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _accounts[_msgSender()].ethBalance = _accounts[_msgSender()].ethBalance.add(msg.value);
    }

    function onERC1155Received(address operator,
                               address from,
                               uint256 id,
                               uint256 value,
                               bytes calldata data)
    external override returns(bytes4) {
        // here msg.sender is the ERC1155 contract
        address erc1155Address = _msgSender();
        _externalBalances[from][erc1155Address][id] = _externalBalances[from][erc1155Address][id].add(value);
        return RECEIVER_SINGLE_MAGIC_VALUE;
    }


    function onERC1155BatchReceived(address operator,
                                    address from,
                                    uint256[] calldata ids,
                                    uint256[] calldata values,
                                    bytes calldata data)
    external override returns(bytes4) {
        // here msg.sender is the ERC1155 contract
        address erc1155Address = _msgSender();
        for (uint256 i = 0; i < ids.length; i++) {
          _externalBalances[from][erc1155Address][ids[i]] = _externalBalances[from][erc1155Address][ids[i]].add(values[i]);
        }
        return RECEIVER_BATCH_MAGIC_VALUE;
    }

    function withdrawERC1155(address erc1155Address, uint256 tokenId, address account, uint256 amount) external {
        IERC1155(erc1155Address).safeTransferFrom(
            address(this),
            account,
            tokenId,
            amount,
            ''
        );
        _externalBalances[account][erc1155Address][tokenId] = _externalBalances[account][erc1155Address][tokenId].sub(amount, "Insufficient balance");
    }

}
