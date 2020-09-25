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

    // Minimum holding to propose a callback
    uint256 minHoldingForCallback = 8000; // 80%
    // list of callback propositions
    // _callbackPropositions[tokenID][proposer] = [priceForEachToken, ETHAmountEscrowed]
    mapping (uint256 => mapping(address => uint256[2])) _callbackPropositions;

    // default values for token batch creation
    uint256 defaultSupply;
    uint256 defaultStorageCreditCost;
    address[] defaultFeesRecipients;
    uint256[] defaultFeesRecipientsPercentage;

    event UpdateStorageCost(address indexed _tokenizer, uint256 _id, uint256 _cost);
    event UpdateStorageCreditPrice(address indexed _owner, uint256 _price);
    event CallbackProposed(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackRefused(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackAccepted(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackCanceled(uint256 indexed _id, address _proposer, uint256 _price);

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
                         address[] memory feesRecipients,
                         uint256[] memory feesRecipientsPercentage)
    internal {

        require(_supplies[id] == 0, "StashBlox: Token already minted");
        require(supply > 0, "StashBlox: supply should be greater than 0");
        require(storageCreditCost > 0, "StashBlox: storageCreditCost should be greater than 0");
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
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     */
    function createToken(address recipient,
                         uint256 id,
                         uint256 supply,
                         uint256 metadataHash,
                         uint256 storageCreditCost,
                         address[] calldata feesRecipients,
                         uint256[] calldata feesRecipientsPercentage)
    external onlyTokenizer {
        _createToken(recipient,
                     id,
                     supply,
                     metadataHash,
                     storageCreditCost,
                     feesRecipients,
                     feesRecipientsPercentage);
    }

    /**
     * @dev Set default values for batch token creation.
     * @param supply Amount of the token to be minted
     * @param storageCreditCost cost for 24h storage in storageCredit (x 10 ^ 8 for the precision)
     * @param feesRecipients list of addresses receiving transfer fees
     * @param feesRecipientsPercentage list of percentage, each one for the corresponding feesRecipients
     */
    function setCreateTokensDefaultValues(uint256 supply,
                                          uint256 storageCreditCost,
                                          address[] calldata feesRecipients,
                                          uint256[] calldata feesRecipientsPercentage)
    external onlyTokenizer {

        defaultSupply = supply;
        defaultStorageCreditCost = storageCreditCost;
        defaultFeesRecipients = feesRecipients;
        defaultFeesRecipientsPercentage = feesRecipientsPercentage;
    }

    /**
     * @dev Function to mint token in batch. Default value must be set with setCreateTokensDefaultValues.
     * @param recipient The address that will own the minted tokens
     * @param ids list of IDs of the tokens to be minted
     * @param metadataHashes list of Metadata file hash
     */
    function createTokens(address recipient,
                          uint256[] calldata ids,
                          uint256[] calldata metadataHashes)
    external onlyTokenizer {

        for (uint256 i = 0; i < ids.length; ++i) {
            _createToken(recipient,
                         ids[i],
                         defaultSupply,
                         metadataHashes[i],
                         defaultStorageCreditCost,
                         defaultFeesRecipients,
                         defaultFeesRecipientsPercentage);
        }
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
      if (_ETHBalances[to] >= amount) {
        (bool success, ) = to.call.value(amount)("");
        require(success, "StashBlox: Withdrawal failed.");
        _ETHBalances[to] -= amount;
      }
    }

    /**
     * @dev Propose to buy the whole supply of a token.
     * The proposer must hold minHoldingForCallback% of the total supply.
     * StashBlox must approve the price with acceptCallback();
     * @param id Token ID
     * @param price proposed price
     */
    function proposeCallback(uint256 id, uint256 price) external payable {
      require(_supplies[id] > 0, "StashBlox: Unknown token.");
      require(price > 0, "StashBlox: Price must be greater than 0.");

      uint256 minHolding = (_supplies[id].mul(minHoldingForCallback)).div(10000);
      require(_balances[id][msg.sender] >= minHolding, "StashBlox: insufficient balance to propose a callback.");

      uint256 callbackAmount = _supplies[id].sub(_balances[id][msg.sender]);
      uint256 callbackPrice = callbackAmount.mul(price);
      require(msg.value >= callbackPrice, "StashBlox: insufficient value for the proposed price.");

      _callbackPropositions[id][msg.sender] = [price, msg.value];
      emit CallbackProposed(id, msg.sender, price);
    }

    /**
     * @dev Refuse a callback if the price is not enough.
     * @param id Token ID
     * @param proposer address of the proposer
     */
    function refuseCallback(uint256 id, address proposer) external onlyOwner {
      uint256 price = _callbackPropositions[id][proposer][0];
      uint256 escrowedAmount = _callbackPropositions[id][proposer][1];

      require(price > 0, "StashBlox: callback proposition not found.");

      // return escrowed amount. Proposer must use withdraw() function to get
      // escrowed amount.
      _ETHBalances[proposer] += escrowedAmount;

      _callbackPropositions[id][proposer] = [0, 0];
      emit CallbackRefused(id, proposer, price);
    }

    /**
     * @dev Accept a callback
     * @param id Token ID
     * @param proposer address of the proposer
     */
    function acceptCallback(uint256 id, address proposer) external onlyOwner {
      uint256 price = _callbackPropositions[id][proposer][0];
      uint256 escrowedAmount = _callbackPropositions[id][proposer][1];

      require(price > 0, "StashBlox: callback proposition not found.");

      uint256 minHolding = (_supplies[id].mul(minHoldingForCallback)).div(10000);
      require(_balances[id][msg.sender] >= minHolding, "StashBlox: insufficient balance to execute the callback.");

      uint256 callbackAmount = _supplies[id].sub(_balances[id][msg.sender]);
      uint256 callbackPrice = callbackAmount.mul(price);
      require(escrowedAmount >= callbackPrice, "StashBlox: insufficient escrowed value to execute the callback.");

      // move tokens to the proposer address and escrowed ETH to the holders addresses
      // Holders must use withdraw() function to get paiement amount.
      for (uint256 i = 0; i < _addressesByToken[id].length; ++i) {
        address holderAddress = _addressesByToken[id][i];
        uint256 holderBalance = _balances[id][holderAddress];
        if (holderBalance > 0) {
          uint256 holderPrice = price.mul(holderBalance);
          _ETHBalances[holderAddress] += holderPrice;
          _balances[id][holderAddress] = 0;
        }
      }
      _balances[id][proposer] = _supplies[id];
      if (escrowedAmount > callbackPrice) {
        _ETHBalances[proposer] += escrowedAmount - callbackPrice;
      }

      _callbackPropositions[id][proposer] = [0, 0];
      emit CallbackAccepted(id, proposer, price);
    }


    /**
     * @param id Token ID
     * @return Token supply
     */
    function totalSupply(uint256 id) external view returns (uint256) {
        return _supplies[id];
    }
}
