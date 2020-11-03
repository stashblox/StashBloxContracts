// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "./OwnableDelegateProxyMock.sol";

contract ProxyRegistryMock{

    mapping(address => OwnableDelegateProxyMock) public proxies;

    constructor(address account, address delegateProxyAddress) {
        proxies[account] = OwnableDelegateProxyMock(delegateProxyAddress);
    }
}
