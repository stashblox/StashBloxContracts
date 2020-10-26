// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "./OwnableDelegateProxyMock.sol";

contract ProxyRegistryMock{

    mapping(address => OwnableDelegateProxyMock) public proxies;

    constructor(address account, address delegateProxyAddress) {
        proxies[account] = OwnableDelegateProxyMock(delegateProxyAddress);
    }
}
