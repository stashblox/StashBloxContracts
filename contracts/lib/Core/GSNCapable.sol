// SPDX-License-Identifier:MIT
// (c) Copyright 2020 Stashblox, all rights reserved.
// solhint-disable no-inline-assembly
pragma solidity ^0.7.4;

import "../../interfaces/IRelayRecipient.sol";
import "./Data.sol";

/**
    A base contract to be inherited by any contract that want to receive relayed transactions
    A subclass must use "_msgSender()" instead of "msg.sender"
*/
abstract contract GSNCapable is IRelayRecipient, Data {


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
        @dev Function to check if an address is a trusted GSN forwarder
        @param account The address to check
        @return `True` if `account` is a trusted forwarder
    */
    function isTrustedForwarder(address account) public override view returns(bool) {
        return _permissions[account][Actions.GSN_FORWARDER][0];
    }

    /**
        @dev Function get the version of the contract (Used by GSN relays)
        @return contract version
    */
    function versionRecipient() external override view returns (string memory) {
        return _config.versionRecipient;
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    /**
       return the sender of this call.
       if the call came through our trusted forwarder, return the original sender.
       otherwise, return `msg.sender`.
       should be used in the contract anywhere instead of msg.sender
    */
    function _msgSender() internal override virtual view returns (address payable account) {
        if (msg.data.length >= 24 && isTrustedForwarder(msg.sender)) {
            // At this point we know that the sender is a trusted forwarder,
            // so we trust that the last bytes of msg.data are the verified sender address.
            // extract sender address from the end of msg.data
            assembly {
                account := shr(96,calldataload(sub(calldatasize(),20)))
            }
        } else {
            return msg.sender;
        }
    }

    /**
       return the msg.data of this call.
       if the call came through our trusted forwarder, then the real sender was appended as the last 20 bytes
       of the msg.data - so this method will strip those 20 bytes off.
       otherwise, return `msg.data`
       should be used in the contract instead of msg.data, where the difference matters (e.g. when explicitly
       signing or hashing the
    */
    function _msgData() internal override virtual view returns (bytes memory account) {
        if (msg.data.length >= 24 && isTrustedForwarder(msg.sender)) {
            // At this point we know that the sender is a trusted forwarder,
            // we copy the msg.data , except the last 20 bytes (and update the total length)
            assembly {
                let ptr := mload(0x40)
                // copy only size-20 bytes
                let size := sub(calldatasize(),20)
                // structure RLP data as <offset> <length> <bytes>
                mstore(ptr, 0x20)
                mstore(add(ptr,32), size)
                calldatacopy(add(ptr,64), 0, size)
                return(ptr, add(size,64))
            }
        } else {
            return msg.data;
        }
    }

}
