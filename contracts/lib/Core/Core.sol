// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "./Data.sol";
import "./GSNCapable.sol";
import "./Authorizable.sol";
import "./CloneFactory.sol";

contract Core is Data, GSNCapable, Authorizable, CloneFactory { } // solhint-disable-line no-empty-blocks
