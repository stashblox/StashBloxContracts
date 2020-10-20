// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

import "../utils/SafeMath.sol";
import './StashBloxData.sol';

contract ChargeableTransfer is StashBloxData {

    using SafeMath for uint256;


    /****************************
    EXTERNAL FUNCTIONS
    *****************************/


    /**
     * @dev Function to get the transaction price to transfer tokens.
     * @param account the address from where to transfer the tokens
     * @param id The token ID
     * @param value The amount to transfer
     */
    function transactionFees(address account, uint256 id, uint256 value) public view returns (uint256) {
        return _transactionFees(account, id, value);
    }


    /****************************
    INTERNAL FUNCTIONS
    *****************************/


    // update balance, lists of holders and token average age of the recipient
    function _addToBalance(address recipient, uint256 id, uint256 value) internal virtual {
        uint256 newBalance = _tokens[id].holders[recipient].balance.add(value);

        if (_tokens[id].holders[recipient].balance == 0) {

            if (!_tokens[id].holders[recipient].isHolder) {
                _users[recipient].tokens.push(id);
                _tokens[id].holderList.push(recipient);
                _tokens[id].holders[recipient].isHolder;
            }

            _tokens[id].holders[recipient].birthday = block.timestamp;

        } else {

            // calculate the average birthday of the received and hold tokens
            uint256 oldTokensAge = block.timestamp.sub(_tokens[id].holders[recipient].birthday);
            uint256 newTokenAge = (_tokens[id].holders[recipient].balance.mul(oldTokensAge)).div(newBalance);

            _tokens[id].holders[recipient].birthday = block.timestamp - newTokenAge;
        }

        _tokens[id].holders[recipient].balance = newBalance;
    }

    // Calculate transaction fees
    function _transactionFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        uint256 totalCost = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _tokens[id].storageCostHistory.length - 1; i >= 0; i--) {

            uint256 costStartAt = _tokens[id].storageCostHistory[i][0];
            uint256 cost = _tokens[id].storageCostHistory[i][1];
            uint256 storageDays;

            if (_tokens[id].holders[account].birthday >= costStartAt) {
                storageDays = (timeCursor.sub(_tokens[id].holders[account].birthday)).div(86400);
                if (storageDays == 0) storageDays = 1;
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

        uint256 valueFees = (value.mul(_tokens[id].valueTransactionFees)).div(10**8);

        return totalCost.add(_tokens[id].lumpSumTransactionFees.add(valueFees));
    }

    // Used by ERC1155.sol in safeTransferFrom and safeTransferFromBatch functions
    function _moveTokens(address from, address to, uint256 id, uint256 value, uint256 feesBalance) internal virtual returns (uint256 fees) {
        fees = _transactionFees(from, id, value);
        require(feesBalance >= fees, "Insufficient ETH for fees");

        _tokens[id].holders[from].balance = _tokens[id].holders[from].balance.sub(value, "Insufficient balance");

        _addToBalance(to, id, value);

        for (uint256 i = 0; i < _tokens[id].feesRecipients.length; ++i) {
            address feesRecipient = _tokens[id].feesRecipients[i];
            uint256 feesRecipientsPercentage = _tokens[id].feesRecipientsPercentage[i];
            _users[feesRecipient].ETHBalance += (fees.mul(feesRecipientsPercentage)).div(10000);
        }

        return fees;
    }

}
