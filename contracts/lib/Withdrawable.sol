// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import './GSNCapable.sol';

contract Withdrawable is GSNCapable {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to withdraw ETH from the contract. TODO: Add permission ??
     * @param to recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address to, uint256 amount) external {
        require(_accounts[to].ETHBalance >= amount, "Insufficient balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdrawal failed");
        _accounts[to].ETHBalance -= amount;
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param to recipent address
     */
    function deposit(address to) external payable {
        _accounts[to].ETHBalance = _accounts[to].ETHBalance.add(msg.value);
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _accounts[_msgSender()].ETHBalance = _accounts[_msgSender()].ETHBalance.add(msg.value);
    }


}
