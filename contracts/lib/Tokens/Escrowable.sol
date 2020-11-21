// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../../utils/SafeMath.sol";

import "../Core/Core.sol";

contract Escrowable is Core {

    using SafeMath for uint256;

    function escrowTokens(
        address account,
        uint256 id,
        uint256 amount
    )
        external onlyAuthorized(_msgSender(), Actions.ESCROW_TOKENS, id)
    {
        require(_tokens[id].supply > 0, "unknown token");
        address escrow = _msgSender();
        _accounts[account].tokens[id].balance = _accounts[account].tokens[id].balance.sub(amount, "Insufficient balance");
        _escrows[escrow][account][id] = _escrows[escrow][account][id].add(amount);
    }

    function unescrowTokens(
        address from,
        address to,
        uint256 id,
        uint256 amount
    )
        external onlyAuthorized(_msgSender(), Actions.ESCROW_TOKENS, id)
    {
        require(_tokens[id].supply > 0, "unknown token");
        address escrow = _msgSender();
        _escrows[escrow][from][id] = _escrows[escrow][from][id].sub(amount, "Insufficient balance");
        _accounts[to].tokens[id].balance = _accounts[to].tokens[id].balance.add(amount);
    }

    function setEscrowAuthorization(
        address escrow,
        address account,
        uint256 id,
        bool authorized,
        bytes calldata data
    )
        external
    {
        require(_msgSender() == account||
                (data.length == 192 && _checkSetEscrowAuthorizationSignature(escrow, account, id, authorized, data)),
                "invalid arguments");
        _permissions[escrow][Actions.ESCROW_TOKENS][id] = authorized;
    }



    function setEscrowAuthorizationDigest(
        address escrow,
        address account,
        uint256 id,
        bool authorized,
        uint256 expiry
    )
        external view returns (uint256, bytes32)
    {
        return (
            _accounts[account].nonce + 1,
            _setEscrowAuthorizationDigest(escrow, account, id, authorized, 0, _accounts[account].nonce + 1, expiry)
        );
    }


    function _checkSetEscrowAuthorizationSignature(
        address escrow,
        address account,
        uint256 id,
        bool authorized,
        bytes calldata data
    )
        internal returns (bool)
    {
        (
            uint256 format,
            uint256 nonce,
            uint256 expiry,
            uint8 v,
            bytes32 r,
            bytes32 s
        ) = abi.decode(data, (uint256, uint256, uint256, uint8, bytes32, bytes32));
        bytes32 digest = _setEscrowAuthorizationDigest(escrow, account, id, authorized, format, nonce, expiry);

        return _requireValidSignature(account, digest, nonce, expiry, v, r, s);
    }

    function _setEscrowAuthorizationDigest(
        address escrow,
        address account,
        uint256 id,
        bool authorized,
        uint256 format,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 functionHash = keccak256(abi.encode(
            _config.ESCROW_TYPEHASH,
            escrow, account, id, authorized
        ));
        return _callFunctionDigest(functionHash, format, nonce, expiry);
    }
}
