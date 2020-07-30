pragma solidity ^0.5.12;
// pragma experimental ABIEncoderV2;

import './ERC1155.sol';
import './ERC1155Metadata.sol';
import '../ERC173/ERC173.sol';
import '../utils/StringUtils.sol';

contract ERC1155Mintable is ERC1155, ERC1155Metadata {

    // Mapping from token ID to Supply
    mapping (uint256 => uint256) internal _supplies;
    mapping (address => bool) private _authorizedTokenizers;


    function authorizeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = true;
    }

    function revokeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = false;
    }

    function _isTokenizer(address tokenizer) internal view returns (bool) {
        return _authorizedTokenizers[tokenizer] || _isOwner();
    }

    function isTokenizer(address tokenizer) external view returns (bool) {
        return _isTokenizer(tokenizer);
    }

    modifier onlyTokenizer() {
        require(_isTokenizer(msg.sender), "Mintable: caller is not a tokenizer");
        _;
    }

    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param ids ID of the token to be minted
     * @param recipients The addresses that will own the minted token
     * @param values Amount of the token to be minted for each recipient
     * @param metadataHashes Metadata files hashes
     * @param storagePrices price for 24h storage
     */
    function createTokens(uint256[] calldata ids,
                          address[] calldata recipients,
                          uint256[] calldata values,
                          uint256[] calldata metadataHashes,
                          uint256[] calldata storagePrices)
    external onlyTokenizer {

        require(ids.length == recipients.length &&
                recipients.length == values.length &&
                values.length == metadataHashes.length, "StashBlox: all lists must have same lengths");

        for (uint256 i = 0; i < ids.length; ++i)
            require(_supplies[ids[i]] == 0, "StashBlox: Token already minted");

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            address to = recipients[i];
            uint256 value = values[i];
            _supplies[id] = value;
            _storagePricesHistory[id].push([block.timestamp, storagePrices[i]]);
            _balances[id][to] = value;
            _isHolder[id][to] = true;
            _birthdays[id][to] = block.timestamp;
            _tokensByAddress[to].push(id);
            emit TransferSingle(msg.sender, address(0), to, id, value);
            _updateMetadataHash(id, metadataHashes[i]);
            // emit URI(uri, id);
        }
    }

    function updateMetadataHash(uint256 id, uint256 metadataHash) external onlyTokenizer {
        _updateMetadataHash(id, metadataHash);
    }

    function updateStoragePrice(uint256 id, uint256 newPrice) external onlyTokenizer {
        _storagePricesHistory[id].push([block.timestamp, newPrice]);
    }

    /**
     * @param id Token ID
     * @return Token supply
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _supplies[id];
    }
}
