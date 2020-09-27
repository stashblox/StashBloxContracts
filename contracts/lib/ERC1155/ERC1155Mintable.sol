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

    // Minimum holding to propose a callback for each token
    mapping (uint256 => uint256) _minHoldingForCallback;

    event UpdateStorageCost(address indexed _tokenizer, uint256 _id, uint256 _cost);
    event UpdateStorageCreditPrice(address indexed _owner, uint256 _price);


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

    function _createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256 metadataHash,
                         uint256 storageCreditCost,
                         uint256 minHoldingForCallback,
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage)
    internal {

        require(_supplies[id] == 0, "StashBlox: Token already minted");
        require(supply > 0, "StashBlox: supply should be greater than 0");
        require(storageCreditCost > 0, "StashBlox: storageCreditCost should be greater than 0");
        require(minHoldingForCallback > 0, "StashBlox: minHoldingForCallback should be greater than 0");
        require(minHoldingForCallback <= 10000, "StashBlox: minHoldingForCallback should be lower or equal than 10000");
        require(feesRecipients.length > 0, "StashBlox: need at least one feesRecipients");
        require(feesRecipients.length == feesRecipientsPercentage.length, "StashBlox: invalid feesRecipientsPercentage length");

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < feesRecipientsPercentage.length; ++i) {
            totalPercentage += feesRecipientsPercentage[i];
            require(feesRecipientsPercentage[i] > 0, "StashBlox: feesRecipientsPercentage should be greater than 0");
        }
        require(totalPercentage == 10000, "StashBlox: Total of feesRecipientsPercentage must be equal to 10000");

        _isHolder[id][recipient] = true;
        _tokensByAddress[recipient].push(id);
        _supplies[id] = supply;
        _balances[id][recipient] = supply;
        _updateMetadataHash(id, metadataHash);
        _birthdays[id][recipient] = block.timestamp;
        _storageCostHistory[id].push([block.timestamp, storageCreditCost]);
        _minHoldingForCallback[id] = minHoldingForCallback;
        _feesRecipients[id] = feesRecipients;
        _feesRecipientsPercentage[id] = feesRecipientsPercentage;

        emit TransferSingle(msg.sender, address(0), recipient, id, supply);
        // emit URI(uri, id);
    }

    /**
     * @dev Function to mint an amount of a token with the given ID.
     * @param recipient The address that will own the minted tokens
     * @param id ID of the token to be minted
     * @param supply Amount of the token to be minted
     * @param metadataHash Metadata file hash
     * @param storageCreditCost cost for 24h storage in storageCredit (x 10 ^ 8 for the precision)
     * @param minHoldingForCallback minimum holding to propose a callback
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256 metadataHash,
                         uint256 storageCreditCost,
                         uint256 minHoldingForCallback,
                         address[] calldata feesRecipients,
                         uint256[] calldata feesRecipientsPercentage)
    external onlyTokenizer {
        _createToken(recipient,
                     id,
                     supply,
                     metadataHash,
                     storageCreditCost,
                     minHoldingForCallback,
                     feesRecipients,
                     feesRecipientsPercentage);
    }

    function updateMetadataHash(uint256 id, uint256 metadataHash) external onlyTokenizer {
      _updateMetadataHash(id, metadataHash);
    }

    function updateStorageCreditPrice(uint256 newPrice) external onlyTokenizer {
      storageCreditPrice = newPrice;
      emit UpdateStorageCreditPrice(msg.sender, newPrice);
    }

    function updateStorageCost(uint256 id, uint256 newCost) external onlyTokenizer {
      _storageCostHistory[id].push([block.timestamp, newCost]);
      emit UpdateStorageCost(msg.sender, id, newCost);
    }

    function withdraw(address to, uint256 amount) external onlyOwner {
      require(_ETHBalances[to] >= amount, "StashBlox: Insufficient balance.");
      (bool success, ) = to.call.value(amount)("");
      require(success, "StashBlox: Withdrawal failed.");
      _ETHBalances[to] -= amount;
    }

    /**
     * @param id Token ID
     * @return Token supply
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _supplies[id];
    }
}
