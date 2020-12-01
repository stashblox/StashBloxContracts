# StashBlox

## Stashblox contract

The ultimate token factory



```
Author: Ouziel Slama
Last update: 2020-11-27T08:47:36.027Z
Compiler: solc 0.7.4+commit.3f05b770.Emscripten.clang
```

## API

### special

#### constructor

##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>salt</td>
  <td>bytes32</td>
  <td>
  </td>
</tr><tr>
  <td>ERC20Code</td>
  <td>address</td>
  <td>
  </td>
</tr>
</table>
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
#### TokenCreated

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
#### TokenUpdated

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
  <td>isLocked</td>
  <td>bool</td>
  <td>
  </td>
</tr><tr>
  <td>nonce</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### _demurrageFees

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
  <td>startAt</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>price</td>
  <td>uint256</td>
  <td>
  </td>
</tr>
</table>
#### _tokens

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
  <td>metadataHash</td>
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
  <td>feesCurrencyId</td>
  <td>uint256</td>
  <td>
  </td>
</tr><tr>
  <td>feesRecipient</td>
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
</tr><tr>
  <td>symbol</td>
  <td>bytes16</td>
  <td>
  </td>
</tr>
</table>
#### allowance
Function to get the amount that `operator` can spent  on behalf `account`<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The source address</td>
</tr><tr>
  <td>operator</td>
  <td>address</td>
  <td>
  Address with the allowance</td>
</tr><tr>
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
  <td>uint256</td>
  <td>
  Maximun amount that `operator` can spent</td>
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
  The address from where to transfer the tokens</td>
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
  Average age in seconds</td>
</tr>
</table>
#### balanceOf
Get the specified address' balance for token with specified ID.<br />
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
Get the balance of multiple account/token pairs.<br />
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
#### getConfig
Function get the current configuration<br />
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>tuple</td>
  <td>
  return a Config struct containing the following meembers:&lt;br /&gt; &lt;br /&gt; address owner;&lt;br /&gt; address proxyRegistryAccount;&lt;br /&gt; address ERC20Code;&lt;br /&gt; bytes32 DOMAIN_SEPARATOR;&lt;br /&gt; bytes32 APPROVAL_TYPEHASH;&lt;br /&gt; bytes32 TRANSFER_TYPEHASH;&lt;br /&gt; bytes32 ESCROW_TYPEHASH;&lt;br /&gt; bytes32 SALT;&lt;br /&gt; string baseURI;&lt;br /&gt; string versionRecipient;&lt;br /&gt; &lt;br /&gt;</td>
</tr>
</table>
#### getExternalBalance
Get the balance of ETH and external ERC1155 stored by the contract. These balances can be used to pay transfer fees and withdrawed with the functions `withdrawETH` and `withdrawERC1155`.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address of the holder</td>
</tr><tr>
  <td>currencyId</td>
  <td>uint256</td>
  <td>
  The ID of the currency</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  The account&#39;s balance of the currency requested</td>
</tr>
</table>
#### getTokenProperty
Function to get a property for a given token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>property</td>
  <td>string</td>
  <td>
  Name of the property. Accepted values: &#34;decimals&#34;, &#34;metadataHash&#34;, &#34;lumpSumFees&#34;, &#34;standardFees&#34;, &#34;feesCurrencyId&#34;, &#34;feesRecipient&#34;, &#34;isPrivate&#34;, &#34;locked&#34;, &#34;demurrageFees&#34;.</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  Value of the property. Should be cast if not uint256.</td>
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
#### isAuthorized
Function to check if an address has the given authorization<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address to check</td>
</tr><tr>
  <td>action</td>
  <td>uint8</td>
  <td>
  The index of the action. See `setAuthorization` documentation.</td>
</tr><tr>
  <td>objectId</td>
  <td>uint256</td>
  <td>
  The ID of the object for which the authorization is set</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bool</td>
  <td>
  `True` if `account` is authorized to perform `action` on `objectId`.</td>
</tr>
</table>
#### isLockedAccount
Function to check if an address is locked<br />
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
#### isTrustedForwarder
Function to check if an address is a trusted GSN forwarder<br />
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
  `True` if `account` is a trusted forwarder</td>
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
#### safeTransferFromDigest
Function to get the digest and the nonce for the given arguments. The digest and the nonce need to be signed by `account`, then the signature can be used to call the `safeTransferFrom` on behalf `from`. See `safeTransferFrom` documentation.<br />
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
  <td>expiry</td>
  <td>uint256</td>
  <td>
  When the signed digest will expire</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  nonce and digest usable once</td>
</tr><tr>
  <td></td>
  <td>bytes32</td>
  <td>
  </td>
</tr>
</table>
#### setApprovalForAllDigest
Function to get the digest and the nonce for the given arguments. The digest and the nonce need to be signed by `account`, then the signature can be used to call the `setApprovalForAll` on behalf `account`. See `setApprovalForAll` documentation.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The `account` that will sign the transaction</td>
</tr><tr>
  <td>operator</td>
  <td>address</td>
  <td>
  The operator who can transfer tokens on behalf `account`</td>
</tr><tr>
  <td>approved</td>
  <td>bool</td>
  <td>
  `True` to authorize the operator, `False` to revoke the authorization.</td>
</tr><tr>
  <td>expiry</td>
  <td>uint256</td>
  <td>
  When the signed digest will expire</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  nonce and digest usable once</td>
</tr><tr>
  <td></td>
  <td>bytes32</td>
  <td>
  </td>
</tr>
</table>
#### setEscrowAuthorizationDigest
Function to get the digest and the nonce for the given arguments. The digest and the nonce need to be signed by `account`, then the signature can be used to call the `setEscrowAuthorization` on behalf `account`. See `setEscrowAuthorization` documentation.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>escrow</td>
  <td>address</td>
  <td>
  Address of the escrow</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  Target address</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>authorized</td>
  <td>bool</td>
  <td>
  `True&#39; to authorize, `False` to revoke</td>
</tr><tr>
  <td>expiry</td>
  <td>uint256</td>
  <td>
  When the signed digest will expire</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>uint256</td>
  <td>
  nonce and digest usable once</td>
</tr><tr>
  <td></td>
  <td>bytes32</td>
  <td>
  </td>
</tr>
</table>
#### supportsInterface
Query if a contract implements an interface<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>interfaceID</td>
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
  `true` if the contract implements `interfaceID` and</td>
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
  The address from where to transfer the tokens</td>
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
  Transfer price</td>
</tr>
</table>
#### uri
Function to get token's metadata URL<br />
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
Function get the version of the contract (Used by GSN relays)<br />
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>string</td>
  <td>
  contract version</td>
</tr>
</table>
### nonpayable

#### callTokens
Function to call tokens from holders. Typically a contract containing all the business logic will be authorized to use this function.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>caller</td>
  <td>address</td>
  <td>
  Address of the caller</td>
</tr><tr>
  <td>callees</td>
  <td>address[]</td>
  <td>
  Addresses of the callees</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>price</td>
  <td>uint256</td>
  <td>
  Price paid by token</td>
</tr><tr>
  <td>currencyId</td>
  <td>uint256</td>
  <td>
  Currency of the price</td>
</tr>
</table>
#### createTokens
mint one or several tokens. For each token an ERC20 contract is deployed and the address is used as token ID. Use the event TokenCreated to retrieve this ID.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>recipient</td>
  <td>address</td>
  <td>
  The address that will own the minted tokens</td>
</tr><tr>
  <td>supply</td>
  <td>uint256</td>
  <td>
  Amount of the token to be minted</td>
</tr><tr>
  <td>metadataHashes</td>
  <td>uint256[]</td>
  <td>
  List of metadataHash, one by token.</td>
</tr><tr>
  <td>symbols</td>
  <td>bytes16[]</td>
  <td>
  List of symbols, one by token, must be unique.</td>
</tr><tr>
  <td>properties</td>
  <td>string[]</td>
  <td>
  List of property names to set. Accepted values: &#34;decimals&#34;, &#34;lumpSumFees&#34;, &#34;standardFees&#34;, &#34;feesCurrencyId&#34;, &#34;feesRecipient&#34;, &#34;isPrivate&#34;, &#34;locked&#34;, &#34;demurrageFees&#34;.</td>
</tr><tr>
  <td>values</td>
  <td>uint256[]</td>
  <td>
  List of values corresponding to the property names. IMPORTANT: Those values are set for all the tokens created by the function call. Order or property doesn&#39;t matter but should be identical for `properties` and `values`. All properties are optional.</td>
</tr>
</table>
#### escrowTokens
Function to put `amount` tokens `id` in escrow. Typically by an exchange to escrow amount in orders.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  Source address</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  amount to escrow</td>
</tr>
</table>
#### onERC1155BatchReceived
Handle the receipt of multiple ERC1155 token types<br />An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeBatchTransferFrom` after the balances have been updated This function MAY throw to revert and reject the transfer Return of other amount than the magic value WILL result in the transaction being reverted Note: The token contract address is always the message sender<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>operator</td>
  <td>address</td>
  <td>
  The address which called the `safeBatchTransferFrom` function</td>
</tr><tr>
  <td>from</td>
  <td>address</td>
  <td>
  The address which previously owned the token</td>
</tr><tr>
  <td>ids</td>
  <td>uint256[]</td>
  <td>
  An array containing ids of each token being transferred</td>
</tr><tr>
  <td>values</td>
  <td>uint256[]</td>
  <td>
  An array containing amounts of each token being transferred</td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  Additional data with no specified format</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bytes4</td>
  <td>
  `bytes4(keccak256(&#34;onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)&#34;))`</td>
</tr>
</table>
#### onERC1155Received
Handle the receipt of a single ERC1155 token type, increase the recipient's balance hold by the contract.<br />An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated This function MAY throw to revert and reject the transfer Return of other amount than the magic value MUST result in the transaction being reverted Note: The token contract address is always the message sender<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>operator</td>
  <td>address</td>
  <td>
  The address which called the `safeTransferFrom` function</td>
</tr><tr>
  <td>from</td>
  <td>address</td>
  <td>
  The address which previously owned the token</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The id of the token being transferred</td>
</tr><tr>
  <td>value</td>
  <td>uint256</td>
  <td>
  The amount of tokens being transferred</td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  Additional data with no specified format. If the length of the data is 356, this function will use it to call a safeTransferFrom. This functionnality makes one able to pay erc1155 transfer fees with only one transaction.</td>
</tr>
</table>
##### Returns
<table>  
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td></td>
  <td>bytes4</td>
  <td>
  `bytes4(keccak256(&#34;onERC1155Received(address,address,uint256,uint256,bytes)&#34;))`</td>
</tr>
</table>
#### registerCurreny
Function to register a currency that can be used to pay chargeable transfer<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>currencyId</td>
  <td>uint256</td>
  <td>
  ID of the new currency</td>
</tr><tr>
  <td>contractAddress</td>
  <td>address</td>
  <td>
  contract address for erc20 and erc1155 tokens</td>
</tr><tr>
  <td>tokenId</td>
  <td>uint256</td>
  <td>
  ID of the erc1155 token</td>
</tr>
</table>
#### setAccountApproval
Function to approve holder for a private token: only approved accounts are able to hold private token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  The token id</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  The authorized address</td>
</tr><tr>
  <td>isApproved</td>
  <td>bool</td>
  <td>
  `True` to approve, `False` to remove approval</td>
</tr>
</table>
#### setAccountLock
Function to unlock an address<br />
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
#### setAllowance
Function to authorize `operator` to spent `amount` on behalf `account`<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The source address</td>
</tr><tr>
  <td>operator</td>
  <td>address</td>
  <td>
  Address to set the allowance</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  Maximun amount that `operator` can spent</td>
</tr>
</table>
#### setApprovalForAll
Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.<br />
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
#### setApprovalForAll
Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.<br />
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
#### setAuthorization
Function to authorize an account to perform an operation on an object.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  The address to set for an authorization</td>
</tr><tr>
  <td>action</td>
  <td>uint8</td>
  <td>
  The index of the action. Should be one of the following:&lt;br /&gt;&lt;br /&gt; 0: SET_AUTHORIZATION&lt;br /&gt; 1: UPDATE_CONFIG&lt;br /&gt; 2: CREATE_TOKEN&lt;br /&gt; 3: UPDATE_TOKEN&lt;br /&gt; 4: TRANSFER_OWNERSHIP&lt;br /&gt; 5: REGISTER_CURRENCY&lt;br /&gt; 6: CALL_TOKENS&lt;br /&gt; 7: LOCK_ACCOUNT&lt;br /&gt; 8: GSN_FORWARDER&lt;br /&gt; 9: TRANSFER_TOKEN_FOR&lt;br /&gt; 10: HOLD_PRIVATE_TOKEN&lt;br /&gt; 11: ESCROW_TOKENS&lt;br /&gt; 12: SET_ALLOWANCE&lt;br /&gt; &lt;br /&gt;</td>
</tr><tr>
  <td>objectId</td>
  <td>uint256</td>
  <td>
  The ID of the object for which to set the authorization</td>
</tr><tr>
  <td>authorized</td>
  <td>bool</td>
  <td>
  `True` to authorize, `False` to revoke authorization</td>
</tr>
</table>
#### setEscrowAuthorization
Function to authorize `escrow` to put in lock tokens from `account`. Typically `escrow` is the contract address of an exchange.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>escrow</td>
  <td>address</td>
  <td>
  Address of the escrow</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  Target address</td>
</tr><tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>authorized</td>
  <td>bool</td>
  <td>
  `True&#39; to authorize, `False` to revoke</td>
</tr><tr>
  <td>data</td>
  <td>bytes</td>
  <td>
  Optional. This function can be called by a third party by providing the payload signed by `account`. `data` must respect the following format:&lt;br /&gt; ``` data = web3.eth.abi.encodeParameters( [&#39;uint256&#39;, &#39;uint256&#39;, &#39;uint256&#39;, &#39;uint8&#39;, &#39;bytes32&#39;, &#39;bytes32&#39;], [format, nonce, expiry, sign.v, sign.r, sign.s] ); ``` &lt;br /&gt; `format` indicates how the digest is signed: &lt;br /&gt; `0` means `sign = ecsign(digest)`&lt;br /&gt; `1` means `sign = ecsign(keccak256(&#34;\x19Ethereum Signed Message:\n32&#34; + digest))`&lt;br /&gt; `2` means `sign = ecsign(sha256(&#34;\x19Ethereum Signed Message:\n32&#34; + digest))`&lt;br /&gt; `sign.v`, `sign.r` and `sign.s` are the signature of the digest.&lt;br /&gt; The digest and the nonce can be craft or can be provided by the function `setEscrowAuthorizationDigest`.</td>
</tr>
</table>
#### transferOwnership
Transfers ownership of the contract to a new account (`account`).<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  address of the new owner</td>
</tr>
</table>
#### unescrowTokens
Function to unescrow `amount` tokens `id`. Typically by an exchange to finalize or cancel an order.<br />
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
  Token ID</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  amount to unescrow</td>
</tr>
</table>
#### updateConfig
Function to update the contract configuration<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
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
  <td>proxyRegistryAccount</td>
  <td>address</td>
  <td>
  trusted delegate proxy</td>
</tr>
</table>
#### updateToken
Update an arbitrary number of properties of a token.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>id</td>
  <td>uint256</td>
  <td>
  Token ID</td>
</tr><tr>
  <td>properties</td>
  <td>string[]</td>
  <td>
  List of property names to set. Accepted values: &#34;decimals&#34;, &#34;metadataHash&#34;, &#34;lumpSumFees&#34;, &#34;standardFees&#34;, &#34;feesCurrencyId&#34;, &#34;feesRecipient&#34;, &#34;isPrivate&#34;, &#34;locked&#34;, &#34;demurrageFees&#34;.</td>
</tr><tr>
  <td>values</td>
  <td>uint256[]</td>
  <td>
  List of values corresponding to the property names. IMPORTANT: Those values are set for all the tokens created by the function call. Order or property doesn&#39;t matter but should be identical for `properties` and `values`. All properties are optional.</td>
</tr>
</table>
#### withdrawERC1155
Use to withdraw ERC1155 tokens hold by the contract.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>currencyId</td>
  <td>uint256</td>
  <td>
  Id of the currency to withdraw</td>
</tr><tr>
  <td>account</td>
  <td>address</td>
  <td>
  Address of the holder</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  The amount to withdraw</td>
</tr>
</table>
#### withdrawETH
Function to withdraw ETH hold by the contract.<br />
##### Arguments
<table>
<tr><th>Name</th><th>Type</th><th>Description</th></tr>
<tr>
  <td>account</td>
  <td>address</td>
  <td>
  Address of the holder</td>
</tr><tr>
  <td>amount</td>
  <td>uint256</td>
  <td>
  Amount to withdraw</td>
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
  Optional. This function can be called by a third party by providing the payload signed by `from`. `data` must respect the following format:&lt;br /&gt; ``` data = web3.eth.abi.encodeParameters( [&#39;uint256&#39;, &#39;uint256&#39;, &#39;uint256&#39;, &#39;uint8&#39;, &#39;bytes32&#39;, &#39;bytes32&#39;], [format, nonce, expiry, sign.v, sign.r, sign.s] ); ``` &lt;br /&gt; `format` indicates how the digest is signed: &lt;br /&gt; `0` means `sign = ecsign(digest)`&lt;br /&gt; `1` means `sign = ecsign(keccak256(&#34;\x19Ethereum Signed Message:\n32&#34; + digest))`&lt;br /&gt; `2` means `sign = ecsign(sha256(&#34;\x19Ethereum Signed Message:\n32&#34; + digest))`&lt;br /&gt; `sign.v`, `sign.r` and `sign.s` are the signature of the digest.&lt;br /&gt; The digest and the nonce can be craft or can be provided by the function `safeTransferFromDigest`. Data is forwarded to `onERC1155Received` if `to` is a contract receiver</td>
</tr>
</table>
