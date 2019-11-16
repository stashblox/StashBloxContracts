pragma solidity ^0.5.12;

import '../ERC1155/IERC1155Metadata.sol';
import '../utils/StringUtils.sol';

contract ERC1155Metadata is IERC1155Metadata, StringUtils {

    // Mapping from token ID to URI
    string constant public BASE_URI = "https://stashblox.com/tokens/";

    mapping (uint256 => uint256) internal _metadataHashes;

    /**
     * @param id Token ID
     * @return URI string
     */
    function uri(uint256 id) external view returns (string memory) {
        return _strConcat(BASE_URI, _toHexString(id));
    }

    function metadataHash(uint256 id) external view returns (uint256) {
        return _metadataHashes[id];
    }

}
