// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "../interfaces/IERC1155.sol";

contract OwnableDelegateProxyMock {

    address _ERC1155Address;

    constructor(address ERC1155Address) {
        _ERC1155Address = ERC1155Address;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external payable {
        IERC1155(_ERC1155Address).safeTransferFrom{value: msg.value}(from, to, id, value, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
    external payable {
        IERC1155(_ERC1155Address).safeBatchTransferFrom{value: msg.value}(from, to, ids, values, data);
    }
}
