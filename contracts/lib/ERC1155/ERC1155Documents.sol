pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import '../utils/StringUtils.sol';
import "../ERC173/ERC173.sol";

contract ERC1155Documents is ERC173, StringUtils {

    string constant public DOCUMENTS_BASE_URI = "https://stashblox.com/documents/";

    // Mapping tokenID => (hash => name) to documents
    mapping (uint256 => mapping(uint256 => string)) _documents;

    /**
        @dev MUST emit when a document is added for a token ID.
    */
    event DocumentAdded(uint256 indexed id, uint256 hash, string name);

    function _addDocument(uint256 id,
                          uint256 docHash,
                          string memory docName)
    internal {
        _documents[id][docHash] = docName;
        emit DocumentAdded(id, docHash, docName);
    }

    function addDocument(uint256 id,
                         uint256 docHash,
                         string calldata docName)
    external onlyOwner {
        _addDocument(id, docHash, docName);
    }

    function documentUri(uint256 docHash) external pure returns (string memory) {
        return _strConcat(DOCUMENTS_BASE_URI, _toHexString(docHash));
    }

}
