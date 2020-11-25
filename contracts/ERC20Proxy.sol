// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "./interfaces/IERC20.sol";
import "./StashBlox.sol";
import "./lib/Core/Core.sol";

contract ERC20Proxy is IERC20, Core {

    address payable _master;
    uint256 _id;

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function init(address payable master) external {
        if (_master == address(0)) {
            _master = master;
            _id = uint256(uint160(address(this)));
        }
    }


    function totalSupply() public view override returns (uint256) {
        return StashBlox(_master).getTokenProperty(_id, "supply");
    }

    function balanceOf(address account) external view override returns (uint256) {
        return StashBlox(_master).balanceOf(account, _id);
    }

    function allowance(address account, address operator) external view override returns (uint256) {
        return StashBlox(_master).allowance(account, operator, _id);
    }

    function transfer(address to, uint256 value) external override returns (bool) {
        address from = _msgSender();
        StashBlox(_master).safeTransferFrom(from, to, _id, value, abi.encodePacked(from));
        Transfer(_msgSender(), to, value);
        return true;
    }

    function approve(address operator, uint256 value) external override returns (bool) {
        StashBlox(_master).setAllowance(_msgSender(), operator, _id, value);
        Approval(_msgSender(), operator, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external override returns (bool) {
        address operator = _msgSender();
        StashBlox(_master).safeTransferFrom(from, to, _id, value, abi.encodePacked(operator));
        Transfer(from, to, value);
        return true;
    }

}
