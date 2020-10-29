// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "./Ownable.sol";

contract OwnableDelegateProxy { } // solhint-disable-line no-empty-blocks

interface ProxyRegistry {
  function proxies(address account) view external returns (OwnableDelegateProxy);
}

contract Proxyable is Ownable {

    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _isWhitelistedOperator(address account, address operator) internal view returns (bool) {
        if (_config.proxyRegistryAccount != address(0)) {
            if (address(ProxyRegistry(_config.proxyRegistryAccount).proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }

    function _isApprovedForAll(address account, address operator) internal view returns (bool) {
        return _isWhitelistedOperator(account, operator) || _accounts[account].operatorApprovals[operator];
    }
}
