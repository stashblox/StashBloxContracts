pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import './lib/ERC1155/ERC1155Mintable.sol';

contract StashBlox is ERC1155Mintable {

    address callbackContractAddress;

    constructor(address addr) public {
        callbackContractAddress = addr;
        _transferOwnership(msg.sender);
    }

    function proposeCallback(uint256 id, uint256 price) external payable {
        (bool success, ) = callbackContractAddress.delegatecall(abi.encodeWithSignature("proposeCallback(uint256,uint256)", id, price));
        require(success, "StashBlox: proposeCallback failed");
    }

    function refuseCallback(uint256 id, address proposer) external onlyOwner {
        (bool success, ) = callbackContractAddress.delegatecall(abi.encodeWithSignature("refuseCallback(uint256,address)", id, proposer));
        require(success, "StashBlox: refuseCallback failed");
    }

    function acceptCallback(uint256 id, address proposer) external onlyOwner {
        (bool success, ) = callbackContractAddress.delegatecall(abi.encodeWithSignature("acceptCallback(uint256,address)", id, proposer));
        require(success, "StashBlox: acceptCallback failed");
    }
}
