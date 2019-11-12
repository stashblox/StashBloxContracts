pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import './lib/ERC1155/ERC1155Lockable.sol';
import './lib/ERC1155/ERC1155Documents.sol';
import './lib/ERC1155/ERC1155Metadata.sol';
import './lib/ERC1155/ERC1155Sellable.sol';

contract StashBlox is ERC1155Lockable, ERC1155Sellable, ERC1155Documents, ERC1155Metadata {

}
