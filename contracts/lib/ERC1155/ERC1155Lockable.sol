pragma solidity ^0.7.1;

import "../ERC173/ERC173.sol";

contract ERC1155Lockable is ERC173 {

    // Mapping for locked tokens
    mapping (uint256 => bool) private _tokenLocks;
    mapping (address => bool) private _addressLocks;

    function lockToken(uint256 id) external onlyOwner {
        _tokenLocks[id] = true;
    }

    function unlockToken(uint256 id) external onlyOwner {
        _tokenLocks[id] = false;
    }

    function isLockedToken(uint256 id) external view returns (bool){
        return _isLockedToken(id);
    }

    function _isLockedToken(uint256 id) internal view returns (bool) {
        return _tokenLocks[id];
    }

    function lockAddress(address addr) external onlyOwner {
        _addressLocks[addr] = true;
    }

    function unlockAddress(address addr) external onlyOwner {
        _addressLocks[addr] = false;
    }

    function isLockedAddress(address addr) external view returns (bool){
        return _isLockedAddress(addr);
    }

    function _isLockedAddress(address addr) internal view returns (bool) {
        return _addressLocks[addr];
    }

    function _isLockedMove(address from, address to, uint256 id, uint256 value) internal view returns (bool) {
        return _isLockedToken(id) || _isLockedAddress(from) || _isLockedAddress(to) || (value == 0);
    }
}
