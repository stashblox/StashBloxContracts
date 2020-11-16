// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../lib/GSNCapable.sol";

contract GSNCapableMock is GSNCapable {

    constructor(address trustedForwarder) {
        _permissions[trustedForwarder][Actions.GSN_FORWARDER][0] = true;
    }

    function publicMsgSender() public view returns (address) {
        return _msgSender();
    }

    function publicMsgData() public view returns (bytes memory) {
        return _msgData();
    }

}
