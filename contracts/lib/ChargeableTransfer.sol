// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

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
        return block.timestamp.sub(_tokens[id].holders[account].birthday);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    function _registerNewHolder(address account, uint256 id) internal {
        if (!_tokens[id].holders[account].isHolder) {
            _accounts[account].tokens.push(id);
            _tokens[id].holderList.push(account);
            _tokens[id].holders[account].isHolder = true;
        }
    }

    function _updateBirthday(address account, uint256 id, uint256 newBalance) internal {
        uint256 currentBalance = _tokens[id].holders[account].balance ;
        if (currentBalance == 0) {
            // first tokens no need to calculate avarage age
            _tokens[id].holders[account].birthday = block.timestamp;
        } else {
            // now - [((now - birthday) * B1) / B2]
            _tokens[id].holders[account].birthday = block.timestamp.sub(
                (currentBalance.mul(averageAge(account, id))).div(newBalance)
            );
        }
    }

    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address account, uint256 id, uint256 value) internal virtual {
        uint256 newBalance = _tokens[id].holders[account].balance.add(value);
        _registerNewHolder(account, id);
        _updateBirthday(account, id, newBalance);
        _tokens[id].holders[account].balance = newBalance;
    }

    function _storageFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _tokens[id].storageFees.length - 1; i >= 0; i--) {

            uint256 costStartAt = _tokens[id].storageFees[i][0];
            uint256 cost = _tokens[id].storageFees[i][1];
            uint256 storageDays;

            if (_tokens[id].holders[account].birthday >= costStartAt) {
                storageDays = (timeCursor.sub(_tokens[id].holders[account].birthday)).div(86400);
                if (storageDays == 0) storageDays = 1; // TODO: test this case!
                totalCost += (storageDays.mul(cost)).mul(value);
                break;
            } else {
                storageDays = (timeCursor.sub(costStartAt)).div(86400);
                if (storageDays == 0) storageDays = 1;
                timeCursor = costStartAt;
                totalCost += (storageDays.mul(cost)).mul(value);
            }
        }
        // TODO!
        totalCost = totalCost.div(10**_tokens[id].decimals); // storage cost are for one full token

        return totalCost;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        // calculate cost proportional to time and value
        uint256 storageFees = _storageFees(account, id, value);
        // calculate cost proportional to value only
        uint256 standardFees = (value.mul(_tokens[id].standardFees)).div(10**8);
        // add them to lump sum cost
        return _tokens[id].lumpSumFees.add(storageFees).add(standardFees);
    }

    function _payFees(uint256 id, address operator, uint256 fees) internal {
        // remove fees from operator ETH balance
        _accounts[operator].ethBalance = _accounts[operator].ethBalance.sub(fees, "Insufficient ETH");
        // distribute fees to beneficiaries
        for (uint256 i = 0; i < _tokens[id].feesRecipients.length; ++i) {
            address feesRecipient = _tokens[id].feesRecipients[i];
            uint256 feesRecipientsPercentage = _tokens[id].feesRecipientsPercentage[i];
            _accounts[feesRecipient].ethBalance += (fees.mul(feesRecipientsPercentage)).div(10000);
        }
    }

    // Used by ERC1155 implementation in safeTransferFrom
    function _moveTokens(address operator, address from, address to, uint256 id, uint256 value) internal virtual returns (uint256 fees) {
        // remove tokens from sender balance
        _tokens[id].holders[from].balance = _tokens[id].holders[from].balance.sub(value, "Insufficient balance");
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
