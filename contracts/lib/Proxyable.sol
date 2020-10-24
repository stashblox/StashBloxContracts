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
     * @param account Proxy address
     */
    function setProxyRegistryAccount(address account) external onlyOwner {
        _config.proxyRegistryAccount = account;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        if (_config.proxyRegistryAccount != address(0)) {
            ProxyRegistry proxyRegistry = ProxyRegistry(_config.proxyRegistryAccount);
            if (address(proxyRegistry.proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }

    function _isApprovedForAll(address account, address operator) internal view returns (bool) {
        return _isWhitelistedOperator(account, operator) || _accounts[account].operatorApprovals[operator];
    }
}
