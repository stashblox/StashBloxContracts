// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import './interfaces/IERC1155Metadata.sol';
import "./utils/SafeMath.sol";
import './utils/StringUtils.sol';
import './lib/Callable.sol';

contract StashBlox is Callable, IERC1155Metadata, StringUtils {

    using SafeMath for uint256;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        _config.callbackAutoExecuteMaxAddresses = 50;
        _config.baseURI = "http://stashblox.com/tokens/";
        _transferOwnership(msg.sender);
    }

    /**
     * @dev Function to withdraw ETH from the contract.
     * @param to recipent address
     * @param amount amount to withdraw
     */
    function withdraw(address to, uint256 amount) external onlyOwner {
        require(_users[to].ETHBalance >= amount, "Insufficient balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdrawal failed");
        _users[to].ETHBalance -= amount;
    }

    /**
     * @dev Function to make an ETH deposit that can be used to pay token transfer .
     * @param to recipent address
     */
    function deposit(address to) external payable {
        _users[to].ETHBalance = _users[to].ETHBalance.add(msg.value);
    }

    /**
     * @dev Receive Ether Function:this is the function that is executed on plain Ether transfers (e.g. via .send() or .transfer()).
     */
    receive() external payable {
        _users[msg.sender].ETHBalance = _users[msg.sender].ETHBalance.add(msg.value);
    }

    /**
     * @param id Token ID
     * @return URI string
     */
    function uri(uint256 id) external view override returns (string memory) {
        return _strConcat(_config.baseURI, _toHexString(id));
    }


}
