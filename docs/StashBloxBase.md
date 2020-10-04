## StashBloxBase



### _isTokenizer `returns bool` `internal`



Name  | Type | Description
------------- | ------------- | -------------
tokenizer  | address | 

### _isMaintener `returns bool` `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | maintener  | address | 

### _isLockedToken `returns bool` `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | 

### _isLockedAddress `returns bool` `internal`



Name  | Type | Description
------------- | ------------- | -------------
addr  | address | 

### _isLockedMove `returns bool` `internal`



Name  | Type | Description
------------- | ------------- | -------------
from  | address | to  | address | id  | uint256 | value  | uint256 | 

### _setNewBalance  `internal`



Name  | Type | Description
------------- | ------------- | -------------
recipient  | address | id  | uint256 | value  | uint256 | 

### _transactionFees `returns uint256` `internal`



Name  | Type | Description
------------- | ------------- | -------------
account  | address | id  | uint256 | value  | uint256 | 

### _moveTokens `returns uint256 fees` `internal`



Name  | Type | Description
------------- | ------------- | -------------
from  | address | to  | address | id  | uint256 | value  | uint256 | feesBalance  | uint256 | 

### _createToken  `internal`



Name  | Type | Description
------------- | ------------- | -------------
recipient  | address | id  | uint256 | supply  | uint256 | metadataHash  | uint256 | transactionFees  | uint256[3] | feesRecipients  | address[] | feesRecipientsPercentage  | uint256[] | minHoldingForCallback  | uint256 | 

### _setMetadataHash  `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | hash  | uint256 | 

### _setTransactionFees  `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | newFees  | uint256[3] | 

### _setMinHoldingForCallback  `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | newMinHoldingForCallback  | uint256 | 

### _setFeesRecipients  `internal`



Name  | Type | Description
------------- | ------------- | -------------
id  | uint256 | newFeesRecipients  | address[] | newFeesRecipientsPercentage  | uint256[] | 






### `CallbackProposed(uint256 _id, address _proposer, uint256 _price)`





### `CallbackRefused(uint256 _id, address _proposer, uint256 _price)`





### `CallbackAccepted(uint256 _id, address _proposer, uint256 _price)`





### `UpdateStorageCreditPrice(address _owner, uint256 _price)`





### `UpdateTransactionFees(address _maintener, uint256 _id, uint256[3] _fees)`





