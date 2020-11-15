// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "./Data.sol";

contract GasLess is Data {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


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

        _requireValidSignature(account, digest, nonce, expiry, v, r, s);
        return true;
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

        _requireValidSignature(from, digest, nonce, expiry, v, r, s);
        return true;
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
            _eip712Config.APPROVAL_TYPEHASH,
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
            _eip712Config.TRANSFER_TYPEHASH,
            from, to, id, value
        ));
        return _callFunctionDigest(functionHash, prefixed, nonce, expiry);
    }

    function _callFunctionDigest(
        bytes32 functionHash,
        bool prefixed,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 digest = keccak256(abi.encodePacked(
            "\\x19\\x01",
            _eip712Config.DOMAIN_SEPARATOR,
            functionHash,
            keccak256(abi.encode(nonce, expiry))
        ));
        return prefixed ? _prefixed(digest) : digest;
    }


    function _prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }


    function _requireValidSignature(
        address account,
        bytes32 digest,
        uint256 nonce,
        uint256 expiry,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        require(account == ecrecover(digest, v, r, s) &&
                expiry == 0 || block.timestamp <= expiry &&
                nonce ==  _accounts[account].nonce + 1, "invalid signature");
    }


    function _initGasLessTransactions(bytes32 salt) internal {
        uint256 chainId;
        assembly { chainId := chainid() }

        _eip712Config.SALT = salt;
        _eip712Config.chainId = chainId;
        _eip712Config.contractAddress = address(this);

        _eip712Config.DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"),
            keccak256(bytes("StashBloxContract")),
            keccak256(bytes("1.0.0")),
            chainId,
            address(this),
            salt
        ));
        _eip712Config.APPROVAL_TYPEHASH = keccak256("SetApprovalForAll(address account,address operator,bool approved)");
        _eip712Config.TRANSFER_TYPEHASH = keccak256("SafeTransferFrom(address from,address to,uint256 id,uint256 value)");
    }

}
