// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "../../utils/SafeMath.sol";
import "../Core/Core.sol";

contract Escrowable is Core {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
       @notice Function to put `amount` tokens `id` in escrow. Typically by an exchange to escrow amount in orders.
       @param account  Source address
       @param id       Token ID
       @param amount   amount to escrow
    */
    function escrowTokens(
        address account,
        uint256 id,
        uint256 amount
    )
        external onlyAuthorized(_msgSender(), Actions.ESCROW_TOKENS, id)
    {
        require(_tokens[id].supply > 0);
        address escrow = _msgSender();
        _accounts[account].tokens[id].balance = _accounts[account].tokens[id].balance.sub(amount, "Insufficient balance");
        _escrows[escrow][account][id] = _escrows[escrow][account][id].add(amount);
    }

    /**
       @notice Function to unescrow `amount` tokens `id`. Typically by an exchange to finalize or cancel an order.
       @param from    Source address
       @param to      Target address
       @param id      Token ID
       @param amount  amount to unescrow
    */
    function unescrowTokens(
        address from,
        address to,
        uint256 id,
        uint256 amount
    )
        external onlyAuthorized(_msgSender(), Actions.ESCROW_TOKENS, id)
    {
        require(_tokens[id].supply > 0);
        address escrow = _msgSender();
        _escrows[escrow][from][id] = _escrows[escrow][from][id].sub(amount, "Insufficient balance");
        _accounts[to].tokens[id].balance = _accounts[to].tokens[id].balance.add(amount);
    }

    /**
       @notice Function to authorize `escrow` to put in lock tokens from `account`.
       Typically `escrow` is the contract address of an exchange.
       @param escrow         Address of the escrow
       @param account        Target address
       @param id             Token ID
       @param authorized    `True' to authorize, `False` to revoke
       @param data           Optional. This function can be called by a third party by providing
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
                             The digest and the nonce can be craft or can be provided by the function `setEscrowAuthorizationDigest`.
    */
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


    /**
        @dev Function to get the digest and the nonce for the given arguments. The digest and the nonce
        need to be signed by `account`, then the signature can be used to call the `setEscrowAuthorization`
        on behalf `account`. See `setEscrowAuthorization` documentation.
        @param escrow         Address of the escrow
        @param account        Target address
        @param id             Token ID
        @param authorized    `True' to authorize, `False` to revoke
        @param expiry         When the signed digest will expire
        @return nonce and digest usable once
    */
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


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _checkSetEscrowAuthorizationSignature(
        address escrow,
        address account,
        uint256 id,
        bool authorized,
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
