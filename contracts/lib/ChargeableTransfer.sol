// SPDX-License-Identifier: GPL-3.0-or-later
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
        return block.timestamp.sub(_holders[id][account].birthday);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _registerNewHolder(address account, uint256 id) internal {
        if (!_holders[id][account].isHolder) {
            _tokenList[account].push(id);
            _holderList[id].push(account);
            _holders[id][account].isHolder = true;
        }
    }

    function _updateBirthday(address account, uint256 id, uint256 newBalance) internal {
        uint256 currentBalance = _holders[id][account].balance ;
        if (currentBalance == 0) {
            // first tokens no need to calculate avarage age
            _holders[id][account].birthday = block.timestamp;
        } else {
            // now - [((now - birthday) * B1) / B2]
            _holders[id][account].birthday = block.timestamp.sub(
                (currentBalance.mul(averageAge(account, id))).div(newBalance)
            );
        }
    }

    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address account, uint256 id, uint256 value) internal virtual {
        uint256 newBalance = _holders[id][account].balance.add(value);
        _registerNewHolder(account, id);
        _updateBirthday(account, id, newBalance);
        _holders[id][account].balance = newBalance;
    }

    function _storageCost(address account, uint256 id, uint256 value) internal view returns (uint256) {
        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;
        // pay storage for a full token
        uint256 paidValue = value < 10**_tokens[id].decimals ? 10**_tokens[id].decimals : value;

        for (uint i = _storageFees[id].length - 1; i >= 0; i--) {

            uint256 costStartAt = _storageFees[id][i][0];
            uint256 cost = _storageFees[id][i][1];
            uint256 storageDays;

            if (_holders[id][account].birthday >= costStartAt) {
                storageDays = (timeCursor.sub(_holders[id][account].birthday)).div(86400);
                if (storageDays == 0) storageDays = 1; // TODO: test this case!
                totalCost += (storageDays.mul(cost)).mul(paidValue);
                break;
            } else {
                storageDays = (timeCursor.sub(costStartAt)).div(86400);
                if (storageDays == 0) storageDays = 1;
                timeCursor = costStartAt;
                totalCost += (storageDays.mul(cost)).mul(paidValue);
            }
        }
        // TODO!
        totalCost = totalCost.div(10**_tokens[id].decimals); // storage cost are for one full token

        return totalCost;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        // calculate cost proportional to time and value
        uint256 storageFees = _storageCost(account, id, value);
        // calculate cost proportional to value only
        uint256 standardFees = (value.mul(_tokens[id].standardFees)).div(10**8);
        // add them to lump sum cost
        return _tokens[id].lumpSumFees.add(storageFees).add(standardFees);
    }

    function _payFees(uint256 id, address operator, uint256 fees) internal {

        if (_tokens[id].feesUnitType == 2) { // erc1155
            // remove fees from operator balance
            _externalBalances[operator][_tokens[id].feesUnitAddress][_tokens[id].feesUnitId] =
                _externalBalances[operator][_tokens[id].feesUnitAddress][_tokens[id].feesUnitId].sub(fees, "Insufficient erc1155 tokens");
            // distribute fees to beneficiary
            _externalBalances[_tokens[id].feesRecipient][_tokens[id].feesUnitAddress][_tokens[id].feesUnitId] += fees;
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
        _holders[id][from].balance = _holders[id][from].balance.sub(value, "Insufficient balance");
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
