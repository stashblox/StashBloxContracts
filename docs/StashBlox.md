## StashBlox



### authorizeTokenizer  `external`

Function to authorize an address to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address

### revokeTokenizer  `external`

Function to revoke the authorization to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address

### isTokenizer `returns bool` `external`

Function to check if an address is authorized to create a token.


Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | The authorized address

### authorizeMaintener  `external`

Function to authorize an address to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address

### revokeMaintener  `external`

Function to revoke the authorization to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address

### isMaintener `returns bool` `external`

Function to check if an address is authorized to maintain a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | The authorized address

### lockToken  `external`

Function to lock a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID

### unlockToken  `external`

Function to unlock a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID

### isLockedToken `returns bool` `external`

Function to check if a token is locked.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID

### lockAddress  `external`

Function to lock an address.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to lock

### unlockAddress  `external`

Function to unlock an address.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to unlock

### isLockedAddress `returns bool` `external`

Function to check if an address is lockec.


Name  | Type | Description
------------- | ------------- | -------------
addr  | address | The address to check

### createToken  `external`

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

### createTokens  `external`

Function to mint tokens.


Name  | Type | Description
------------- | ------------- | -------------
templateID  | uint256 | Identifier of the template
ids  | uint256[] | list of IDs of the tokens to be minted
metadataHashes  | uint256[] | list of metadata file hashes

### setTokenTemplate  `external`

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

### updateMetadataHash  `external`

Function to update the metadata hash of a token.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
metadataHash  | uint256 | The new metadata hash

### updateTransactionFees  `external`

Function to update transaction fees.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newFees  | uint256[3] | The new transaction fees: [lumpSumFees (in WEI), valueProportionalFees (ratio of transfered amount * 10**8), storageFees (in storageCredit * 10**8)]

### updateFeesRecipients  `external`

Function to update the minimum holding to propose a callback.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newFeesRecipients  | address[] | list of addresses receiving transfer fees
newFeesRecipientsPercentage  | uint256[] | list of percentage, each one for the corresponding feesRecipients

### updateMinHoldingForCallback  `external`

Function to update the minimum holding to propose a callback.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | The token ID
newMinHoldingForCallback  | uint256 | The new minimum holding

### updateStorageCreditPrice  `external`

Function to update the price of one "storage credit".


Name  | Type | Description
------------- | ------------- | -------------
newPrice  | uint256 | The new price

### transactionFees `returns uint256` `public`

Function to get the transaction price to transfer tokens.


Name  | Type | Description
------------- | ------------- | -------------
account  | address | the address from where to transfer the tokens
id  | uint256 | The token ID
value  | uint256 | The amount to transfer

### proposeCallback  `external`

Propose to buy the whole supply of a token.
The proposer must hold minHoldingForCallback% of the total supply.
StashBlox must approve the price with acceptCallback();


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
price  | uint256 | proposed price

### refuseCallback  `external`

Refuse a callback if the price is not enough.


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
proposer  | address | address of the proposer

### acceptCallback  `external`

Accept a callback


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID
proposer  | address | address of the proposer

### withdraw  `external`

Function to withdraw ETH from the contract.


Name  | Type | Description
------------- | ------------- | -------------
to  | address | recipent address
amount  | uint256 | amount to withdraw

### totalSupply `returns uint256` `external`

Function to get token supply


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID


### tokensByAddress `returns string result` `public`

Function to get the list of token hold by an address


Name  | Type | Description
------------- | ------------- | -------------
account  | address | holder address


### addressesByToken `returns string result` `public`

Function to get the list of token hold by an address


Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | Token ID







