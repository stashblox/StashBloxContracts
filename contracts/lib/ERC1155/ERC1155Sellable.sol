pragma solidity ^0.5.12;

import './ERC1155Mintable.sol';
import '../utils/StringUtils.sol';

contract ERC1155Sellable is ERC1155Mintable {

    uint256 private _offerId;
    uint256 private _dealId;
    address private ESCROW_ADDRESS;

    struct Offer {
        uint256 id;
        uint256 tokenId;
        address from;
        uint256 amount;
        uint256 pendingAmount;
        uint256 paidAmount;
        uint256 priceCurrency;
        uint256 price;
        bool acceptPartial;
        address paymentOfficer;
        mapping (address => bool) authorizedBuyers;
        uint256 authorizedBuyersLength;
        bool open;
        bool canceled;
    }

    struct Deal {
        uint256 id;
        uint256 offerId;
        address buyer;
        uint256 amount;
        uint256 endCancellationPeriod;
        bool confirmed;
        bool canceled;
    }

    mapping (uint256 => Offer) private _offers;
    mapping (uint256 => Deal) private _deals;

    event OfferOpened(uint256 indexed offerId,
                      uint256 indexed tokenId,
                      address indexed from,
                      uint256 amount,
                      uint256 priceCurrency,
                      uint256 price);
    event OfferCancelled(uint256 indexed offerId);
    event OfferAccepted(uint256 indexed offerId,
                        uint256 indexed dealId,
                        address indexed buyer,
                        uint256 amount,
                        uint256 endCancellationPeriod);
    event DealConfirmed(uint256 indexed dealId);
    event DealCancelled(uint256 indexed dealId);


    function openOffers(uint256[] calldata tokenIds,
                        uint256[] calldata amounts,
                        uint256[] calldata prices, // by unit of id
                        uint256 priceCurrency,
                        bool acceptPartial,
                        address paymentOfficer,
                        address[] calldata authorizedBuyers) external returns (uint256[] memory offerIds) {

        require((tokenIds.length > 0) &&
                (amounts.length == tokenIds.length) &&
                (prices.length == amounts.length),
                "StashBlox: all list must have same lengths and at least one element");

        for (uint256 i = 0; i < tokenIds.length; ++i)
            offerIds[i] = _openOffer(tokenIds[i],
                                     msg.sender,
                                     amounts[i],
                                     prices[i],
                                     priceCurrency,
                                     acceptPartial,
                                     paymentOfficer,
                                     authorizedBuyers);

        return offerIds;
    }

    function cancelOffers(uint256[] calldata offerIds) external {
        for (uint256 i = 0; i < offerIds.length; ++i) _cancelOffer(offerIds[i]);
    }

    function onOffersAccepted(uint256[] calldata offerIds,
                              address[] calldata buyers,
                              uint256[] calldata amounts,
                              uint256[] calldata cancellationPeriods) external returns (uint256[] memory dealIds) {

        require((offerIds.length > 0) &&
                (buyers.length == offerIds.length) &&
                (amounts.length == buyers.length) &&
                (cancellationPeriods.length == amounts.length),
                "StashBlox: all list must have same lengths and at least one element");

        for (uint256 i = 0; i < offerIds.length; ++i)
            dealIds[i] = _onOfferAccepted(offerIds[i],
                                           buyers[i],
                                           amounts[i],
                                           cancellationPeriods[i]);

        return dealIds;
    }

    function confirmDeals(uint256[] calldata dealIds) external {
        for (uint256 i = 0; i < dealIds.length; ++i) _confirmDeal(dealIds[i]);
    }

    function onPaymentsCancelled(uint256[] calldata dealIds) external {
        for (uint256 i = 0; i < dealIds.length; ++i) _onPaymentCancelled(dealIds[i]);
    }

    function _escrowToken(uint256 id, address from, uint256 amount) internal {
        _moveTokens(from, ESCROW_ADDRESS, id, amount);
    }

    function _unescrowToken(uint256 id, address to, uint256 amount) internal {
        _moveTokens(ESCROW_ADDRESS, to, id, amount);
    }

    function _getOfferId() internal returns (uint) {
        return _offerId++;
    }

    function _getDealId() internal returns (uint) {
        return _dealId++;
    }

    function _isValidCurrency(uint256) internal pure returns (bool) {
        return true;
    }

    function _openOffer(uint256 tokenId,
                        address from,
                        uint256 amount,
                        uint256 price, // by unit of id
                        uint256 priceCurrency,
                        bool acceptPartial,
                        address paymentOfficer,
                        address[] memory authorizedBuyers) internal returns (uint256) {

        require(_supplies[tokenId] > 0, "StashBlox: Unknown Token");
        require(_balances[tokenId][msg.sender] >= amount, "StashBlox: Insufficient balance");
        require(_isValidCurrency(priceCurrency), "StashBlox: Invalid currency");
        require(price > 0, "StashBlox: Invalid price");

        uint256 newOfferId = _getOfferId();

        Offer memory newOffer;
        newOffer.id = newOfferId;
        newOffer.tokenId = tokenId;
        newOffer.from = from;
        newOffer.amount = amount;
        newOffer.priceCurrency = priceCurrency;
        newOffer.price = price;
        newOffer.acceptPartial = acceptPartial;
        newOffer.paymentOfficer = paymentOfficer;
        newOffer.open = true;

        _offers[newOfferId] = newOffer;
        for (uint256 i = 0; i < authorizedBuyers.length; ++i) {
            _offers[newOfferId].authorizedBuyers[address(authorizedBuyers[i])] = true;
            _offers[newOfferId].authorizedBuyersLength++;
        }

        //_balances[tokenId][msg.sender] = _balances[tokenId][msg.sender] - amount;
        _escrowToken(tokenId, msg.sender, amount);

        emit OfferOpened(newOfferId, tokenId, from, amount, priceCurrency, price);

        return newOfferId;
    }

    function _cancelOffer(uint256 offerId) internal {
        Offer memory offer = _offers[offerId];

        require(offer.id == offerId, "StashBlox: Unknown Offer");
        require(offer.open && !offer.canceled, "StashBlox: Offer closed or cancelled");
        require(msg.sender == offer.from, "StashBlox: Unauthorized");

        _offers[offerId].canceled = true;
        _offers[offerId].open = false;

        uint256 remainingBalance = offer.amount - offer.pendingAmount - offer.paidAmount;
        //_balances[offer.tokenId][msg.sender] = _balances[offer.tokenId][msg.sender] + remainingBalance;
        _unescrowToken(offer.tokenId, msg.sender, remainingBalance);

        emit OfferCancelled(offerId);
    }

    function _onOfferAccepted(uint256 offerId,
                              address buyer,
                              uint256 amount,
                              uint256 cancellationPeriod) internal returns (uint256) {

        Offer memory offer = _offers[offerId];

        require(offer.id == offerId, "StashBlox: Unknown Offer");
        require(offer.open, "StashBlox: Offer closed");
        require(msg.sender == offer.paymentOfficer, "StashBlox: Unauthorized");
        if (offer.authorizedBuyersLength > 0) {
            require(_offers[offerId].authorizedBuyers[buyer], "StashBlox: Unauthorized");
        }
        if (offer.acceptPartial) require(amount <= offer.amount - offer.pendingAmount, "StashBlox: invalid amount");
        else require(amount == offer.amount, "StashBlox: invalid amount");

        _offers[offerId].pendingAmount = _offers[offerId].pendingAmount + amount;

        uint256 newDealId = _getDealId();
        uint256 endCancellationPeriod = now + cancellationPeriod;
        bool confirmed = (now >= endCancellationPeriod);

        Deal memory newDeal;
        newDeal.id = newDealId;
        newDeal.offerId = offerId;
        newDeal.buyer = buyer;
        newDeal.amount = amount;
        newDeal.endCancellationPeriod = endCancellationPeriod;
        newDeal.confirmed = confirmed;
        _deals[newDealId] = newDeal;

        _offers[offerId].pendingAmount = _offers[offerId].pendingAmount + amount;

        emit OfferAccepted(offerId, newDealId, buyer, amount, endCancellationPeriod);

        if (confirmed) {
            //_balances[offer.tokenId][buyer] = _balances[offer.tokenId][buyer] + amount;
            _unescrowToken(offer.tokenId, buyer, amount);
            _offers[offerId].paidAmount = _offers[offerId].paidAmount + amount;
            emit DealConfirmed(newDealId);
        }

        if (_offers[offerId].paidAmount == _offers[offerId].amount) {
            _offers[offerId].open = false;
        }

        return newDealId;
    }

    // if cancellation period everyone could call this function
    function _confirmDeal(uint256 dealId) internal {
        Deal memory deal = _deals[dealId];

        require(deal.id == dealId, "StashBlox: Unknown Deal");
        require(!deal.confirmed && !deal.canceled, "StashBlox: Deal already confirmed or canceled");
        require(now >= deal.endCancellationPeriod, "StashBlox: Too soon");

        Offer memory offer = _offers[deal.offerId];

        _deals[dealId].confirmed = true;
        //_balances[offer.tokenId][deal.buyer] = _balances[offer.tokenId][deal.buyer] + deal.amount;
        _unescrowToken(offer.tokenId, deal.buyer, deal.amount);
        _offers[offer.id].paidAmount = _offers[offer.id].paidAmount + deal.amount;
        _offers[offer.id].pendingAmount = _offers[offer.id].pendingAmount - deal.amount;

        emit DealConfirmed(dealId);

        if (_offers[offer.id].paidAmount == _offers[offer.id].amount) {
            _offers[offer.id].open = false;
        }
    }

    function _onPaymentCancelled(uint256 dealId) internal {
        Deal memory deal = _deals[dealId];

        require(deal.id == dealId, "StashBlox: Unknown Deal");
        require(!deal.confirmed, "StashBlox: Deal already confirmed");
        require(now < deal.endCancellationPeriod, "StashBlox: Too late");

        Offer memory offer = _offers[deal.offerId];

        require(msg.sender == offer.paymentOfficer, "StashBlox: Unauthorized");

        _deals[dealId].canceled = true;
        _offers[offer.id].pendingAmount = _offers[offer.id].pendingAmount - deal.amount;

        emit DealCancelled(dealId);

        if (_offers[offer.id].canceled) {
            //_balances[offer.tokenId][offer.from] = _balances[offer.tokenId][offer.from] + deal.amount;
            _unescrowToken(offer.tokenId, offer.from, deal.amount);
        } else {
            _offers[offer.id].open = true;
        }
    }


}
