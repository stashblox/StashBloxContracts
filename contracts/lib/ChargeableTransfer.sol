// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

import "../utils/SafeMath.sol";
import "./GSNCapable.sol";

contract ChargeableTransfer is GSNCapable {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to get the transaction price to transfer tokens.
     * @param account the address from where to transfer the tokens
     * @param id The token ID
     * @param value The amount to transfer
     * @return transfer price
     */
    function transactionFees(address account, uint256 id, uint256 value) public view returns (uint256) {
        return _transactionFees(account, id, value);
    }

    /**
     * @dev Function to get the average age of the token hold by the given address.
     * @param account the address from where to transfer the tokens
     * @param id The token ID
     * @return average age in seconds
     */
    function averageAge(address account, uint256 id) public view returns (uint256) {
        return block.timestamp.sub(_accounts[account].tokens[id].birthday);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _registerNewHolder(address account, uint256 id) internal {
        if (_accounts[account].tokens[id].birthday == 0) {
            _accounts[account].tokenList.push(id);
            _tokens[id].holderList.push(account);
        }
    }

    function _updateBirthday(address account, uint256 id, uint256 newBalance) internal {
        uint256 currentBalance = _accounts[account].tokens[id].balance;
        if (currentBalance == 0) {
            // first tokens no need to calculate avarage age
            _accounts[account].tokens[id].birthday = block.timestamp;
        } else {
            // now - [((now - birthday) * B1) / B2]
            _accounts[account].tokens[id].birthday = block.timestamp.sub(
                (currentBalance.mul(averageAge(account, id))).div(newBalance)
            );
        }
    }

    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address account, uint256 id, uint256 value) internal virtual {
        require(!_tokens[id].isPrivate || _accounts[account].tokens[id].isApproved, "Account not approved");
        uint256 newBalance = _accounts[account].tokens[id].balance.add(value);
        _registerNewHolder(account, id);
        _updateBirthday(account, id, newBalance);
        _accounts[account].tokens[id].balance = newBalance;
    }

    function _ceilDiv(uint256 a, uint256 m) internal pure returns (uint ) {
        return (a + m - 1) / m;
    }

    function _demurrageCost(address account, uint256 id, uint256 value) internal view returns (uint256) {
        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;
        // pay demurrage for a full token
        uint256 paidValue = _tokens[id].decimals != 0 ? _ceilDiv(value, 10**_tokens[id].decimals) : value;

        for (uint i = _demurrageFees[id].length - 1; i >= 0; i--) {

            uint256 costStartAt = _demurrageFees[id][i].startAt;
            uint256 demurrageDays;

            if (_accounts[account].tokens[id].birthday >= costStartAt) {

                demurrageDays = (timeCursor.sub(_accounts[account].tokens[id].birthday)).div(86400);

                if (demurrageDays == 0) demurrageDays = 1; // TODO: test this case!
                totalCost += (demurrageDays.mul(_demurrageFees[id][i].price)).mul(paidValue);

                break;

            } else {

                demurrageDays = (timeCursor.sub(costStartAt)).div(86400);
                timeCursor = costStartAt;

                if (demurrageDays == 0) demurrageDays = 1;
                totalCost += (demurrageDays.mul(_demurrageFees[id][i].price)).mul(paidValue);

            }
        }

        return totalCost;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        // calculate cost proportional to time and value
        uint256 demurrageFees = _demurrageCost(account, id, value);
        // calculate cost proportional to value only
        uint256 standardFees = (value.mul(_tokens[id].standardFees)).div(10**8);
        // add them to lump sum cost
        return _tokens[id].lumpSumFees.add(demurrageFees).add(standardFees);
    }

    function _payFees(uint256 id, address operator, uint256 fees) internal {

        if (_tokens[id].feesUnitType == 2) { // erc1155
            // remove fees from operator balance
            _accounts[operator].externalBalances[_tokens[id].feesUnitAddress][_tokens[id].feesUnitId] =
                _accounts[operator].externalBalances[_tokens[id].feesUnitAddress][_tokens[id].feesUnitId].sub(fees, "Insufficient erc1155 tokens");
            // distribute fees to beneficiary
            _accounts[_tokens[id].feesRecipient].externalBalances[_tokens[id].feesUnitAddress][_tokens[id].feesUnitId] += fees;
        } else { // eth
            // remove fees from operator balance
            _accounts[operator].ethBalance = _accounts[operator].ethBalance.sub(fees, "Insufficient ETH");
            // distribute fees to beneficiary
            _accounts[_tokens[id].feesRecipient].ethBalance += fees;
        }

    }

    // Used by ERC1155 implementation in safeTransferFrom
    function _moveTokens(address operator, address from, address to, uint256 id, uint256 value) internal virtual returns (uint256 fees) {
        // remove tokens from sender balance
        _accounts[from].tokens[id].balance = _accounts[from].tokens[id].balance.sub(value, "Insufficient balance");
        // add tokens to receiver balance
        _addToBalance(to, id, value);
        // calculate StashBlox fees
        fees = _transactionFees(from, id, value);
        // pay fees
        _payFees(id, operator, fees);

        return fees;
    }

    // Used by ERC1155 implementation in safeTransferFromBatch
    function _moveTokensBatch(address operator, address from, address to, uint256[] memory ids, uint256[] memory values) internal {
        for (uint256 i = 0; i < ids.length; ++i) {
            _moveTokens(operator, from, to, ids[i], values[i]);
        }
    }
}
