// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../Core/Core.sol";

contract OwnableDelegateProxy { } // solhint-disable-line no-empty-blocks

interface ProxyRegistry {
    function proxies(address account) view external returns (OwnableDelegateProxy);
}

contract DelegableTransfer is Core {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    function setApprovalForAll2(address account, address operator, bool approved, bytes calldata data) external {
        if (account != _msgSender()) {
            require(data.length > 0 && // TODO: check exact length
                    _checkSetApprovalForAll2Signature(account, operator, approved, data),
                    "invalid signature");
            _accounts[account].nonce += 1;
        }
        _setApprovalForAll(account, operator, approved);
    }

    function setApprovalForAll2Digest(
        address account,
        address operator,
        bool approved,
        uint256 expiry
    )
        external view returns (uint256, bytes32)
    {
        return (
            _accounts[account].nonce + 1,
            _setApprovalForAll2Digest(account, operator, approved, false, _accounts[account].nonce + 1, expiry)
        );
    }

    function safeTransferFromDigest(
        address from,
        address to,
        uint256 id,
        uint256 value,
        uint256 expiry
    )
        external view returns (uint256, bytes32)
    {
        return (
            _accounts[from].nonce + 1,
            _safeTransferFromDigest(from, to, id, value, false, _accounts[from].nonce + 1, expiry)
        );
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _setApprovalForAll(address account, address operator, bool approved) internal {
        require(account != operator, "invalid operator");
        _permissions[operator][Actions.TRANSFER_TOKEN_FOR][uint256(uint160(account))] = approved;
        emit ApprovalForAll(account, operator, approved);
    }


    function _isApprovedForAll(address account, address operator) internal view  returns (bool) {
        if (_permissions[operator][Actions.TRANSFER_TOKEN_FOR][uint256(uint160(account))]) {
            return true;
        }
        if (_config.proxyRegistryAccount != address(0)) {
            if (address(ProxyRegistry(_config.proxyRegistryAccount).proxies(account)) == operator) {
                return true;
            }
        }
        return false;
    }



    function _checkSetApprovalForAll2Signature(
          address account,
          address operator,
          bool approved,
          bytes calldata data
    )
        internal returns (bool)
    {
        (
            bool prefixed,
            uint256 nonce,
            uint256 expiry,
            uint8 v,
            bytes32 r,
            bytes32 s
        ) = abi.decode(data, (bool, uint256, uint256, uint8, bytes32, bytes32));
        bytes32 digest = _setApprovalForAll2Digest(account, operator, approved, prefixed, nonce, expiry);

        return _requireValidSignature(account, digest, nonce, expiry, v, r, s);
    }

    function _checkSafeTransferFromSignature(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        internal returns (bool)
    {
        (
            bool prefixed,
            uint256 nonce,
            uint256 expiry,
            uint8 v,
            bytes32 r,
            bytes32 s
        ) = abi.decode(data, (bool, uint256, uint256, uint8, bytes32, bytes32));
        bytes32 digest = _safeTransferFromDigest(from, to, id, value, prefixed, nonce, expiry);

        return _requireValidSignature(from, digest, nonce, expiry, v, r, s);
    }


    function _setApprovalForAll2Digest(
        address account,
        address operator,
        bool approved,
        bool prefixed,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 functionHash = keccak256(abi.encode(
            _config.APPROVAL_TYPEHASH,
            account, operator, approved
        ));
        return _callFunctionDigest(functionHash, prefixed, nonce, expiry);
    }

    function _safeTransferFromDigest(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bool prefixed,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 functionHash = keccak256(abi.encode(
            _config.TRANSFER_TYPEHASH,
            from, to, id, value
        ));
        return _callFunctionDigest(functionHash, prefixed, nonce, expiry);
    }

    

}
