// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../../utils/SafeMath.sol";

import "./ERC1155.sol";
import "./Mintable.sol";
import "./Updatable.sol";
import "./Escrowable.sol";

contract Tokens is ERC1155, Mintable, Updatable, Escrowable {}
