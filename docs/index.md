[TOC]


## StashBlox


#### authorizeTokenizer
`authorizeTokenizer(address tokenizer) (external)`


Function to authorize an address to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address


#### revokeTokenizer
`revokeTokenizer(address tokenizer) (external)`


Function to revoke the authorization to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address


#### isTokenizer
`isTokenizer(address tokenizer) → bool (external)`


Function to check if an address is authorized to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address


#### authorizeMaintener
`authorizeMaintener(uint256 id, address maintener) (external)`


Function to authorize an address to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address


#### revokeMaintener
`revokeMaintener(uint256 id, address maintener) (external)`


Function to revoke the authorization to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address


#### isMaintener
`isMaintener(uint256 id, address maintener) → bool (external)`


Function to check if an address is authorized to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address


#### lockToken
`lockToken(uint256 id) (external)`


Function to lock a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID


#### unlockToken
`unlockToken(uint256 id) (external)`


Function to unlock a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID


#### isLockedToken
`isLockedToken(uint256 id) → bool (external)`


Function to check if a token is locked.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID


#### lockAddress
`lockAddress(address addr) (external)`


Function to lock an address.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to lock


#### unlockAddress
`unlockAddress(address addr) (external)`


Function to unlock an address.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to unlock


#### isLockedAddress
`isLockedAddress(address addr) → bool (external)`


Function to check if an address is lockec.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to check


#### createToken
`createToken(address recipient, uint256 id, uint256 supply, uint256 metadataHash, uint256[3] transactionFees, address[] feesRecipients, uint256[] feesRecipientsPercentage, uint256 minHoldingForCallback) (external)`


Function to mint an amount of a token with the given ID.


Name  | Type | Description
------------- | ------------- | -------------
recipient  | address | The address that will own the minted tokens
id  | uint256 | ID of the token to be minted
supply  | uint256 | Amount of the token to be minted
metadataHash  | uint256 | Metadata file hash
transactionFees  | uint256[3] | transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]
feesRecipients  | address[] | list of addresses receiving transfer fees
feesRecipientsPercentage  | uint256[] | list of percentage, each one for the corresponding feesRecipients
minHoldingForCallback  | uint256 | minimum holding to propose a callback


#### createTokens
`createTokens(uint256 templateID, uint256[] ids, uint256[] metadataHashes) (external)`


Function to mint tokens.


Name  | Type | Description
------------- | ------------- | -------------
templateID  | uint256 | Identifier of the template
ids  | uint256[] | list of IDs of the tokens to be minted
metadataHashes  | uint256[] | list of metadata file hashes


#### setTokenTemplate
`setTokenTemplate(uint256 templateID, address recipient, uint256 supply, uint256[3] transactionFees, address[] feesRecipients, uint256[] feesRecipientsPercentage, uint256 minHoldingForCallback) (external)`


Function to create or update a token template for batch creation.


Name  | Type | Description
------------- | ------------- | -------------
templateID  | uint256 | Identifier of the template
recipient  | address | The address that will own the minted tokens
supply  | uint256 | Amount of the token to be minted
transactionFees  | uint256[3] | transaction fees
feesRecipients  | address[] | list of addresses receiving transfer fees
feesRecipientsPercentage  | uint256[] | list of percentage, each one for the corresponding feesRecipients
minHoldingForCallback  | uint256 | minimum holding to propose a callback


#### updateMetadataHash
`updateMetadataHash(uint256 id, uint256 metadataHash) (external)`


Function to update the metadata hash of a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
metadataHash  | uint256 | The new metadata hash


#### updateTransactionFees
`updateTransactionFees(uint256 id, uint256[3] newFees) (external)`


Function to update transaction fees.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newFees  | uint256[3] | The new transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]


#### updateFeesRecipients
`updateFeesRecipients(uint256 id, address[] newFeesRecipients, uint256[] newFeesRecipientsPercentage) (external)`


Function to update the minimum holding to propose a callback.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newFeesRecipients  | address[] | list of addresses receiving transfer fees
newFeesRecipientsPercentage  | uint256[] | list of percentage, each one for the corresponding feesRecipients


#### updateMinHoldingForCallback
`updateMinHoldingForCallback(uint256 id, uint256 newMinHoldingForCallback) (external)`


Function to update the minimum holding to propose a callback.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newMinHoldingForCallback  | uint256 | The new minimum holding


#### updateStorageCreditPrice
`updateStorageCreditPrice(uint256 newPrice) (external)`


Function to update the price of one "storage credit".


Name  | Type | Description
------------- | ------------- | -------------
newPrice  | uint256 | The new price


#### transactionFees
`transactionFees(address account, uint256 id, uint256 value) → uint256 (public)`


Function to get the transaction price to transfer tokens.


Name  | Type | Description
------------- | ------------- | -------------
account  | address | the address from where to transfer the tokens
id  | uint256 | The token ID
value  | uint256 | The amount to transfer


#### proposeCallback
`proposeCallback(uint256 id, uint256 price) (external)`


Propose to buy the whole supply of a token.
The proposer must hold minHoldingForCallback% of the total supply.
StashBlox must approve the price with acceptCallback();


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
price  | uint256 | proposed price


#### refuseCallback
`refuseCallback(uint256 id, address proposer) (external)`


Refuse a callback if the price is not enough.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
proposer  | address | address of the proposer


#### acceptCallback
`acceptCallback(uint256 id, address proposer) (external)`


Accept a callback


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
proposer  | address | address of the proposer


#### withdraw
`withdraw(address to, uint256 amount) (external)`


Function to withdraw ETH from the contract.


Name  | Type | Description
------------- | ------------- | -------------
to  | address | recipent address
amount  | uint256 | amount to withdraw


#### totalSupply
`totalSupply(uint256 id) → uint256 (external)`


Function to get token supply


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID



#### tokensByAddress
`tokensByAddress(address account) → string result (public)`


Function to get the list of token hold by an address


Name  | Type | Description
------------- | ------------- | -------------
account  | address | holder address



#### addressesByToken
`addressesByToken(uint256 id) → string result (public)`


Function to get the list of token hold by an address


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID







## StashBloxBase








#### CallbackProposed
`event CallbackProposed(uint256 _id, address _proposer, uint256 _price)`




Name  | Type | Description
------------- | ------------- | -------------
_id  | uint256 | _proposer  | address | _price  | uint256 |

#### CallbackRefused
`event CallbackRefused(uint256 _id, address _proposer, uint256 _price)`




Name  | Type | Description
------------- | ------------- | -------------
_id  | uint256 | _proposer  | address | _price  | uint256 |

#### CallbackAccepted
`event CallbackAccepted(uint256 _id, address _proposer, uint256 _price)`




Name  | Type | Description
------------- | ------------- | -------------
_id  | uint256 | _proposer  | address | _price  | uint256 |

#### UpdateStorageCreditPrice
`event UpdateStorageCreditPrice(address _owner, uint256 _price)`




Name  | Type | Description
------------- | ------------- | -------------
_owner  | address | _price  | uint256 |

#### UpdateTransactionFees
`event UpdateTransactionFees(address _maintener, uint256 _id, uint256[3] _fees)`




Name  | Type | Description
------------- | ------------- | -------------
_maintener  | address | _id  | uint256 | _fees  | uint256[3] |



## ERC1155

Implementation of the basic standard multi-token.
See https://eips.ethereum.org/EIPS/eip-1155
Originally based on code by Enjin: https://github.com/enjin/erc-1155




#### balanceOf
`balanceOf(address account, uint256 id) → uint256 (public)`


Get the specified address' balance for token with specified ID.
Attempting to query the zero account for a balance will result in a revert.


Name  | Type | Description
------------- | ------------- | -------------
account  | address | The address of the token holder
id  | uint256 | ID of the token



#### balanceOfBatch
`balanceOfBatch(address[] accounts, uint256[] ids) → uint256[] (public)`


Get the balance of multiple account/token pairs.
If any of the query accounts is the zero account, this query will revert.


Name  | Type | Description
------------- | ------------- | -------------
accounts  | address[] | The addresses of the token holders
ids  | uint256[] | IDs of the tokens



#### setApprovalForAll
`setApprovalForAll(address operator, bool approved) (external)`


Sets or unsets the approval of a given operator.
An operator is allowed to transfer all tokens of the sender on their behalf.
Because an account already has operator privileges for itself, this function will revert
if the account attempts to set the approval status for itself.


Name  | Type | Description
------------- | ------------- | -------------
operator  | address | address to set the approval
approved  | bool | representing the status of the approval to be set


#### safeTransferFrom
`safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) (external)`


Transfers `value` amount of an `id` from the `from` address to the `to` address specified.
Caller must be approved to manage the tokens being transferred out of the `from` account.
If `to` is a smart contract, will call `onERC1155Received` on `to` and act appropriately.


Name  | Type | Description
------------- | ------------- | -------------
from  | address | Source address
to  | address | Target address
id  | uint256 | ID of the token type
value  | uint256 | Transfer amount
data  | bytes | Data forwarded to `onERC1155Received` if `to` is a contract receiver


#### safeBatchTransferFrom
`safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) (external)`


Transfers `values` amount(s) of `ids` from the `from` address to the
`to` address specified. Caller must be approved to manage the tokens being
transferred out of the `from` account. If `to` is a smart contract, will
call `onERC1155BatchReceived` on `to` and act appropriately.


Name  | Type | Description
------------- | ------------- | -------------
from  | address | Source address
to  | address | Target address
ids  | uint256[] | IDs of each token type
values  | uint256[] | Transfer amounts per token type
data  | bytes | Data forwarded to `onERC1155Received` if `to` is a contract receiver






## ERC1155Metadata








#### MetadataHashUpdated
`event MetadataHashUpdated(uint256 _id, uint256 _hash)`




Name  | Type | Description
------------- | ------------- | -------------
_id  | uint256 | _hash  | uint256 |



## IERC1155

See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md
Note: The ERC-165 identifier for this interface is 0xd9b67a26.




#### safeTransferFrom
`safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes _data) (external)`

Transfers `_value` amount of an `_id` from the `_from` address to the `_to` address specified (with safety call).

Caller must be approved to manage the tokens being transferred out of the `_from` account (see "Approval" section of the standard).
MUST revert if `_to` is the zero address.
MUST revert if balance of holder for token `_id` is lower than the `_value` sent.
MUST revert on any other error.
MUST emit the `TransferSingle` event to reflect the balance change (see "Safe Transfer Rules" section of the standard).
After the above conditions are met, this function MUST check if `_to` is a smart contract (e.g. code size > 0). If so, it MUST call `onERC1155Received` on `_to` and act appropriately (see "Safe Transfer Rules" section of the standard).


Name  | Type | Description
------------- | ------------- | -------------
_from  | address |    Source address
_to  | address |      Target address
_id  | uint256 |      ID of the token type
_value  | uint256 |   Transfer amount
_data  | bytes |    Additional data with no specified format, MUST be sent unaltered in call to `onERC1155Received` on `_to`


#### safeBatchTransferFrom
`safeBatchTransferFrom(address _from, address _to, uint256[] _ids, uint256[] _values, bytes _data) (external)`

Transfers `_values` amount(s) of `_ids` from the `_from` address to the `_to` address specified (with safety call).

Caller must be approved to manage the tokens being transferred out of the `_from` account (see "Approval" section of the standard).
MUST revert if `_to` is the zero address.
MUST revert if length of `_ids` is not the same as length of `_values`.
MUST revert if any of the balance(s) of the holder(s) for token(s) in `_ids` is lower than the respective amount(s) in `_values` sent to the recipient.
MUST revert on any other error.
MUST emit `TransferSingle` or `TransferBatch` event(s) such that all the balance changes are reflected (see "Safe Transfer Rules" section of the standard).
Balance changes and events MUST follow the ordering of the arrays (_ids[0]/_values[0] before _ids[1]/_values[1], etc).
After the above conditions for the transfer(s) in the batch are met, this function MUST check if `_to` is a smart contract (e.g. code size > 0). If so, it MUST call the relevant `ERC1155TokenReceiver` hook(s) on `_to` and act appropriately (see "Safe Transfer Rules" section of the standard).


Name  | Type | Description
------------- | ------------- | -------------
_from  | address |    Source address
_to  | address |      Target address
_ids  | uint256[] |     IDs of each token type (order and length must match _values array)
_values  | uint256[] |  Transfer amounts per token type (order and length must match _ids array)
_data  | bytes |    Additional data with no specified format, MUST be sent unaltered in call to the `ERC1155TokenReceiver` hook(s) on `_to`


#### setApprovalForAll
`setApprovalForAll(address _operator, bool _approved) (external)`

Enable or disable approval for a third party ("operator") to manage all of the caller's tokens.

MUST emit the ApprovalForAll event on success.


Name  | Type | Description
------------- | ------------- | -------------
_operator  | address |  Address to add to the set of authorized operators
_approved  | bool |  True if the operator is approved, false to revoke approval




#### TransferSingle
`event TransferSingle(address _operator, address _from, address _to, uint256 _id, uint256 _value)`


Either `TransferSingle` or `TransferBatch` MUST emit when tokens are transferred, including zero value transfers as well as minting or burning (see "Safe Transfer Rules" section of the standard).
The `_operator` argument MUST be msg.sender.
The `_from` argument MUST be the address of the holder whose balance is decreased.
The `_to` argument MUST be the address of the recipient whose balance is increased.
The `_id` argument MUST be the token type being transferred.
The `_value` argument MUST be the number of tokens the holder balance is decreased by and match what the recipient balance is increased by.
When minting/creating tokens, the `_from` argument MUST be set to `0x0` (i.e. zero address).
When burning/destroying tokens, the `_to` argument MUST be set to `0x0` (i.e. zero address).

Name  | Type | Description
------------- | ------------- | -------------
_operator  | address | _from  | address | _to  | address | _id  | uint256 | _value  | uint256 |

#### TransferBatch
`event TransferBatch(address _operator, address _from, address _to, uint256[] _ids, uint256[] _values)`


Either `TransferSingle` or `TransferBatch` MUST emit when tokens are transferred, including zero value transfers as well as minting or burning (see "Safe Transfer Rules" section of the standard).
The `_operator` argument MUST be msg.sender.
The `_from` argument MUST be the address of the holder whose balance is decreased.
The `_to` argument MUST be the address of the recipient whose balance is increased.
The `_ids` argument MUST be the list of tokens being transferred.
The `_values` argument MUST be the list of number of tokens (matching the list and order of tokens specified in _ids) the holder balance is decreased by and match what the recipient balance is increased by.
When minting/creating tokens, the `_from` argument MUST be set to `0x0` (i.e. zero address).
When burning/destroying tokens, the `_to` argument MUST be set to `0x0` (i.e. zero address).

Name  | Type | Description
------------- | ------------- | -------------
_operator  | address | _from  | address | _to  | address | _ids  | uint256[] | _values  | uint256[] |

#### ApprovalForAll
`event ApprovalForAll(address _owner, address _operator, bool _approved)`


MUST emit when approval for a second party/operator address to manage all tokens for an owner address is enabled or disabled (absense of an event assumes disabled).

Name  | Type | Description
------------- | ------------- | -------------
_owner  | address | _operator  | address | _approved  | bool |

#### URI
`event URI(string _value, uint256 _id)`


MUST emit when the URI is updated for a token ID.
URIs are defined in RFC 3986.
The URI MUST point a JSON file that conforms to the "ERC-1155 Metadata URI JSON Schema".

Name  | Type | Description
------------- | ------------- | -------------
_value  | string | _id  | uint256 |



## IERC1155Metadata
Note: The ERC-165 identifier for this interface is 0x0e89341c.





#### uri
`uri(uint256 _id) → string (external)`

A distinct Uniform Resource Identifier (URI) for a given token.

URIs are defined in RFC 3986.
The URI may point to a JSON file that conforms to the "ERC-1155 Metadata URI JSON Schema".


Name  | Type | Description
------------- | ------------- | -------------
_id  | uint256 |






## IERC1155Receiver

ERC-1155 interface for accepting safe transfers.




#### onERC1155Received
`onERC1155Received(address _operator, address _from, uint256 _id, uint256 _amount, bytes _data) → bytes4 (external)`

Handle the receipt of a single ERC1155 token type

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



#### onERC1155BatchReceived
`onERC1155BatchReceived(address _operator, address _from, uint256[] _ids, uint256[] _amounts, bytes _data) → bytes4 (external)`

Handle the receipt of multiple ERC1155 token types

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







## IERC165

https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md




#### supportsInterface
`supportsInterface(bytes4 _interfaceId) → bool (external)`

Query if a contract implements an interface

Interface identification is specified in ERC-165. This function
uses less than 30,000 gas.

Name  | Type | Description
------------- | ------------- | -------------
_interfaceId  | bytes4 | The interface identifier, as specified in ERC-165







## ERC173

Contract module which provides a basic access control mechanism, where
there is an account (an owner) that can be granted exclusive access to
specific functions.
This module is used through inheritance. It will make available the modifier
`onlyOwner`, which can be applied to your functions to restrict their use to
the owner.




#### constructor
`constructor() (public)`


Initializes the contract setting the deployer as the initial owner.



#### owner
`owner() → address (public)`


Returns the address of the current owner.



#### transferOwnership
`transferOwnership(address newOwner) (public)`


Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.

Name  | Type | Description
------------- | ------------- | -------------
newOwner  | address |


#### _transferOwnership
`_transferOwnership(address newOwner) (internal)`


Transfers ownership of the contract to a new account (`newOwner`).

Name  | Type | Description
------------- | ------------- | -------------
newOwner  | address |


#### _isOwner
`_isOwner() → bool (internal)`


Returns true if the caller is the current owner.







## IERC173

See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-173.md
Note: the ERC-165 identifier for this interface is 0x7f5828d0






#### OwnershipTransferred
`event OwnershipTransferred(address previousOwner, address newOwner)`


This emits when ownership of a contract changes.

Name  | Type | Description
------------- | ------------- | -------------
previousOwner  | address | newOwner  | address |
