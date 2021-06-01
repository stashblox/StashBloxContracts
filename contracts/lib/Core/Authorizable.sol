// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "./GSNCapable.sol";
import "../../interfaces/IERC173.sol";

contract Authorizable is IERC173, GSNCapable {


    /****************************
    MODIFIERS
    *****************************/


    modifier onlyAuthorized(address account, Actions action, uint256 objectId) {
        require(isAuthorized(account, action, objectId), "not authorized");
        _;
    }


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/

    /**
        @dev Function to authorize an account to perform an operation on an object.
        @param account      The address to set for an authorization
        @param action       The index of the action. Should be one of the following:<br /><br />
                            0: SET_AUTHORIZATION<br />
                            1: UPDATE_CONFIG<br />
                            2: CREATE_TOKEN<br />
                            3: UPDATE_TOKEN<br />
                            4: TRANSFER_OWNERSHIP<br />
                            5: REGISTER_CURRENCY<br />
                            6: CALL_TOKENS<br />
                            7: LOCK_ACCOUNT<br />
                            8: GSN_FORWARDER<br />
                            9: TRANSFER_TOKEN_FOR<br />
                            10: HOLD_PRIVATE_TOKEN<br />
                            <br />
        @param objectId     The ID of the object for which to set the authorization
        @param authorized   `True` to authorize, `False` to revoke authorization
    */
    function setAuthorization(
        address account,
        Actions action,
        uint256 objectId,
        bool authorized
    )
        external onlyAuthorized(_msgSender(), Actions.SET_AUTHORIZATION, 0)
    {
        _permissions[account][action][objectId] = authorized;
    }

    /**
        @dev Function to check if an address has the given authorization
        @param account    The address to check
        @param action     The index of the action. See `setAuthorization` documentation.
        @param objectId   The ID of the object for which the authorization is set
        @return `True` if `account` is authorized to perform `action` on `objectId`.
    */
    function isAuthorized(
        address account,
        Actions action,
        uint256 objectId
    )
        public view returns (bool)
    {
        if (account == _config.owner) return true;
        return _permissions[account][action][objectId];
    }


    /**
        @dev Returns the address of the current owner.
     */
    function owner() public view override returns (address) {
        return _config.owner;
    }

    /**
        @dev Transfers ownership of the contract to a new account (`account`).
        @param account address of the new owner
     */
    function transferOwnership(
        address account
    )
        public override onlyAuthorized(_msgSender(), Actions.TRANSFER_OWNERSHIP, 0)
    {
        _transferOwnership(account);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _transferOwnership(address account) internal {
        require(account != address(0), "invalid account");
        emit OwnershipTransferred(_config.owner, account);
        _config.owner = account;
    }

    function _callFunctionDigest(
        bytes32 functionHash,
        uint256 format,
        uint256 nonce,
        uint256 expiry
    )
        internal view returns (bytes32)
    {
        bytes32 digest = keccak256(abi.encodePacked(
            "\\x19\\x01",
            _config.DOMAIN_SEPARATOR,
            functionHash,
            keccak256(abi.encode(nonce, expiry))
        ));
        return _formatDigest(digest, format);
    }

    function _formatDigest(bytes32 digest, uint256 format) internal pure returns (bytes32) {
        if (format == 0) // sign = ecsign(digest)
            return digest;
        if (format == 1) // sign = ecsign(keccak256("\x19Ethereum Signed Message:\n32" + digest))
            return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", digest));
        if (format == 2) // sign = ecsign(sha256("\x19Ethereum Signed Message:\n32" + digest))
            return sha256(abi.encodePacked("\x19Ethereum Signed Message:\n32", digest));
        revert("invalid format");
    }

    function _requireValidSignature(
        address account,
        bytes32 digest,
        uint256 nonce,
        uint256 expiry,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal view returns (bool) {
        return (account == ecrecover(digest, v, r, s) &&
                expiry == 0 || block.timestamp <= expiry &&
                nonce ==  _accounts[account].nonce + 1);
    }

    function _initGasLessTransactions(bytes32 salt) internal {
        uint256 chainId;
        assembly { chainId := chainid() }

        _config.DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)"),
            keccak256(bytes("StashBloxContract")),
            keccak256(bytes("1.0.0")),
            chainId,
            address(this),
            salt
        ));
        _config.APPROVAL_TYPEHASH = keccak256("SetApprovalForAll(address account,address operator,bool approved)");
        _config.TRANSFER_TYPEHASH = keccak256("SafeTransferFrom(address from,address to,uint256 id,uint256 value)");
        _config.SALT = salt;
    }

}
