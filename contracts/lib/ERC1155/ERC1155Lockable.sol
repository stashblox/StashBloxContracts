pragma solidity ^0.5.12;

import './ERC1155.sol';
import "../ERC173/ERC173.sol";

contract ERC1155Lockable is ERC1155, ERC173 {

    // Mapping for locked tokens
    mapping (uint256 => bool) private _locks;

    function lockToken(uint256 id) external onlyOwner {
        _locks[id] = true;
    }

    function unlockToken(uint256 id) external onlyOwner {
        _locks[id] = false;
    }

    function isLockedToken(uint256 id) external view returns (bool){
        return _isLockedToken(id);
    }

    function _isLockedToken(uint256 id) internal view returns (bool) {
        return _locks[id];
    }

    modifier requireUnlockedToken(uint256 id) {
        require(!_isLockedToken(id), "ERC1155Lockable: Token locked");
        _;
    }

    modifier requireUnlockedTokens(uint256[] memory ids) {
        for (uint256 i = 0; i < ids.length; ++i) {
            require(!_isLockedToken(ids[i]), "ERC1155Lockable: Token locked");
        }
        _;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external requireUnlockedToken(id)
    {
        ERC1155(this).safeTransferFrom(from, to, id, value, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
        external requireUnlockedTokens(ids)
    {
        ERC1155(this).safeBatchTransferFrom(from, to, ids, values, data);
    }

    /**
     * @param value String to check
     * @return True if value is ""
     */
    function _isEmptyString(string memory value) internal pure returns (bool) {
        return bytes(value).length == 0;
    }

}
