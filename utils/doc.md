# StashBlox

## A simulator for trees

You can use this contract for only the most basic simulation

All function calls are currently implemented without side effects

```
Author: Larry A. Gardner
Last update: 2020-10-31T23:23:57.589Z
Compiler: solc 0.7.1+commit.f4a555be.Emscripten.clang
```

## API

### special

#### constructor

#### receive

### event

#### AccountUpdated

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_account</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### ApprovalForAll

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_owner</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_operator</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_approved</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### CallbackUpdated

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_callbackId</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### ConfigUpdated

#### OwnershipTransferred

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>previousOwner</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>newOwner</td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
#### TokenUpdated
TokenUpdated when token is updated<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_id</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>_documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### TransferBatch

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_operator</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_from</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_to</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_ids</td>
  <td>uint256[]</td>
  <td>
  </td>
</tr><tr>
  <td>_values</td>
  <td>uint256[]</td>
  <td>
  </td>
</tr>
</table>
#### TransferSingle

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_operator</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_from</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_to</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>_id</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>_value</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### URI

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_value</td>
  <td>string</td>
  <td>
  </td>
</tr><tr>
  <td>_id</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
### view

#### _accounts

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>isTokenizer</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>isLocked</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>ethBalance</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### _callbacks

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>tokenId</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>price</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>escrowedAmount</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>callCounter</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>caller</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>needLegalApproval</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>approvedByLegal</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>refused</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>accepted</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>completed</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### _callees

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
#### _config

##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackAutoExecuteMaxAccounts</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>baseURI</td>
  <td>string</td>
  <td>
  </td>
</tr><tr>
  <td>versionRecipient</td>
  <td>string</td>
  <td>
  </td>
</tr><tr>
  <td>owner</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>gsnTrustedForwarder</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>proxyRegistryAccount</td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
#### _holderList

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
#### _holders

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>balance</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>birthday</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>isMaintener</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>isHolder</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>isApproved</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### _storageFees

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### _tokenList

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### _tokens
emitted when a token is updated.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>supply</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>decimals</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>lumpSumFees</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>standardFees</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>minHoldingForCallback</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>metadataHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>feesUnitType</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>feesUnitId</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>feesUnitAddress</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>feesRecipient</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>legalAuthority</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>isPrivate</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>locked</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### averageAge
Function to get the average age of the token hold by the given address.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  the address from where to transfer the tokens</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token ID</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  average age in seconds</td>
</tr>
</table>
#### balanceOf
Get the specified address' balance for token with specified ID. Attempting to query the zero account for a balance will result in a revert.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address of the token holder</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  ID of the token</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  The account&#39;s balance of the token type requested</td>
</tr>
</table>
#### balanceOfBatch
Get the balance of multiple account/token pairs. If any of the query accounts is the zero account, this query will revert.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>accounts</td>
  <td>address[]</td>
  <td>
  The addresses of the token holders</td>
</tr><tr>
  <td>ids</td>
  <td>uint256[]</td>
  <td>
  IDs of the tokens</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256[]</td>
  <td>
  Balances for each account and token id pair</td>
</tr>
</table>
#### isApprovedAccount
Function to check if an account is approved for a given token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token ID</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### isApprovedForAll
Queries the approval status of an operator for a given account.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The account of the Tokens</td>
</tr><tr>
  <td>operator</td>
  <td>address</td>
  <td>
  Address of authorized operator</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  True if the operator is approved, false if not</td>
</tr>
</table>
#### isLockedAccount
Function to check if an address is lockec.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address to check</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### isLockedToken
Function to check if a token is locked.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token ID</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### isMaintener
Function to check if an address is authorized to maintain a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  the token id</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  true if it&#34;s a maintener address</td>
</tr>
</table>
#### isTokenizer
Function to check if an address is authorized to create a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### isTrustedForwarder

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### owner
Returns the address of the current owner.<br />
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
#### transactionFees
Function to get the transaction price to transfer tokens.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  the address from where to transfer the tokens</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token ID</td>
</tr><tr>
  <td>value</td>
  <td>uint256</td>
  <td>
  The amount to transfer</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  transfer price</td>
</tr>
</table>
#### uri

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>string</td>
  <td>
  URI string</td>
</tr>
</table>
#### versionRecipient

##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>string</td>
  <td>
  </td>
</tr>
</table>
### nonpayable

#### acceptCallback
Accept a callback<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackId</td>
  <td>uint256</td>
  <td>
  callback proposition ID</td>
</tr>
</table>
#### approveCallback
Approve a callback<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackId</td>
  <td>uint256</td>
  <td>
  callback proposition ID</td>
</tr>
</table>
#### cloneToken
Function to mint tokens in batch.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Identifier of the template</td>
</tr><tr>
  <td>ids</td>
  <td>uint256[]</td>
  <td>
  list of IDs of the tokens to be minted</td>
</tr><tr>
  <td>metadataHashes</td>
  <td>uint256[]</td>
  <td>
  list of metadata file hashes</td>
</tr>
</table>
#### createToken
create token<br />Function to mint an amount of a token with the given ID. `params` must contains the following informations:<br/> <br />                          [0]: metadataHas<br />                          [1]: isPrivate<br />                          [2]: minHoldingForCallback<br />                          [3]: legalAuthority<br />                          [4]: standardFees<br />                          [5]: lumpSumFees<br />                          [6]: storageFees<br />                          [7]: feesUnitType<br />                          [8]: feesUnitAddress<br />                          [9]: feesUnitId<br />                         [10]: feesRecipient<br />                         [11]: decimals<br /> <br /><br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>recipient</td>
  <td>address</td>
  <td>
  The address that will own the minted tokens</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  ID of the token to be minted</td>
</tr><tr>
  <td>supply</td>
  <td>uint256</td>
  <td>
  Amount of the token to be minted</td>
</tr><tr>
  <td>params</td>
  <td>uint256[12]</td>
  <td>
  Token information</td>
</tr>
</table>
#### executeCallback
Accept a callback. Caller need to recall the function to continue the callback until completed.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackId</td>
  <td>uint256</td>
  <td>
  callback proposition ID</td>
</tr><tr>
  <td>maxCall</td>
  <td>uint256</td>
  <td>
  maximal call to excute</td>
</tr>
</table>
#### onERC1155BatchReceived

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>operator</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>from</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>ids</td>
  <td>uint256[]</td>
  <td>
  </td>
</tr><tr>
  <td>values</td>
  <td>uint256[]</td>
  <td>
  </td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bytes4</td>
  <td>
  </td>
</tr>
</table>
#### onERC1155Received

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>operator</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>from</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>value</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  </td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bytes4</td>
  <td>
  </td>
</tr>
</table>
#### refuseCallback
Refuse a callback if the price is not enough.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackId</td>
  <td>uint256</td>
  <td>
  callback proposition ID</td>
</tr>
</table>
#### setAccountApproval
Function to approve holder for a private token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  the token id</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr><tr>
  <td>isApproved</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### setAccountLock
Function to unlock an address.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address to unlock</td>
</tr><tr>
  <td>lock</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### setApprovalForAll
Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf. Because an account already has operator privileges for itself, this function will revert if the account attempts to set the approval status for itself.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>operator</td>
  <td>address</td>
  <td>
  address to set the approval</td>
</tr><tr>
  <td>approved</td>
  <td>bool</td>
  <td>
  representing the status of the approval to be set</td>
</tr>
</table>
#### setMaintenerAuthorization
Function to authorize an address to maintain a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr><tr>
  <td>isMaintener</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### setTokenLock
Function to unlock a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token ID</td>
</tr><tr>
  <td>lock</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### setTokenizerAuthorization
Function to authorize an address to create a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr><tr>
  <td>isTokenizer</td>
  <td>bool</td>
  <td>
  </td>
</tr>
</table>
#### transferOwnership
Transfers ownership of the contract to a new account (`newOwner`).<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  address of the new owner Can only be called by the current owner.</td>
</tr>
</table>
#### updateConfig
Function to update the contract configuration<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackAutoExecuteMaxAccounts</td>
  <td>uint256</td>
  <td>
  max holders to execute the callback on acceptation</td>
</tr><tr>
  <td>baseURI</td>
  <td>string</td>
  <td>
  base URI for the metadata URLs</td>
</tr><tr>
  <td>versionRecipient</td>
  <td>string</td>
  <td>
  version needed by GSN relay</td>
</tr><tr>
  <td>owner</td>
  <td>address</td>
  <td>
  ew owner of the contract</td>
</tr><tr>
  <td>gsnTrustedForwarder</td>
  <td>address</td>
  <td>
  trusted GSN relay</td>
</tr><tr>
  <td>proxyRegistryAccount</td>
  <td>address</td>
  <td>
  trusted delegate proxy</td>
</tr>
</table>
#### updateToken
Function to update a token with the given ID. `params` must contains the following informations: [0]: metadataHash [1]: isPrivate [2]: minHoldingForCallback [3]: legalAuthority [4]: standardFees [5]: lumpSumFees [6]: storageFees [7]: feesUnitType [8]: feesUnitAddress [9]: feesUnitId [10]: feesRecipient [11]: decimals<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  ID of the token to be updated</td>
</tr><tr>
  <td>params</td>
  <td>uint256[12]</td>
  <td>
  Token information</td>
</tr>
</table>
#### withdraw
Function to withdraw ETH from the contract. TODO: Add permission ??<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  recipent address</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  amount to withdraw</td>
</tr>
</table>
#### withdrawERC1155

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>erc1155Address</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>tokenId</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  </td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
### payable

#### deposit
Function to make an ETH deposit that can be used to pay token transfer .<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  recipent address</td>
</tr>
</table>
#### proposeCallback
Propose to buy the whole supply of a token. The proposer must hold minHoldingForCallback% of the total supply. StashBlox must approve the price with acceptCallback();<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>callbackId</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>tokenId</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>price</td>
  <td>uint256</td>
  <td>
  proposed price</td>
</tr><tr>
  <td>callees</td>
  <td>address[]</td>
  <td>
  list of calless. Empty list means all holders.</td>
</tr><tr>
  <td>documentHash</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### safeBatchTransferFrom
Transfers `values` amount(s) of `ids` from the `from` address to the `to` address specified. Caller must be approved to manage the tokens being transferred out of the `from` account. If `to` is a smart contract, will call `onERC1155BatchReceived` on `to` and act appropriately.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>from</td>
  <td>address</td>
  <td>
  Source address</td>
</tr><tr>
  <td>to</td>
  <td>address</td>
  <td>
  Target address</td>
</tr><tr>
  <td>ids</td>
  <td>uint256[]</td>
  <td>
  IDs of each token type</td>
</tr><tr>
  <td>values</td>
  <td>uint256[]</td>
  <td>
  Transfer amounts per token type</td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  Data forwarded to `onERC1155Received` if `to` is a contract receiver</td>
</tr>
</table>
#### safeTransferFrom
Transfers `value` amount of an `id` from the `from` address to the `to` address specified. Caller must be approved to manage the tokens being transferred out of the `from` account. If `to` is a smart contract, will call `onERC1155Received` on `to` and act appropriately.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>from</td>
  <td>address</td>
  <td>
  Source address</td>
</tr><tr>
  <td>to</td>
  <td>address</td>
  <td>
  Target address</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  ID of the token type</td>
</tr><tr>
  <td>value</td>
  <td>uint256</td>
  <td>
  Transfer amount</td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  Data forwarded to `onERC1155Received` if `to` is a contract receiver</td>
</tr>
</table>
### pure

#### supportsInterface
Query if a contract implements an interface<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>_interfaceID</td>
  <td>bytes4</td>
  <td>
  The interface identifier, as specified in ERC-165</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  `true` if the contract implements `_interfaceID` and</td>
</tr>
</table>
