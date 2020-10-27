// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import '../lib/GSNCapable.sol';

contract GSNCapableMock is GSNCapable {

    constructor(address trustedForwarder) {
        _config.GSNTrustedForwarder = trustedForwarder;
    }

    function publicMsgSender() public view returns (address) {
        return _msgSender();
    }

    function publicMsgData() public view returns (bytes memory) {
        return _msgData();
    }

}
