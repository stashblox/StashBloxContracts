// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "../../utils/SafeMath.sol";
import "../../interfaces/IERC1155Receiver.sol";
import "../../interfaces/IERC1155.sol";
import "./Lockable.sol";

contract ETHVault is Lockable {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to withdraw ETH from the contract. TODO: Add permission ??
     * @param account recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address account, uint256 amount) external onlyUnlockedAccount(account) {
        _accounts[account].externalBalances[0] = _accounts[account].externalBalances[0].sub(amount, "Insufficient balance");
        (bool success, ) = account.call{value: amount}(""); // solhint-disable-line avoid-low-level-calls
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param account recipent address
     */
    function deposit(address account) external payable onlyUnlockedAccount(account) {
        _accounts[account].externalBalances[0] = _accounts[account].externalBalances[0].add(msg.value);
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable onlyUnlockedAccount(_msgSender()) {
        _accounts[_msgSender()].externalBalances[0] = _accounts[_msgSender()].externalBalances[0].add(msg.value);
    }
}
