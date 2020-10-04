## Address

Collection of functions related to the address type

### isContract `returns bool` `internal`

Returns true if `account` is a contract.
This test is non-exhaustive, and there may be false-negatives: during the
execution of a contract's constructor, its address will be reported as
not containing a contract.
IMPORTANT: It is unsafe to assume that an address for which this
function returns false is an externally-owned account (EOA) and not a
contract.

Name  | Type | Description
------------- | ------------- | -------------
account  | address | 

### toPayable `returns address payable` `internal`

Converts an `address` into `address payable`. Note that this is
simply a type cast: the actual underlying value is not changed.
NOTE: This is a feature of the next version of OpenZeppelin Contracts.
Get it via `npm install @openzeppelin/contracts@next`.

Name  | Type | Description
------------- | ------------- | -------------
account  | address | 






