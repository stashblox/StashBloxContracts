## IERC1155Receiver

ERC-1155 interface for accepting safe transfers.

### onERC1155Received `returns bytes4` `external`

An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated
This function MAY throw to revert and reject the transfer
Return of other amount than the magic value MUST result in the transaction being reverted
Note: The token contract address is always the message sender


Name  | Type | Description
------------- | ------------- | -------------
_operator  | address |  The address which called the `safeTransferFrom` function
_from  | address |      The address which previously owned the token
_id  | uint256 |        The id of the token being transferred
_amount  | uint256 |    The amount of tokens being transferred
_data  | bytes |      Additional data with no specified format


### onERC1155BatchReceived `returns bytes4` `external`

An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeBatchTransferFrom` after the balances have been updated
This function MAY throw to revert and reject the transfer
Return of other amount than the magic value WILL result in the transaction being reverted
Note: The token contract address is always the message sender


Name  | Type | Description
------------- | ------------- | -------------
_operator  | address |  The address which called the `safeBatchTransferFrom` function
_from  | address |      The address which previously owned the token
_ids  | uint256[] |       An array containing ids of each token being transferred
_amounts  | uint256[] |   An array containing amounts of each token being transferred
_data  | bytes |      Additional data with no specified format







