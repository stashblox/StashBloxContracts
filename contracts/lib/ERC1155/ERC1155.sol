pragma solidity ^0.5.12;

import "./IERC1155.sol";
import "./IERC1155Receiver.sol";
import "../ERC165/IERC165.sol";
import "../utils/SafeMath.sol";
import "../utils/StringUtils.sol";
import "../utils/Address.sol";
import './ERC1155Lockable.sol';

/**
 * @title Standard ERC1155 token
 *
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 */
contract ERC1155 is IERC165, IERC1155, ERC1155Lockable, StringUtils
{
    bytes4 constant private INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;
    bytes4 constant private INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;

    using SafeMath for uint256;
    using Address for address;

    // Mapping from token ID to account balances
    mapping (uint256 => mapping(address => uint256)) _balances;

    // Mapping from token ID to account age
    mapping (uint256 => mapping(address => uint256)) _birthdays;

    // Mapping from token ID to list of tuple [timestamp, price]
    mapping (uint256 => uint256[2][]) internal _storagePricesHistory;

    // For each address a list of token IDs. Can contains zero balance.
    mapping (address => uint256[]) internal _tokensByAddress;
    // For each token a list of addresses. Can contains zero balance.
    mapping (uint256 => address[]) internal _addressesByToken;
    // Initialize to true on the first token received, never come back to false.
    mapping (uint256 => mapping(address => bool)) internal _isHolder;

    // Mapping from account to operator approvals
    mapping (address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @notice Query if a contract implements an interface
     * @param _interfaceID  The interface identifier, as specified in ERC-165
     * @return `true` if the contract implements `_interfaceID` and
     */
    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {
      if (_interfaceID == INTERFACE_SIGNATURE_ERC165 ||
          _interfaceID == INTERFACE_SIGNATURE_ERC1155) {
        return true;
      }
      return false;
    }

    /**
        @dev Get the specified address' balance for token with specified ID.

        Attempting to query the zero account for a balance will result in a revert.

        @param account The address of the token holder
        @param id ID of the token
        @return The account's balance of the token type requested
     */
    function balanceOf(address account, uint256 id) public view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _balances[id][account];
    }

    /**
        @dev Get the balance of multiple account/token pairs.

        If any of the query accounts is the zero account, this query will revert.

        @param accounts The addresses of the token holders
        @param ids IDs of the tokens
        @return Balances for each account and token id pair
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    )
        public
        view
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "ERC1155: accounts and IDs must have same lengths");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            require(accounts[i] != address(0), "ERC1155: some address in batch balance query is zero");
            batchBalances[i] = _balances[ids[i]][accounts[i]];
        }

        return batchBalances;
    }

    /**
     * @dev Sets or unsets the approval of a given operator.
     *
     * An operator is allowed to transfer all tokens of the sender on their behalf.
     *
     * Because an account already has operator privileges for itself, this function will revert
     * if the account attempts to set the approval status for itself.
     *
     * @param operator address to set the approval
     * @param approved representing the status of the approval to be set
     */
    function setApprovalForAll(address operator, bool approved) external {
        require(msg.sender != operator, "ERC1155: cannot set approval status for self");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /**
        @notice Queries the approval status of an operator for a given account.
        @param account   The account of the Tokens
        @param operator  Address of authorized operator
        @return           True if the operator is approved, false if not
    */
    function isApprovedForAll(address account, address operator) public view returns (bool) {
        return _operatorApprovals[account][operator];
    }

    /**
        @dev Transfers `value` amount of an `id` from the `from` address to the `to` address specified.
        Caller must be approved to manage the tokens being transferred out of the `from` account.
        If `to` is a smart contract, will call `onERC1155Received` on `to` and act appropriately.
        @param from Source address
        @param to Target address
        @param id ID of the token type
        @param value Transfer amount
        @param data Data forwarded to `onERC1155Received` if `to` is a contract receiver
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external payable
    {
        require(to != address(0), "ERC1155: target address must be non-zero");
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender) == true,
            "ERC1155: need operator approval for 3rd party transfers"
        );

        uint256 feesBalance = msg.value;
        feesBalance = feesBalance - _moveTokens(from, to, id, value, feesBalance);
        if (feesBalance > 0) msg.sender.transfer(feesBalance);

        emit TransferSingle(msg.sender, from, to, id, value);

        _doSafeTransferAcceptanceCheck(msg.sender, from, to, id, value, data);
    }

    /**
        @dev Transfers `values` amount(s) of `ids` from the `from` address to the
        `to` address specified. Caller must be approved to manage the tokens being
        transferred out of the `from` account. If `to` is a smart contract, will
        call `onERC1155BatchReceived` on `to` and act appropriately.
        @param from Source address
        @param to Target address
        @param ids IDs of each token type
        @param values Transfer amounts per token type
        @param data Data forwarded to `onERC1155Received` if `to` is a contract receiver
    */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )
        external payable
    {
        require(ids.length == values.length, "ERC1155: IDs and values must have same lengths");
        require(to != address(0), "ERC1155: target address must be non-zero");
        require(
          from == msg.sender || isApprovedForAll(from, msg.sender) == true,
          "ERC1155: need operator approval for 3rd party transfers"
        );

        uint256 feesBalance = msg.value;
        for (uint256 i = 0; i < ids.length; ++i) {
          feesBalance = feesBalance - _moveTokens(from, to, ids[i], values[i], feesBalance);
        }
        if (feesBalance > 0) msg.sender.transfer(feesBalance);

        emit TransferBatch(msg.sender, from, to, ids, values);

        _doSafeBatchTransferAcceptanceCheck(msg.sender, from, to, ids, values, data);
    }

    function _moveTokens(address from, address to, uint256 id, uint256 value, uint256 feesBalance) internal returns (uint256 fees) {
        require(!_isLockedMove(from, to, id, value), "Locked");

        fees = _storageFees(from, id, value);
        require(feesBalance >= fees, "ERC1155: insufficient ETH for transfer fees");

        _balances[id][from] = _balances[id][from].sub(value, "ERC1155: insufficient balance for transfer");

        uint256 newBalanceTo = _balances[id][to].add(value);

        if (_balances[id][to] == 0) {

          if (!_isHolder[id][to]) {
            _tokensByAddress[to].push(id);
            _addressesByToken[id].push(to);
            _isHolder[id][to];
          }

          _birthdays[id][to] = block.timestamp;

        } else {
          // calculate the average birthday of the received and hold tokens
          uint256 oldTokensAge = block.timestamp.sub(_birthdays[id][to]);
          uint256 newTokenAge = (_balances[id][to].mul(oldTokensAge)).div(newBalanceTo);

          _birthdays[id][to] = block.timestamp - newTokenAge;
        }

        _balances[id][to] = newBalanceTo;

        return fees;
    }

    function birthdayOf(address account, uint256 id) public view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _birthdays[id][account];
    }

    function _storageFees(address account, uint256 id, uint256 value) internal view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");

        uint256 totalPrice = 0;
        uint256 timeCursor = block.timestamp;

        for (uint i = _storagePricesHistory[id].length - 1; i >= 0; i--) {

          uint256 priceStartAt = _storagePricesHistory[id][i][0];
          uint256 price = _storagePricesHistory[id][i][1];
          uint256 storageMinutes;

          if (_birthdays[id][account] >= priceStartAt) {
            storageMinutes = (timeCursor - _birthdays[id][account]) / 60;
            totalPrice += storageMinutes * price * value;
            break;
          } else {
            storageMinutes = (timeCursor - priceStartAt) / 60;
            timeCursor = priceStartAt;
            totalPrice += storageMinutes * price * value;
          }
        }

        return totalPrice;
    }

    function storageFees(address account, uint256 id, uint256 value) public view returns (uint256) {
        return _storageFees(account, id, value);
    }

    function tokensByAddress(address account) public view returns (string memory result) {
        require(account != address(0), "ERC1155: balance query for the zero address");

        for (uint i = 0; i < _tokensByAddress[account].length; i++) {
            uint256 id = _tokensByAddress[account][i];
            if (_balances[id][account] > 0) {
              if (bytes(result).length > 0) {
                result = _strConcat(result, " ");
                result = _strConcat(result, _toHexString(id));
              } else {
                result = _toHexString(id);
              }
            }
        }
        return result;
    }

    function addressesByToken(uint256 id) public view returns (string memory result) {

        for (uint i = 0; i < _addressesByToken[id].length; i++) {
            address account = _addressesByToken[id][i];
            if (_balances[id][account] > 0) {
              if (bytes(result).length > 0) {
                result = _strConcat(result, " ");
                result = _strConcat(result, _toHexString(uint256(account)));
              } else {
                result = _toHexString(uint256(account));
              }
            }
        }
        return result;
    }



    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    )
        internal
    {
        if(to.isContract()) {
            require(
                IERC1155Receiver(to).onERC1155Received(operator, from, id, value, data) ==
                    IERC1155Receiver(to).onERC1155Received.selector,
                "ERC1155: got unknown value from onERC1155Received"
            );
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    )
        internal
    {
        if(to.isContract()) {
            require(
                IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, values, data) ==
                    IERC1155Receiver(to).onERC1155BatchReceived.selector,
                "ERC1155: got unknown value from onERC1155BatchReceived"
            );
        }
    }
}
