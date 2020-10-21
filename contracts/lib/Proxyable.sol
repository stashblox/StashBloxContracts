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
     * @param proxyAddresses List of addresses
     */
    function setProxyRegistryAddress(address[10] memory proxyAddresses) external onlyOwner {
        _config.proxyRegistryAddresses = proxyAddresses;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        for (uint256 i = 0; i < _config.proxyRegistryAddresses.length; ++i) {
            if (_config.proxyRegistryAddresses[i] != address(0)) {
                ProxyRegistry proxyRegistry = ProxyRegistry(_config.proxyRegistryAddresses[i]);
                if (address(proxyRegistry.proxies(account)) == operator) {
                    return true;
                }
            }
        }
        return false;
    }

    function _isApprovedForAll(address account, address operator) internal view returns (bool) {
        return _isWhitelistedOperator(account, operator) || _users[account].operatorApprovals[operator];
    }
}
