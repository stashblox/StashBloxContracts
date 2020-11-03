// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../lib/GSNCapable.sol";

contract GSNCapableMock is GSNCapable {

    constructor(address trustedForwarder) {
        _config.gsnTrustedForwarder = trustedForwarder;
    }

    function publicMsgSender() public view returns (address) {
        return _msgSender();
    }

    function publicMsgData() public view returns (bytes memory) {
        return _msgData();
    }

}
