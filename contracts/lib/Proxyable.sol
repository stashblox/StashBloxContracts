// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "./Ownable.sol";

contract OwnableDelegateProxy { }

contract ProxyRegistry{
  mapping(address => OwnableDelegateProxy) public proxies;
}

contract Proxyable is Ownable {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to update the operator whitelist
     * @param proxyAddress Proxy address
     */
    function setProxyRegistryAddress(address proxyAddress) external onlyOwner {
        _config.proxyRegistryAddress = proxyAddress;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        if (_config.proxyRegistryAddress != address(0)) {
            ProxyRegistry proxyRegistry = ProxyRegistry(_config.proxyRegistryAddress);
            if (address(proxyRegistry.proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }

    function _isApprovedForAll(address account, address operator) internal view returns (bool) {
        return _isWhitelistedOperator(account, operator) || _users[account].operatorApprovals[operator];
    }
}
