// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "./Data.sol";
import "./GSNCapable.sol";
import "./Authorizable.sol";

contract Core is Data, GSNCapable, Authorizable { } // solhint-disable-line no-empty-blocks
