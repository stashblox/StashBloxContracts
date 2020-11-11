// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "./MultiToken.sol";

contract GasLess is MultiToken {

    function freeSetApprovalForAll(
        address operator,
        address account,
        uint256 nonce,
        uint256 expiry,
        bool approved,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
        external
    {
        bytes32 digest = _freeSetApprovalForAllDigest(operator, account, nonce, expiry, approved);
        uint256 expectedNonce =  _accounts[account].nonce + 1;

        require(account == ecrecover(digest, v, r, s), "invalid signature0");
        require(expiry == 0 || block.timestamp <= expiry, "invalid signature1");
        require(nonce == expectedNonce, "invalid signature2");

        _accounts[account].nonce += 1;
        _accounts[account].approvedOperator[operator] = approved;
        emit ApprovalForAll(account, operator, approved);
    }


    function _checkFreeTransferSig(bytes calldata data) internal view returns (bool) {
        (
            address from,
            address to,
            uint256 id,
            uint256 value,
            uint256 nonce,
            uint8 v,
            bytes32 r,
            bytes32 s
        )  = abi.decode(data, (address, address, uint256, uint256, uint256, uint8, bytes32, bytes32));

        bytes32 digest = _safeTransferFromDigest(from, to, id, value, nonce);
        uint256 expectedNonce =  _accounts[from].nonce + 1;

        require(from == ecrecover(digest, v, r, s), "invalid signature0");
        require(nonce == expectedNonce, "invalid signature1");

        return true;
    }


    function freeSetApprovalForAllNonceAndDigest(
        address operator,
        address account,
        uint256 expiry,
        bool approved
    )
        external view returns (uint256, bytes32)
    {
        return (_accounts[account].nonce + 1,
               _freeSetApprovalForAllDigest(operator, account, _accounts[account].nonce + 1, expiry, approved));
    }

    function safeTransferFromNonceAndDigest(
        address from,
        address to,
        uint256 id,
        uint256 value
    )
        external view returns (uint256, bytes32)
    {
        return (_accounts[from].nonce + 1,
               _safeTransferFromDigest(from, to, id, value, _accounts[from].nonce + 1));
    }


    function _freeSetApprovalForAllDigest(
        address operator,
        address account,
        uint256 nonce,
        uint256 expiry,
        bool approved
    )
        internal view returns (bytes32)
    {
        return keccak256(abi.encodePacked(
                "\x19\x01",
                _eip712Config.DOMAIN_SEPARATOR,
                keccak256(abi.encode(_eip712Config.APPROVAL_TYPEHASH,
                                     operator,
                                     account,
                                     nonce,
                                     expiry,
                                     approved))));
    }

    function _safeTransferFromDigest(
        address from,
        address to,
        uint256 id,
        uint256 value,
        uint256 nonce
    )
        internal view returns (bytes32)
    {
        return keccak256(abi.encodePacked(
                "\x19\x01",
                _eip712Config.DOMAIN_SEPARATOR,
                keccak256(abi.encode(_eip712Config.TRANSFER_TYPEHASH,
                                     from,
                                     to,
                                     id,
                                     value,
                                     nonce))));
    }


    function _initFreeSetApprovalForAll(bytes32 salt) internal {
        uint256 chainId;
        assembly { chainId := chainid() }

        _eip712Config.SALT = salt;
        _eip712Config.DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"),
            keccak256(bytes("StashBloxContract")),
            keccak256(bytes("1.0.0")),
            chainId,
            address(this),
            salt
        ));
        _eip712Config.APPROVAL_TYPEHASH = keccak256("FreeSetApprovalForAll(address operator,address account,uint256 nonce,uint256 expiry,bool approved)");
        _eip712Config.TRANSFER_TYPEHASH = keccak256("SafeTransferFrom(address from,address to,uint256 id,uint256 value)");
    }

}
