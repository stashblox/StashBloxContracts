// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import "./GSNCapable.sol";

contract Withdrawable is GSNCapable {

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
        require(_accounts[account].ethBalance >= amount, "Insufficient balance");
        (bool success, ) = account.call{value: amount}(""); // solhint-disable-line avoid-low-level-calls
        require(success, "Withdrawal failed");
        _accounts[account].ethBalance -= amount;
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


}
