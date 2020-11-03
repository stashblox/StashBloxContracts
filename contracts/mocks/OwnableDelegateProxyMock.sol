// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;

import "../interfaces/IERC1155.sol";

contract OwnableDelegateProxyMock {

    address public _erc1155Address;

    constructor(address erc1155Address) {
        _erc1155Address = erc1155Address;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external payable {
        IERC1155(_erc1155Address).safeTransferFrom{value: msg.value}(from, to, id, value, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
    external payable {
        IERC1155(_erc1155Address).safeBatchTransferFrom{value: msg.value}(from, to, ids, values, data);
    }
}
