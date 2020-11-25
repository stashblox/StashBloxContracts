// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../Core/Core.sol";
import "../../utils/SafeMath.sol";

contract OwnableDelegateProxy { } // solhint-disable-line no-empty-blocks

interface ProxyRegistry {
    function proxies(address account) view external returns (OwnableDelegateProxy);
}

contract DelegableTransfer is Core {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @dev Sets or unsets the approval of a given operator.
        @param account    Address to set the approval
        @param operator   Address of the operator
        @param approved   Representing the status of the approval to be set
        @param data       Optional. This function can be called by a third party by providing
                          the payload signed by `account`. `data` must respect the following format:<br />
                          ```
                          data = web3.eth.abi.encodeParameters(
                              ['uint256', 'uint256', 'uint256', 'uint8', 'bytes32', 'bytes32'],
                              [format, nonce, expiry, sign.v, sign.r, sign.s]
                          );
                          ```
                          <br />
                          `format` indicates how the digest is signed: <br />
                          `0` means `sign = ecsign(digest)`<br />
                          `1` means `sign = ecsign(keccak256("\x19Ethereum Signed Message:\n32" + digest))`<br />
                          `2` means `sign = ecsign(sha256("\x19Ethereum Signed Message:\n32" + digest))`<br />
                          `sign.v`, `sign.r` and `sign.s` are the signature of the digest.<br />
                          The digest and the nonce can be craft or can be provided by the function `setApprovalForAllDigest`.

    */
    function setApprovalForAll(
        address account,
        address operator,
        bool approved,
        bytes calldata data
    )
        external
    {
        if (account != _msgSender()) {
            require(data.length > 0 && // TODO: check exact length
                    _checkSetApprovalForAllSignature(account, operator, approved, data),
                    "invalid signature");
            _accounts[account].nonce += 1;
        }
        _setApprovalForAll(account, operator, approved);
    }

    /**
        @dev Function to get the digest and the nonce for the given arguments. The digest and the nonce
        need to be signed by `account`, then the signature can be used to call the `setApprovalForAll`
        on behalf `account`. See `setApprovalForAll` documentation.
        @param account    The `account` that will sign the transaction
        @param operator   The operator who can transfer tokens on behalf `account`
        @param approved   `True` to authorize the operator, `False` to revoke the authorization.
        @param expiry     When the signed digest will expire
        @return nonce and digest usable once
    */
    function setApprovalForAllDigest(
        address account,
        address operator,
        bool approved,
        uint256 expiry
    )
        external view returns (uint256, bytes32)
    {
        return (
            _accounts[account].nonce + 1,
            _setApprovalForAllDigest(account, operator, approved, 0, _accounts[account].nonce + 1, expiry)
        );
    }

    /**
        @dev Function to get the digest and the nonce for the given arguments. The digest and the nonce
        need to be signed by `account`, then the signature can be used to call the `safeTransferFrom`
        on behalf `from`. See `safeTransferFrom` documentation.
        @param from   Source address
        @param to     Target address
        @param id     ID of the token type
        @param value  Transfer amount
        @param expiry When the signed digest will expire
        @return nonce and digest usable once
    */
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
            _safeTransferFromDigest(from, to, id, value, 0, _accounts[from].nonce + 1, expiry)
        );
    }

    /**
        @dev Function to authorize `operator` to spent `amount` on behalf `account`
        @param account    The source address
        @param operator   Address to set the allowance
        @param id         Token ID
        @param amount     Maximun amount that `operator` can spent
    */
    function setAllowance(
        address account,
        address operator,
        uint256 id,
        uint256 amount
    )
        external onlyAuthorized(_msgSender(), Actions.SET_ALLOWANCE, id)
    {
        require(amount == 0 || _erc20Allowance[operator][account][id] == 0, "allowance not zero");
        _erc20Allowance[operator][account][id] = amount;
    }

    /**
        @dev Function to get the amount that `operator` can spent  on behalf `account`
        @param account    The source address
        @param operator   Address with the allowance
        @param id         Token ID
        @return Maximun amount that `operator` can spent
    */
    function allowance(
        address account,
        address operator,
        uint256 id
    )
        public view  returns (uint256)
    {
        return _erc20Allowance[operator][account][id];
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

    function _checkSetApprovalForAllSignature(
          address account,
          address operator,
          bool approved,
          bytes calldata data
    )
        internal view returns (bool)
    {
        (
            uint256 format,
            uint256 nonce,
            uint256 expiry,
            uint8 v,
            bytes32 r,
            bytes32 s
        ) = abi.decode(data, (uint256, uint256, uint256, uint8, bytes32, bytes32));
        bytes32 digest = _setApprovalForAllDigest(account, operator, approved, format, nonce, expiry);

        return _requireValidSignature(account, digest, nonce, expiry, v, r, s);
    }

    function _checkSafeTransferFromSignature(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        internal view returns (bool)
    {
        (
            uint256 format,
            uint256 nonce,
            uint256 expiry,
            uint8 v,
            bytes32 r,
            bytes32 s
        ) = abi.decode(data, (uint256, uint256, uint256, uint8, bytes32, bytes32));
        bytes32 digest = _safeTransferFromDigest(from, to, id, value, format, nonce, expiry);

        return _requireValidSignature(from, digest, nonce, expiry, v, r, s);
    }

    function _setApprovalForAllDigest(
        address account,
        address operator,
        bool approved,
        uint256 format,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 functionHash = keccak256(abi.encode(
            _config.APPROVAL_TYPEHASH,
            account, operator, approved
        ));
        return _callFunctionDigest(functionHash, format, nonce, expiry);
    }

    function _safeTransferFromDigest(
        address from,
        address to,
        uint256 id,
        uint256 value,
        uint256 format,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 functionHash = keccak256(abi.encode(
            _config.TRANSFER_TYPEHASH,
            from, to, id, value
        ));
        return _callFunctionDigest(functionHash, format, nonce, expiry);
    }

}
