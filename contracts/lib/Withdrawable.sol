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

    function registerCurreny(uint256 currencyId, address contractAddress, uint256 tokenId) external  { // TODO: only owner
        require(currencyId !=0 &&
                contractAddress != address(0) &&
                _currencies[currencyId].contractAddress == address(0),
                "invalid arguments");

        _currencies[currencyId] = Currency(
            tokenId == 0 ? 1 : 2, // erc20 if no tokenId, else erc1155
            tokenId,
            contractAddress
        );
    }

    function getExternalBalance(address account, uint256 currencyId) public view returns (uint256) {
        return _accounts[account].externalBalances[currencyId];
    }


    /**
     * @dev Function to withdraw ETH from the contract. TODO: Add permission ??
     * @param account recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address account, uint256 amount) external {
        _accounts[account].externalBalances[0] = _accounts[account].externalBalances[0].sub(amount, "Insufficient balance");
        (bool success, ) = account.call{value: amount}(""); // solhint-disable-line avoid-low-level-calls
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param account recipent address
     */
    function deposit(address account) external payable {
        _accounts[account].externalBalances[0] = _accounts[account].externalBalances[0].add(msg.value);
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _accounts[_msgSender()].externalBalances[0] = _accounts[_msgSender()].externalBalances[0].add(msg.value);
    }

    function onERC1155Received(address operator,
                               address from,
                               uint256 id,
                               uint256 value,
                               bytes calldata data)
    external override returns(bytes4) {
        // here msg.sender is the ERC1155 contract
        uint256 currencyId = _currencyIDs[_msgSender()][id];
        require(currencyId > 0, "unknown erc1155");

        _accounts[from].externalBalances[currencyId] = _accounts[from].externalBalances[currencyId].add(value);
        return _config.RECEIVER_SINGLE_MAGIC_VALUE;
    }


    function onERC1155BatchReceived(address operator,
                                    address from,
                                    uint256[] calldata ids,
                                    uint256[] calldata values,
                                    bytes calldata data)
    external override returns(bytes4) {
        // here msg.sender is the ERC1155 contract
        address sender = _msgSender();
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 currencyId = _currencyIDs[sender][ids[i]];
            require(currencyId > 0, "unknown erc1155");
            _accounts[from].externalBalances[currencyId] = _accounts[from].externalBalances[currencyId].add(values[i]);
        }
        return _config.RECEIVER_BATCH_MAGIC_VALUE;
    }

    function withdrawERC1155(address erc1155Address, uint256 tokenId, address account, uint256 amount) external {
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
