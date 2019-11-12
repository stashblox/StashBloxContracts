pragma solidity ^0.5.12;
// pragma experimental ABIEncoderV2;

import './ERC1155.sol';
import '../ERC173/ERC173.sol';
import '../utils/StringUtils.sol';

contract ERC1155Mintable is ERC1155, ERC173 {

    // Mapping from token ID to Supply
    mapping (uint256 => uint256) internal _supplies;
    mapping (address => bool) private _authorizedTokenizers;

    function authorizeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = true;
    }

    function revokeTokenizer(address tokenizer) external onlyOwner {
        _authorizedTokenizers[tokenizer] = false;
    }

    function isTokenizer(address tokenizer) external view returns (bool) {
        return _authorizedTokenizers[tokenizer];
    }


    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param ids ID of the token to be minted
     * @param recipients The addresses that will own the minted token
     * @param values Amount of the token to be minted for each recipient
     */
    function createTokens(uint256[] calldata ids,
                          address[] calldata recipients,
                          uint256[] calldata values)
    external onlyOwner {
        require(_authorizedTokenizers[msg.sender], "StashBlox: Unauthorized");
        require(ids.length == recipients.length, "StashBlox: ids and recipients must have same lengths");
        require(recipients.length == values.length, "StashBlox: recipients and values must have same lengths");
        for (uint256 i = 0; i < ids.length; ++i)
            require(_supplies[ids[i]] == 0, "StashBlox: Token already minted");

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            address to = recipients[i];
            uint256 value = values[i];
            _supplies[id] = _supplies[id].add(value);
            _balances[id][to] = _balances[id][to].add(value);
            emit TransferSingle(msg.sender, address(0), to, id, value);
            // emit URI(uri, id);
        }
    }

    /**
     * @param id Token ID
     * @return Token supply
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _supplies[id];
    }


}
