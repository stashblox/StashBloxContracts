pragma solidity ^0.7.1;

import './lib/ERC1155/ERC1155Mintable.sol';
import "./lib/utils/SafeMath.sol";

contract StashBlox is ERC1155Mintable {

    // list of callback propositions
    // _callbackPropositions[tokenID][proposer] = [priceForEachToken, ETHAmountEscrowed]
    mapping (uint256 => mapping(address => uint256[2])) _callbackPropositions;

    event CallbackProposed(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackRefused(uint256 indexed _id, address _proposer, uint256 _price);
    event CallbackAccepted(uint256 indexed _id, address _proposer, uint256 _price);

    using SafeMath for uint256;

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

      uint256 minHolding = (_supplies[id].mul(_minHoldingForCallback[id])).div(10000);
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

      uint256 minHolding = (_supplies[id].mul(_minHoldingForCallback[id])).div(10000);
      require(_balances[id][proposer] >= minHolding, "StashBlox: insufficient balance to execute the callback.");

      uint256 callbackAmount = _supplies[id].sub(_balances[id][proposer]);
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
}
