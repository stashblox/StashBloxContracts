var StashBloxJson = {
  "contractName": "StashBlox",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "hash",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "DocumentAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "BASE_URI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOCUMENTS_BASE_URI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "docHash",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "docName",
          "type": "string"
        }
      ],
      "name": "addDocument",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "docHashes",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "docNames",
          "type": "string[]"
        }
      ],
      "name": "addDocuments",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "docHash",
          "type": "uint256"
        }
      ],
      "name": "documentUri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "isLockedToken",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "lockToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "_interfaceID",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "unlockToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "createToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.12+commit.7709ece9\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"_approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"hash\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"name\":\"DocumentAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"_ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"_values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"_value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"_id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"constant\":true,\"inputs\":[],\"name\":\"BASE_URI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"DOCUMENTS_BASE_URI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"docHash\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"docName\",\"type\":\"string\"}],\"name\":\"addDocument\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"docHashes\",\"type\":\"uint256[]\"},{\"internalType\":\"string[]\",\"name\":\"docNames\",\"type\":\"string[]\"}],\"name\":\"addDocuments\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"recipients\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"createToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"docHash\",\"type\":\"uint256\"}],\"name\":\"documentUri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"isLockedToken\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"lockToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"_interfaceID\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"unlockToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{\"balanceOf(address,uint256)\":{\"details\":\"Get the specified address' balance for token with specified ID. Attempting to query the zero account for a balance will result in a revert.\",\"params\":{\"account\":\"The address of the token holder\",\"id\":\"ID of the token\"},\"return\":\"The account's balance of the token type requested\"},\"balanceOfBatch(address[],uint256[])\":{\"details\":\"Get the balance of multiple account/token pairs. If any of the query accounts is the zero account, this query will revert.\",\"params\":{\"accounts\":\"The addresses of the token holders\",\"ids\":\"IDs of the tokens\"},\"return\":\"Balances for each account and token id pair\"},\"createToken(uint256[],address[],uint256[])\":{\"details\":\"Function to mint an amount of a token with the given ID.\",\"params\":{\"ids\":\"ID of the token to be minted\",\"recipients\":\"The addresses that will own the minted token\",\"values\":\"Amount of the token to be minted for each recipient\"}},\"isApprovedForAll(address,address)\":{\"params\":{\"account\":\"The account of the Tokens\",\"operator\":\"Address of authorized operator\"},\"return\":\"True if the operator is approved, false if not\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"setApprovalForAll(address,bool)\":{\"details\":\"Sets or unsets the approval of a given operator.     * An operator is allowed to transfer all tokens of the sender on their behalf.     * Because an account already has operator privileges for itself, this function will revert if the account attempts to set the approval status for itself.\",\"params\":{\"approved\":\"representing the status of the approval to be set\",\"operator\":\"address to set the approval\"}},\"supportsInterface(bytes4)\":{\"params\":{\"_interfaceID\":\"The interface identifier, as specified in ERC-165\"},\"return\":\"`true` if the contract implements `_interfaceID` and\"},\"totalSupply(uint256)\":{\"params\":{\"id\":\"Token ID\"},\"return\":\"Token supply\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"},\"uri(uint256)\":{\"params\":{\"id\":\"Token ID\"},\"return\":\"URI string\"}}},\"userdoc\":{\"methods\":{\"isApprovedForAll(address,address)\":{\"notice\":\"Queries the approval status of an operator for a given account.\"},\"supportsInterface(bytes4)\":{\"notice\":\"Query if a contract implements an interface\"}}}},\"settings\":{\"compilationTarget\":{\"/home/ouziel/Work/StashBloxContracts/contracts/StashBlox.sol\":\"StashBlox\"},\"evmVersion\":\"constantinople\",\"libraries\":{},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/home/ouziel/Work/StashBloxContracts/contracts/StashBlox.sol\":{\"keccak256\":\"0x5b3b54a22301fe7c5916e84e45ea06d431e0a7a159fb32ee5e607f53ee554672\",\"urls\":[\"bzz-raw://35aa0949ac09efe08a27c977b7a2fae5d259a2fc65c24b8092c61e7fed2e33d9\",\"dweb:/ipfs/QmXmWRVvGxSxF39H1Y8y7gneFEsmt4dobEZvMHTV7YdkZB\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155.sol\":{\"keccak256\":\"0x3b402bf4c3005ecc601314e4b30261492a9763887a829c16169b721560c40c98\",\"urls\":[\"bzz-raw://751404bb3ddc61346f61af51ed4cd84480137c61e359e7964e3a636cdb37923d\",\"dweb:/ipfs/QmRoWNHeARMz7Qia1dkvRdZ3TFYCL9BCZoG5nXqSJSL5yU\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Documents.sol\":{\"keccak256\":\"0x74b1567cea17360e43bfaa4edb207fce7ede4c5b897840a2c6398eb9e9bbff57\",\"urls\":[\"bzz-raw://962218ba44ababf19479b87272dbdad2564b28cecd0c0b89808048d93c8e76ad\",\"dweb:/ipfs/QmfEB2uESNoTXvazMPWBYCKzM41b4vcHmMvqxQaj82WkhW\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Lockable.sol\":{\"keccak256\":\"0xf827937fd3c1d477b5393e757bc9c798b457f8ef196ff6673a0af56dd6fe9843\",\"urls\":[\"bzz-raw://a2cc3062a0432c52dc518621c003fa93e0f76c5880a94ddd1dd60880cfcc445b\",\"dweb:/ipfs/Qmc2LyR861H9Q1nQL5BgLbaxBZkjXYjrtHzJQU7p6HBDSm\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Metadata.sol\":{\"keccak256\":\"0x2e6d2f062bc21548d4ead893514b9e0c95f770cea336c372b80e285d9f255879\",\"urls\":[\"bzz-raw://8dee9c4920b41344a4742249cc8ec01a462f66b495c9378932c7b9fa10b868e9\",\"dweb:/ipfs/QmaErTwGPZ29Fyqur1dhp33LbH9odGvZLuMWBHx9SW65pj\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xf4b2a26948331e1e1d361cc176bea072484e1c4e8843087f1bcbc07278d3769d\",\"urls\":[\"bzz-raw://521d419e6281f4a8a369f0f0d237bf0ee434a14bfbd077b44e0e5e53709c9e19\",\"dweb:/ipfs/QmWaYyG6uYGfZJMVqjgVPCswAMjMbhxSTaFoqyajqMBXsY\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/IERC1155Metadata.sol\":{\"keccak256\":\"0x3e393924bf4692c0c00e93241a93a6188e975a651cf8b582e7e84734cd94b006\",\"urls\":[\"bzz-raw://51ed13d9b1c928929f8881f6a575672102c30a6e0f29d076247cdaa96f13339e\",\"dweb:/ipfs/QmeDuumeBQnNZTditoKWZASypFyp8iFykf86zcsybATB7V\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x47b5dfefd2bfddc96e8b57892b88fba5e14ad6dba605362a3cb3092df2d5dc88\",\"urls\":[\"bzz-raw://53087dadef8b1de561e2b0aeceab6704c1695eca11a215509d8e197cda7523e2\",\"dweb:/ipfs/QmSVr2rFua7cCSSssYcyGiEZNBYthGJfvBRKDHwAxWDnA6\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC165/IERC165.sol\":{\"keccak256\":\"0x93a3fd81bb5e01220c5c7d92acc90687e4bccd3421dfa77d07530657c82547c7\",\"urls\":[\"bzz-raw://bcc3e87f42a4a572b3a1122f36120d7be93ca50efd6433adefec31e9b428f0ee\",\"dweb:/ipfs/QmRbafRkU6r3zDL1QZP3LzfL9yYfpqC7UcZJH68YTeLr3S\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC173/ERC173.sol\":{\"keccak256\":\"0x6595507569157c51cd25d55fe6dc3c7e2f8ec63c1ffb6c6edebd295b16d6cab9\",\"urls\":[\"bzz-raw://e81ab7f9f0678925f1de989ce6aa716d716ffcd0e9e46695811455c113cdbc77\",\"dweb:/ipfs/QmceBmtUsN1oEheVussVGAonWt4Wr53SL2pLyQunVtuPke\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC173/IERC173.sol\":{\"keccak256\":\"0x7c616fdc098060cb7000b15693955b44f500b060d23c9d270e1d8280fdf8e83a\",\"urls\":[\"bzz-raw://92b1c4cfdffed26ffe8eac234a8efe07f0d5b2b574c0d4bcfef80c8dda5da501\",\"dweb:/ipfs/QmP6kZMd4j5KuSyUAWm9fkJa7SGEkYoHZeKgnmpyhbvuYr\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/utils/Address.sol\":{\"keccak256\":\"0x890e6e05eddb7d7e73b1be32801793d00cd9a09bf37801980b7a3e6f2ac8c351\",\"urls\":[\"bzz-raw://f3a1a1ba20bf4bc658d0a5e1debb226e436b915a72c4abea54154700940c707e\",\"dweb:/ipfs/QmPM6WTD1oVdMvYyqnuJVmMe47tMjR8Tyu1JQniAVdXNAS\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/utils/SafeMath.sol\":{\"keccak256\":\"0x1c57a69a74b9e622c31d6bce1147d69008791c27a4f2c816778e582dfce01759\",\"urls\":[\"bzz-raw://d9326646377c5aaee9ed545087e1ea3c45c88ea41d4496bac5e8fc10504f2ee0\",\"dweb:/ipfs/QmeU6stkFpFwJ4aEqhLDygoCSp18MLUgUQhcFuPTyo2Pa2\"]},\"/home/ouziel/Work/StashBloxContracts/contracts/lib/utils/StringUtils.sol\":{\"keccak256\":\"0x252ad04324d17b92005a7b979d5edd6bb00d03a1e26bcecdcde5477c8a7ff391\",\"urls\":[\"bzz-raw://7b59bf2f56c3dd8d98e6990183212eae0b041d8d8dc640fa5b7ec099f308c96d\",\"dweb:/ipfs/Qmb7xkknBCcWocf9fAranwaYS6xDcX52keeRwx72ntSGGW\"]}},\"version\":1}",
  "bytecode": "0x608060405262000015336200001b60201b60201c565b620001e9565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156200008e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200008590620001b6565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006200015d602683620001d8565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006020820190508181036000830152620001d1816200014e565b9050919050565b600082825260208201905092915050565b612d1e80620001f96000396000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c80638da5cb5b116100ad578063dd2e0ac011610071578063dd2e0ac014610366578063e985e9c514610382578063f242432a146103b2578063f2fde38b146103ce578063f46e049b146103ea5761012b565b80638da5cb5b146102ae578063a22cb465146102cc578063bba75c83146102e8578063bd85b03914610318578063dbddb26a146103485761012b565b806358cd82ce116100f457806358cd82ce1461020c57806361feed5c1461022857806364d7e0531461024657806380f20363146102765780638842ec22146102925761012b565b8062fdd58e1461013057806301ffc9a7146101605780630e89341c146101905780632eb2c2d6146101c05780634e1273f4146101dc575b600080fd5b61014a60048036036101459190810190611e63565b610406565b6040516101579190612a56565b60405180910390f35b61017a60048036036101759190810190612053565b6104cf565b6040516101879190612857565b60405180910390f35b6101aa60048036036101a5919081019061207c565b610580565b6040516101b79190612894565b60405180910390f35b6101da60048036036101d59190810190611cc9565b6105d0565b005b6101f660048036036101f19190810190611e9f565b61070d565b6040516102039190612835565b60405180910390f35b61022660048036036102219190810190611f0b565b6108be565b005b610230610c06565b60405161023d9190612872565b60405180910390f35b610260600480360361025b919081019061207c565b610c3f565b60405161026d9190612894565b60405180910390f35b610290600480360361028b919081019061207c565b610c8f565b005b6102ac60048036036102a791908101906120a5565b610d05565b005b6102b6610da1565b6040516102c39190612750565b60405180910390f35b6102e660048036036102e19190810190611e27565b610dcb565b005b61030260048036036102fd919081019061207c565b610f37565b60405161030f9190612857565b60405180910390f35b610332600480360361032d919081019061207c565b610f49565b60405161033f9190612a56565b60405180910390f35b610350610f66565b60405161035d9190612872565b60405180910390f35b610380600480360361037b919081019061207c565b610f9f565b005b61039c60048036036103979190810190611c8d565b611015565b6040516103a99190612857565b60405180910390f35b6103cc60048036036103c79190810190611d95565b6110a9565b005b6103e860048036036103e39190810190611c64565b611171565b005b61040460048036036103ff9190810190611faf565b6111c4565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610477576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046e906128d6565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610568575063d9b67a2660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610576576001905061057b565b600090505b919050565b60606105c96040518060400160405280601d81526020017f68747470733a2f2f7374617368626c6f782e636f6d2f746f6b656e732f0000008152506105c484611391565b611480565b9050919050565b858580806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505060008090505b81518110156106885761063d82828151811061063057fe5b60200260200101516115cb565b1561067d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610674906128b6565b60405180910390fd5b806001019050610618565b503073ffffffffffffffffffffffffffffffffffffffff16632eb2c2d68a8a8a8a8a8a8a8a6040518963ffffffff1660e01b81526004016106d098979695949392919061276b565b600060405180830381600087803b1580156106ea57600080fd5b505af11580156106fe573d6000803e3d6000fd5b50505050505050505050505050565b60608151835114610753576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074a90612996565b60405180910390fd5b606083516040519080825280602002602001820160405280156107855781602001602082028038833980820191505090505b50905060008090505b84518110156108b357600073ffffffffffffffffffffffffffffffffffffffff168582815181106107bb57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16141561081a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610811906129d6565b60405180910390fd5b60008085838151811061082957fe5b60200260200101518152602001908152602001600020600086838151811061084d57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482828151811061089c57fe5b60200260200101818152505080600101905061078e565b508091505092915050565b6108c66115f5565b610905576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fc90612a16565b60405180910390fd5b83839050868690501461094d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094490612936565b60405180910390fd5b818190508484905014610995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098c906129b6565b60405180910390fd5b60008090505b86869050811015610a19576000600560008989858181106109b857fe5b9050602002013581526020019081526020016000205414610a0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a05906129f6565b60405180910390fd5b80600101905061099b565b5060008090505b86869050811015610bfd576000878783818110610a3957fe5b9050602002013590506000868684818110610a5057fe5b9050602002016020610a659190810190611c64565b90506000858585818110610a7557fe5b905060200201359050610aa481600560008681526020019081526020016000205461164d90919063ffffffff16565b6005600085815260200190815260200160002081905550610b1d8160008086815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461164d90919063ffffffff16565b60008085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628685604051610be7929190612aa1565b60405180910390a4505050806001019050610a20565b50505050505050565b6040518060400160405280602081526020017f68747470733a2f2f7374617368626c6f782e636f6d2f646f63756d656e74732f81525081565b6060610c886040518060400160405280602081526020017f68747470733a2f2f7374617368626c6f782e636f6d2f646f63756d656e74732f815250610c8384611391565b611480565b9050919050565b610c976115f5565b610cd6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ccd90612a16565b60405180910390fd5b60016003600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610d0d6115f5565b610d4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4390612a16565b60405180910390fd5b610d9b848484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506116a2565b50505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610e3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3190612956565b60405180910390fd5b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610f2b9190612857565b60405180910390a35050565b6000610f42826115cb565b9050919050565b600060056000838152602001908152602001600020549050919050565b6040518060400160405280601d81526020017f68747470733a2f2f7374617368626c6f782e636f6d2f746f6b656e732f00000081525081565b610fa76115f5565b610fe6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fdd90612a16565b60405180910390fd5b60006003600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b836110b3816115cb565b156110f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ea906128b6565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff1663f242432a8888888888886040518763ffffffff1660e01b8152600401611136969594939291906127d9565b600060405180830381600087803b15801561115057600080fd5b505af1158015611164573d6000803e3d6000fd5b5050505050505050505050565b6111796115f5565b6111b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111af90612a16565b60405180910390fd5b6111c18161171a565b50565b6111cc6115f5565b61120b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120290612a16565b60405180910390fd5b838390508686905014611253576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124a90612a36565b60405180910390fd5b81819050848490501461129b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129290612976565b60405180910390fd5b60008090505b868690508110156113885761137d8787838181106112bb57fe5b905060200201358686848181106112ce57fe5b905060200201358585858181106112e157fe5b90506020028101803560016020038336030381126112fe57600080fd5b8083019250508135905060208201915067ffffffffffffffff81111561132357600080fd5b60018102360382131561133557600080fd5b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506116a2565b8060010190506112a1565b50505050505050565b6060600080905060008390505b600081146113c0578180600101925050601081816113b857fe5b04905061139e565b6060826040519080825280601f01601f1916602001820160405280156113f55781602001600182028038833980820191505090505b50905060008090505b83811015611474576010868161141057fe5b06925061141c8361184a565b826001838703038151811061142d57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506010868161146657fe5b0495508060010190506113fe565b50809350505050919050565b6060808390506060839050606081518351016040519080825280601f01601f1916602001820160405280156114c45781602001600182028038833980820191505090505b509050606081905060008090506000809050600090505b8551811015611549578581815181106114f057fe5b602001015160f81c60f81b83838060010194508151811061150d57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506114db565b600090505b84518110156115bc5784818151811061156357fe5b602001015160f81c60f81b83838060010194508151811061158057fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061154e565b82965050505050505092915050565b60006003600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b600080828401905083811015611698576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168f90612916565b60405180910390fd5b8091505092915050565b8060046000858152602001908152602001600020600084815260200190815260200160002090805190602001906116da9291906118f3565b50827f7c77b0a5e04b8b0a37a64aa8dd7a24c2cdfb5f2302c065c6044b33077b96abaa838360405161170d929190612a71565b60405180910390a2505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561178a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611781906128f6565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008160ff16600011158015611864575060098260ff1611155b1561189957817f300000000000000000000000000000000000000000000000000000000000000060f81c0160f81b90506118ee565b8160ff16600a111580156118b15750600f8260ff1611155b156118e957600a827f610000000000000000000000000000000000000000000000000000000000000060f81c010360f81b90506118ee565b600080fd5b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061193457805160ff1916838001178555611962565b82800160010185558215611962579182015b82811115611961578251825591602001919060010190611946565b5b50905061196f9190611973565b5090565b61199591905b80821115611991576000816000905550600101611979565b5090565b90565b6000813590506119a781612c7f565b92915050565b60008083601f8401126119bf57600080fd5b8235905067ffffffffffffffff8111156119d857600080fd5b6020830191508360208202830111156119f057600080fd5b9250929050565b600082601f830112611a0857600080fd5b8135611a1b611a1682612af7565b612aca565b91508181835260208401935060208101905083856020840282011115611a4057600080fd5b60005b83811015611a705781611a568882611998565b845260208401935060208301925050600181019050611a43565b5050505092915050565b60008083601f840112611a8c57600080fd5b8235905067ffffffffffffffff811115611aa557600080fd5b602083019150836020820283011115611abd57600080fd5b9250929050565b60008083601f840112611ad657600080fd5b8235905067ffffffffffffffff811115611aef57600080fd5b602083019150836020820283011115611b0757600080fd5b9250929050565b600082601f830112611b1f57600080fd5b8135611b32611b2d82612b1f565b612aca565b91508181835260208401935060208101905083856020840282011115611b5757600080fd5b60005b83811015611b875781611b6d8882611c4f565b845260208401935060208301925050600181019050611b5a565b5050505092915050565b600081359050611ba081612c96565b92915050565b600081359050611bb581612cad565b92915050565b60008083601f840112611bcd57600080fd5b8235905067ffffffffffffffff811115611be657600080fd5b602083019150836001820283011115611bfe57600080fd5b9250929050565b60008083601f840112611c1757600080fd5b8235905067ffffffffffffffff811115611c3057600080fd5b602083019150836001820283011115611c4857600080fd5b9250929050565b600081359050611c5e81612cc4565b92915050565b600060208284031215611c7657600080fd5b6000611c8484828501611998565b91505092915050565b60008060408385031215611ca057600080fd5b6000611cae85828601611998565b9250506020611cbf85828601611998565b9150509250929050565b60008060008060008060008060a0898b031215611ce557600080fd5b6000611cf38b828c01611998565b9850506020611d048b828c01611998565b975050604089013567ffffffffffffffff811115611d2157600080fd5b611d2d8b828c01611ac4565b9650965050606089013567ffffffffffffffff811115611d4c57600080fd5b611d588b828c01611ac4565b9450945050608089013567ffffffffffffffff811115611d7757600080fd5b611d838b828c01611bbb565b92509250509295985092959890939650565b60008060008060008060a08789031215611dae57600080fd5b6000611dbc89828a01611998565b9650506020611dcd89828a01611998565b9550506040611dde89828a01611c4f565b9450506060611def89828a01611c4f565b935050608087013567ffffffffffffffff811115611e0c57600080fd5b611e1889828a01611bbb565b92509250509295509295509295565b60008060408385031215611e3a57600080fd5b6000611e4885828601611998565b9250506020611e5985828601611b91565b9150509250929050565b60008060408385031215611e7657600080fd5b6000611e8485828601611998565b9250506020611e9585828601611c4f565b9150509250929050565b60008060408385031215611eb257600080fd5b600083013567ffffffffffffffff811115611ecc57600080fd5b611ed8858286016119f7565b925050602083013567ffffffffffffffff811115611ef557600080fd5b611f0185828601611b0e565b9150509250929050565b60008060008060008060608789031215611f2457600080fd5b600087013567ffffffffffffffff811115611f3e57600080fd5b611f4a89828a01611ac4565b9650965050602087013567ffffffffffffffff811115611f6957600080fd5b611f7589828a016119ad565b9450945050604087013567ffffffffffffffff811115611f9457600080fd5b611fa089828a01611ac4565b92509250509295509295509295565b60008060008060008060608789031215611fc857600080fd5b600087013567ffffffffffffffff811115611fe257600080fd5b611fee89828a01611ac4565b9650965050602087013567ffffffffffffffff81111561200d57600080fd5b61201989828a01611ac4565b9450945050604087013567ffffffffffffffff81111561203857600080fd5b61204489828a01611a7a565b92509250509295509295509295565b60006020828403121561206557600080fd5b600061207384828501611ba6565b91505092915050565b60006020828403121561208e57600080fd5b600061209c84828501611c4f565b91505092915050565b600080600080606085870312156120bb57600080fd5b60006120c987828801611c4f565b94505060206120da87828801611c4f565b935050604085013567ffffffffffffffff8111156120f757600080fd5b61210387828801611c05565b925092505092959194509250565b600061211d8383612732565b60208301905092915050565b61213281612bb8565b82525050565b60006121448385612b85565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561217357600080fd5b602083029250612184838584612c2c565b82840190509392505050565b600061219b82612b57565b6121a58185612b85565b93506121b083612b47565b8060005b838110156121e15781516121c88882612111565b97506121d383612b78565b9250506001810190506121b4565b5085935050505092915050565b6121f781612bca565b82525050565b60006122098385612b96565b9350612216838584612c2c565b61221f83612c6e565b840190509392505050565b600061223582612b6d565b61223f8185612ba7565b935061224f818560208601612c3b565b61225881612c6e565b840191505092915050565b600061226e82612b62565b6122788185612ba7565b9350612288818560208601612c3b565b61229181612c6e565b840191505092915050565b60006122a9601d83612ba7565b91507f455243313135354c6f636b61626c653a20546f6b656e206c6f636b65640000006000830152602082019050919050565b60006122e9602b83612ba7565b91507f455243313135353a2062616c616e636520717565727920666f7220746865207a60008301527f65726f20616464726573730000000000000000000000000000000000000000006020830152604082019050919050565b600061234f602683612ba7565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006123b5601b83612ba7565b91507f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006000830152602082019050919050565b60006123f5603483612ba7565b91507f5374617368426c6f783a2069647320616e6420726563697069656e7473206d7560008301527f737420686176652073616d65206c656e677468730000000000000000000000006020830152604082019050919050565b600061245b602c83612ba7565b91507f455243313135353a2063616e6e6f742073657420617070726f76616c2073746160008301527f74757320666f722073656c6600000000000000000000000000000000000000006020830152604082019050919050565b60006124c1603283612ba7565b91507f5374617368426c6f783a2068617368657320616e64206e616d6573206d75737460008301527f20686176652073616d65206c656e6774687300000000000000000000000000006020830152604082019050919050565b6000612527603083612ba7565b91507f455243313135353a206163636f756e747320616e6420494473206d757374206860008301527f6176652073616d65206c656e67746873000000000000000000000000000000006020830152604082019050919050565b600061258d603783612ba7565b91507f5374617368426c6f783a20726563697069656e747320616e642076616c75657360008301527f206d75737420686176652073616d65206c656e677468730000000000000000006020830152604082019050919050565b60006125f3603483612ba7565b91507f455243313135353a20736f6d65206164647265737320696e206261746368206260008301527f616c616e6365207175657279206973207a65726f0000000000000000000000006020830152604082019050919050565b6000612659601f83612ba7565b91507f5374617368426c6f783a20546f6b656e20616c7265616479206d696e746564006000830152602082019050919050565b6000612699602083612ba7565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b60006126d9603083612ba7565b91507f5374617368426c6f783a2069647320616e6420686173686573206d757374206860008301527f6176652073616d65206c656e67746873000000000000000000000000000000006020830152604082019050919050565b61273b81612c22565b82525050565b61274a81612c22565b82525050565b60006020820190506127656000830184612129565b92915050565b600060a082019050612780600083018b612129565b61278d602083018a612129565b81810360408301526127a081888a612138565b905081810360608301526127b5818688612138565b905081810360808301526127ca8184866121fd565b90509998505050505050505050565b600060a0820190506127ee6000830189612129565b6127fb6020830188612129565b6128086040830187612741565b6128156060830186612741565b81810360808301526128288184866121fd565b9050979650505050505050565b6000602082019050818103600083015261284f8184612190565b905092915050565b600060208201905061286c60008301846121ee565b92915050565b6000602082019050818103600083015261288c8184612263565b905092915050565b600060208201905081810360008301526128ae818461222a565b905092915050565b600060208201905081810360008301526128cf8161229c565b9050919050565b600060208201905081810360008301526128ef816122dc565b9050919050565b6000602082019050818103600083015261290f81612342565b9050919050565b6000602082019050818103600083015261292f816123a8565b9050919050565b6000602082019050818103600083015261294f816123e8565b9050919050565b6000602082019050818103600083015261296f8161244e565b9050919050565b6000602082019050818103600083015261298f816124b4565b9050919050565b600060208201905081810360008301526129af8161251a565b9050919050565b600060208201905081810360008301526129cf81612580565b9050919050565b600060208201905081810360008301526129ef816125e6565b9050919050565b60006020820190508181036000830152612a0f8161264c565b9050919050565b60006020820190508181036000830152612a2f8161268c565b9050919050565b60006020820190508181036000830152612a4f816126cc565b9050919050565b6000602082019050612a6b6000830184612741565b92915050565b6000604082019050612a866000830185612741565b8181036020830152612a98818461222a565b90509392505050565b6000604082019050612ab66000830185612741565b612ac36020830184612741565b9392505050565b6000604051905081810181811067ffffffffffffffff82111715612aed57600080fd5b8060405250919050565b600067ffffffffffffffff821115612b0e57600080fd5b602082029050602081019050919050565b600067ffffffffffffffff821115612b3657600080fd5b602082029050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000612bc382612c02565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612c59578082015181840152602081019050612c3e565b83811115612c68576000848401525b50505050565b6000601f19601f8301169050919050565b612c8881612bb8565b8114612c9357600080fd5b50565b612c9f81612bca565b8114612caa57600080fd5b50565b612cb681612bd6565b8114612cc157600080fd5b50565b612ccd81612c22565b8114612cd857600080fd5b5056fea365627a7a72315820a676992e73ebbf1b47c60935731fd1aabfd51e9134a8c2c2412cfafc64d59f5a6c6578706572696d656e74616cf564736f6c634300050c0040",
  "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061012b5760003560e01c80638da5cb5b116100ad578063dd2e0ac011610071578063dd2e0ac014610366578063e985e9c514610382578063f242432a146103b2578063f2fde38b146103ce578063f46e049b146103ea5761012b565b80638da5cb5b146102ae578063a22cb465146102cc578063bba75c83146102e8578063bd85b03914610318578063dbddb26a146103485761012b565b806358cd82ce116100f457806358cd82ce1461020c57806361feed5c1461022857806364d7e0531461024657806380f20363146102765780638842ec22146102925761012b565b8062fdd58e1461013057806301ffc9a7146101605780630e89341c146101905780632eb2c2d6146101c05780634e1273f4146101dc575b600080fd5b61014a60048036036101459190810190611e63565b610406565b6040516101579190612a56565b60405180910390f35b61017a60048036036101759190810190612053565b6104cf565b6040516101879190612857565b60405180910390f35b6101aa60048036036101a5919081019061207c565b610580565b6040516101b79190612894565b60405180910390f35b6101da60048036036101d59190810190611cc9565b6105d0565b005b6101f660048036036101f19190810190611e9f565b61070d565b6040516102039190612835565b60405180910390f35b61022660048036036102219190810190611f0b565b6108be565b005b610230610c06565b60405161023d9190612872565b60405180910390f35b610260600480360361025b919081019061207c565b610c3f565b60405161026d9190612894565b60405180910390f35b610290600480360361028b919081019061207c565b610c8f565b005b6102ac60048036036102a791908101906120a5565b610d05565b005b6102b6610da1565b6040516102c39190612750565b60405180910390f35b6102e660048036036102e19190810190611e27565b610dcb565b005b61030260048036036102fd919081019061207c565b610f37565b60405161030f9190612857565b60405180910390f35b610332600480360361032d919081019061207c565b610f49565b60405161033f9190612a56565b60405180910390f35b610350610f66565b60405161035d9190612872565b60405180910390f35b610380600480360361037b919081019061207c565b610f9f565b005b61039c60048036036103979190810190611c8d565b611015565b6040516103a99190612857565b60405180910390f35b6103cc60048036036103c79190810190611d95565b6110a9565b005b6103e860048036036103e39190810190611c64565b611171565b005b61040460048036036103ff9190810190611faf565b6111c4565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610477576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046e906128d6565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610568575063d9b67a2660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610576576001905061057b565b600090505b919050565b60606105c96040518060400160405280601d81526020017f68747470733a2f2f7374617368626c6f782e636f6d2f746f6b656e732f0000008152506105c484611391565b611480565b9050919050565b858580806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505060008090505b81518110156106885761063d82828151811061063057fe5b60200260200101516115cb565b1561067d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610674906128b6565b60405180910390fd5b806001019050610618565b503073ffffffffffffffffffffffffffffffffffffffff16632eb2c2d68a8a8a8a8a8a8a8a6040518963ffffffff1660e01b81526004016106d098979695949392919061276b565b600060405180830381600087803b1580156106ea57600080fd5b505af11580156106fe573d6000803e3d6000fd5b50505050505050505050505050565b60608151835114610753576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074a90612996565b60405180910390fd5b606083516040519080825280602002602001820160405280156107855781602001602082028038833980820191505090505b50905060008090505b84518110156108b357600073ffffffffffffffffffffffffffffffffffffffff168582815181106107bb57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16141561081a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610811906129d6565b60405180910390fd5b60008085838151811061082957fe5b60200260200101518152602001908152602001600020600086838151811061084d57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482828151811061089c57fe5b60200260200101818152505080600101905061078e565b508091505092915050565b6108c66115f5565b610905576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fc90612a16565b60405180910390fd5b83839050868690501461094d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094490612936565b60405180910390fd5b818190508484905014610995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098c906129b6565b60405180910390fd5b60008090505b86869050811015610a19576000600560008989858181106109b857fe5b9050602002013581526020019081526020016000205414610a0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a05906129f6565b60405180910390fd5b80600101905061099b565b5060008090505b86869050811015610bfd576000878783818110610a3957fe5b9050602002013590506000868684818110610a5057fe5b9050602002016020610a659190810190611c64565b90506000858585818110610a7557fe5b905060200201359050610aa481600560008681526020019081526020016000205461164d90919063ffffffff16565b6005600085815260200190815260200160002081905550610b1d8160008086815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461164d90919063ffffffff16565b60008085815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628685604051610be7929190612aa1565b60405180910390a4505050806001019050610a20565b50505050505050565b6040518060400160405280602081526020017f68747470733a2f2f7374617368626c6f782e636f6d2f646f63756d656e74732f81525081565b6060610c886040518060400160405280602081526020017f68747470733a2f2f7374617368626c6f782e636f6d2f646f63756d656e74732f815250610c8384611391565b611480565b9050919050565b610c976115f5565b610cd6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ccd90612a16565b60405180910390fd5b60016003600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610d0d6115f5565b610d4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4390612a16565b60405180910390fd5b610d9b848484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506116a2565b50505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610e3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3190612956565b60405180910390fd5b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610f2b9190612857565b60405180910390a35050565b6000610f42826115cb565b9050919050565b600060056000838152602001908152602001600020549050919050565b6040518060400160405280601d81526020017f68747470733a2f2f7374617368626c6f782e636f6d2f746f6b656e732f00000081525081565b610fa76115f5565b610fe6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fdd90612a16565b60405180910390fd5b60006003600083815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b836110b3816115cb565b156110f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ea906128b6565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff1663f242432a8888888888886040518763ffffffff1660e01b8152600401611136969594939291906127d9565b600060405180830381600087803b15801561115057600080fd5b505af1158015611164573d6000803e3d6000fd5b5050505050505050505050565b6111796115f5565b6111b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111af90612a16565b60405180910390fd5b6111c18161171a565b50565b6111cc6115f5565b61120b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120290612a16565b60405180910390fd5b838390508686905014611253576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124a90612a36565b60405180910390fd5b81819050848490501461129b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129290612976565b60405180910390fd5b60008090505b868690508110156113885761137d8787838181106112bb57fe5b905060200201358686848181106112ce57fe5b905060200201358585858181106112e157fe5b90506020028101803560016020038336030381126112fe57600080fd5b8083019250508135905060208201915067ffffffffffffffff81111561132357600080fd5b60018102360382131561133557600080fd5b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506116a2565b8060010190506112a1565b50505050505050565b6060600080905060008390505b600081146113c0578180600101925050601081816113b857fe5b04905061139e565b6060826040519080825280601f01601f1916602001820160405280156113f55781602001600182028038833980820191505090505b50905060008090505b83811015611474576010868161141057fe5b06925061141c8361184a565b826001838703038151811061142d57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506010868161146657fe5b0495508060010190506113fe565b50809350505050919050565b6060808390506060839050606081518351016040519080825280601f01601f1916602001820160405280156114c45781602001600182028038833980820191505090505b509050606081905060008090506000809050600090505b8551811015611549578581815181106114f057fe5b602001015160f81c60f81b83838060010194508151811061150d57fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535080806001019150506114db565b600090505b84518110156115bc5784818151811061156357fe5b602001015160f81c60f81b83838060010194508151811061158057fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350808060010191505061154e565b82965050505050505092915050565b60006003600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b600080828401905083811015611698576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168f90612916565b60405180910390fd5b8091505092915050565b8060046000858152602001908152602001600020600084815260200190815260200160002090805190602001906116da9291906118f3565b50827f7c77b0a5e04b8b0a37a64aa8dd7a24c2cdfb5f2302c065c6044b33077b96abaa838360405161170d929190612a71565b60405180910390a2505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561178a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611781906128f6565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008160ff16600011158015611864575060098260ff1611155b1561189957817f300000000000000000000000000000000000000000000000000000000000000060f81c0160f81b90506118ee565b8160ff16600a111580156118b15750600f8260ff1611155b156118e957600a827f610000000000000000000000000000000000000000000000000000000000000060f81c010360f81b90506118ee565b600080fd5b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061193457805160ff1916838001178555611962565b82800160010185558215611962579182015b82811115611961578251825591602001919060010190611946565b5b50905061196f9190611973565b5090565b61199591905b80821115611991576000816000905550600101611979565b5090565b90565b6000813590506119a781612c7f565b92915050565b60008083601f8401126119bf57600080fd5b8235905067ffffffffffffffff8111156119d857600080fd5b6020830191508360208202830111156119f057600080fd5b9250929050565b600082601f830112611a0857600080fd5b8135611a1b611a1682612af7565b612aca565b91508181835260208401935060208101905083856020840282011115611a4057600080fd5b60005b83811015611a705781611a568882611998565b845260208401935060208301925050600181019050611a43565b5050505092915050565b60008083601f840112611a8c57600080fd5b8235905067ffffffffffffffff811115611aa557600080fd5b602083019150836020820283011115611abd57600080fd5b9250929050565b60008083601f840112611ad657600080fd5b8235905067ffffffffffffffff811115611aef57600080fd5b602083019150836020820283011115611b0757600080fd5b9250929050565b600082601f830112611b1f57600080fd5b8135611b32611b2d82612b1f565b612aca565b91508181835260208401935060208101905083856020840282011115611b5757600080fd5b60005b83811015611b875781611b6d8882611c4f565b845260208401935060208301925050600181019050611b5a565b5050505092915050565b600081359050611ba081612c96565b92915050565b600081359050611bb581612cad565b92915050565b60008083601f840112611bcd57600080fd5b8235905067ffffffffffffffff811115611be657600080fd5b602083019150836001820283011115611bfe57600080fd5b9250929050565b60008083601f840112611c1757600080fd5b8235905067ffffffffffffffff811115611c3057600080fd5b602083019150836001820283011115611c4857600080fd5b9250929050565b600081359050611c5e81612cc4565b92915050565b600060208284031215611c7657600080fd5b6000611c8484828501611998565b91505092915050565b60008060408385031215611ca057600080fd5b6000611cae85828601611998565b9250506020611cbf85828601611998565b9150509250929050565b60008060008060008060008060a0898b031215611ce557600080fd5b6000611cf38b828c01611998565b9850506020611d048b828c01611998565b975050604089013567ffffffffffffffff811115611d2157600080fd5b611d2d8b828c01611ac4565b9650965050606089013567ffffffffffffffff811115611d4c57600080fd5b611d588b828c01611ac4565b9450945050608089013567ffffffffffffffff811115611d7757600080fd5b611d838b828c01611bbb565b92509250509295985092959890939650565b60008060008060008060a08789031215611dae57600080fd5b6000611dbc89828a01611998565b9650506020611dcd89828a01611998565b9550506040611dde89828a01611c4f565b9450506060611def89828a01611c4f565b935050608087013567ffffffffffffffff811115611e0c57600080fd5b611e1889828a01611bbb565b92509250509295509295509295565b60008060408385031215611e3a57600080fd5b6000611e4885828601611998565b9250506020611e5985828601611b91565b9150509250929050565b60008060408385031215611e7657600080fd5b6000611e8485828601611998565b9250506020611e9585828601611c4f565b9150509250929050565b60008060408385031215611eb257600080fd5b600083013567ffffffffffffffff811115611ecc57600080fd5b611ed8858286016119f7565b925050602083013567ffffffffffffffff811115611ef557600080fd5b611f0185828601611b0e565b9150509250929050565b60008060008060008060608789031215611f2457600080fd5b600087013567ffffffffffffffff811115611f3e57600080fd5b611f4a89828a01611ac4565b9650965050602087013567ffffffffffffffff811115611f6957600080fd5b611f7589828a016119ad565b9450945050604087013567ffffffffffffffff811115611f9457600080fd5b611fa089828a01611ac4565b92509250509295509295509295565b60008060008060008060608789031215611fc857600080fd5b600087013567ffffffffffffffff811115611fe257600080fd5b611fee89828a01611ac4565b9650965050602087013567ffffffffffffffff81111561200d57600080fd5b61201989828a01611ac4565b9450945050604087013567ffffffffffffffff81111561203857600080fd5b61204489828a01611a7a565b92509250509295509295509295565b60006020828403121561206557600080fd5b600061207384828501611ba6565b91505092915050565b60006020828403121561208e57600080fd5b600061209c84828501611c4f565b91505092915050565b600080600080606085870312156120bb57600080fd5b60006120c987828801611c4f565b94505060206120da87828801611c4f565b935050604085013567ffffffffffffffff8111156120f757600080fd5b61210387828801611c05565b925092505092959194509250565b600061211d8383612732565b60208301905092915050565b61213281612bb8565b82525050565b60006121448385612b85565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561217357600080fd5b602083029250612184838584612c2c565b82840190509392505050565b600061219b82612b57565b6121a58185612b85565b93506121b083612b47565b8060005b838110156121e15781516121c88882612111565b97506121d383612b78565b9250506001810190506121b4565b5085935050505092915050565b6121f781612bca565b82525050565b60006122098385612b96565b9350612216838584612c2c565b61221f83612c6e565b840190509392505050565b600061223582612b6d565b61223f8185612ba7565b935061224f818560208601612c3b565b61225881612c6e565b840191505092915050565b600061226e82612b62565b6122788185612ba7565b9350612288818560208601612c3b565b61229181612c6e565b840191505092915050565b60006122a9601d83612ba7565b91507f455243313135354c6f636b61626c653a20546f6b656e206c6f636b65640000006000830152602082019050919050565b60006122e9602b83612ba7565b91507f455243313135353a2062616c616e636520717565727920666f7220746865207a60008301527f65726f20616464726573730000000000000000000000000000000000000000006020830152604082019050919050565b600061234f602683612ba7565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006123b5601b83612ba7565b91507f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006000830152602082019050919050565b60006123f5603483612ba7565b91507f5374617368426c6f783a2069647320616e6420726563697069656e7473206d7560008301527f737420686176652073616d65206c656e677468730000000000000000000000006020830152604082019050919050565b600061245b602c83612ba7565b91507f455243313135353a2063616e6e6f742073657420617070726f76616c2073746160008301527f74757320666f722073656c6600000000000000000000000000000000000000006020830152604082019050919050565b60006124c1603283612ba7565b91507f5374617368426c6f783a2068617368657320616e64206e616d6573206d75737460008301527f20686176652073616d65206c656e6774687300000000000000000000000000006020830152604082019050919050565b6000612527603083612ba7565b91507f455243313135353a206163636f756e747320616e6420494473206d757374206860008301527f6176652073616d65206c656e67746873000000000000000000000000000000006020830152604082019050919050565b600061258d603783612ba7565b91507f5374617368426c6f783a20726563697069656e747320616e642076616c75657360008301527f206d75737420686176652073616d65206c656e677468730000000000000000006020830152604082019050919050565b60006125f3603483612ba7565b91507f455243313135353a20736f6d65206164647265737320696e206261746368206260008301527f616c616e6365207175657279206973207a65726f0000000000000000000000006020830152604082019050919050565b6000612659601f83612ba7565b91507f5374617368426c6f783a20546f6b656e20616c7265616479206d696e746564006000830152602082019050919050565b6000612699602083612ba7565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b60006126d9603083612ba7565b91507f5374617368426c6f783a2069647320616e6420686173686573206d757374206860008301527f6176652073616d65206c656e67746873000000000000000000000000000000006020830152604082019050919050565b61273b81612c22565b82525050565b61274a81612c22565b82525050565b60006020820190506127656000830184612129565b92915050565b600060a082019050612780600083018b612129565b61278d602083018a612129565b81810360408301526127a081888a612138565b905081810360608301526127b5818688612138565b905081810360808301526127ca8184866121fd565b90509998505050505050505050565b600060a0820190506127ee6000830189612129565b6127fb6020830188612129565b6128086040830187612741565b6128156060830186612741565b81810360808301526128288184866121fd565b9050979650505050505050565b6000602082019050818103600083015261284f8184612190565b905092915050565b600060208201905061286c60008301846121ee565b92915050565b6000602082019050818103600083015261288c8184612263565b905092915050565b600060208201905081810360008301526128ae818461222a565b905092915050565b600060208201905081810360008301526128cf8161229c565b9050919050565b600060208201905081810360008301526128ef816122dc565b9050919050565b6000602082019050818103600083015261290f81612342565b9050919050565b6000602082019050818103600083015261292f816123a8565b9050919050565b6000602082019050818103600083015261294f816123e8565b9050919050565b6000602082019050818103600083015261296f8161244e565b9050919050565b6000602082019050818103600083015261298f816124b4565b9050919050565b600060208201905081810360008301526129af8161251a565b9050919050565b600060208201905081810360008301526129cf81612580565b9050919050565b600060208201905081810360008301526129ef816125e6565b9050919050565b60006020820190508181036000830152612a0f8161264c565b9050919050565b60006020820190508181036000830152612a2f8161268c565b9050919050565b60006020820190508181036000830152612a4f816126cc565b9050919050565b6000602082019050612a6b6000830184612741565b92915050565b6000604082019050612a866000830185612741565b8181036020830152612a98818461222a565b90509392505050565b6000604082019050612ab66000830185612741565b612ac36020830184612741565b9392505050565b6000604051905081810181811067ffffffffffffffff82111715612aed57600080fd5b8060405250919050565b600067ffffffffffffffff821115612b0e57600080fd5b602082029050602081019050919050565b600067ffffffffffffffff821115612b3657600080fd5b602082029050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000612bc382612c02565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612c59578082015181840152602081019050612c3e565b83811115612c68576000848401525b50505050565b6000601f19601f8301169050919050565b612c8881612bb8565b8114612c9357600080fd5b50565b612c9f81612bca565b8114612caa57600080fd5b50565b612cb681612bd6565b8114612cc157600080fd5b50565b612ccd81612c22565b8114612cd857600080fd5b5056fea365627a7a72315820a676992e73ebbf1b47c60935731fd1aabfd51e9134a8c2c2412cfafc64d59f5a6c6578706572696d656e74616cf564736f6c634300050c0040",
  "sourceMap": "232:1555:0:-;;;692:30:9;711:10;692:18;;;:30;;:::i;:::-;232:1555:0;;1431:225:9;1524:1;1504:22;;:8;:22;;;;1496:73;;;;;;;;;;;;;;;;;;;;;;1613:8;1584:38;;1605:6;;;;;;;;;;;1584:38;;;;;;;;;;;;1641:8;1632:6;;:17;;;;;;;;;;;;;;;;;;1431:225;:::o;6:465:-1:-;;166:67;230:2;225:3;166:67;;;159:74;;266:66;262:1;257:3;253:11;246:87;367:66;362:2;357:3;353:12;346:88;462:2;457:3;453:12;446:19;;152:319;;;;479:407;;670:2;659:9;655:18;647:26;;720:9;714:4;710:20;706:1;695:9;691:17;684:47;745:131;871:4;745:131;;;737:139;;641:245;;;;894:163;;1009:6;1004:3;997:19;1046:4;1041:3;1037:14;1022:29;;990:67;;;;;232:1555:0;;;;;;;",
  "deployedSourceMap": "232:1555:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;232:1555:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1700:211:1;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;1114:246;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;379:125:4;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;1238:304:3;;;;;;;;;;;;;;;;:::i;:::-;;2235:608:1;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;679:926:0;;;;;;;;;;;;;;;;:::i;:::-;;183:78:2;;;:::i;:::-;;;;;;;;;;;;;;;;1501:153;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;213:84:3;;;;;;;;;;;;;;;;:::i;:::-;;772:199:2;;;;;;;;;;;;;;;;:::i;:::-;;805:77:9;;;:::i;:::-;;;;;;;;;;;;;;;;3321:287:1;;;;;;;;;;;;;;;;:::i;:::-;;396:105:3;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;1682:102:0;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;239:65:4;;;:::i;:::-;;;;;;;;;;;;;;;;303:87:3;;;;;;;;;;;;;;;;:::i;:::-;;3889:149:1;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;966:266:3;;;;;;;;;;;;;;;;:::i;:::-;;1223:107:9;;;;;;;;;;;;;;;;:::i;:::-;;977:518:2;;;;;;;;;;;;;;;;:::i;:::-;;1700:211:1;1769:7;1815:1;1796:21;;:7;:21;;;;1788:77;;;;;;;;;;;;;;;;;;;;;;1882:9;:13;1892:2;1882:13;;;;;;;;;;;:22;1896:7;1882:22;;;;;;;;;;;;;;;;1875:29;;1700:211;;;;:::o;1114:246::-;1185:4;499:10;1219:26;;1203:42;;;:12;:42;;;;:99;;;;569:10;1275:27;;1259:43;;;:12;:43;;;;1203:99;1199:135;;;1321:4;1314:11;;;;1199:135;1348:5;1341:12;;1114:246;;;;:::o;379:125:4:-;427:13;459:38;470:8;;;;;;;;;;;;;;;;;480:16;493:2;480:12;:16::i;:::-;459:10;:38::i;:::-;452:45;;379:125;;;:::o;1238:304:3:-;1452:3;;749:211;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;749:211:3;;;;;;817:9;829:1;817:13;;812:131;836:3;:10;832:1;:14;812:131;;;876:22;891:3;895:1;891:6;;;;;;;;;;;;;;876:14;:22::i;:::-;875:23;867:65;;;;;;;;;;;;;;;;;;;;;;848:3;;;;;812:131;;;;1479:4;1471:35;;;1507:4;1513:2;1517:3;;1522:6;;1530:4;;1471:64;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1471:64:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1471:64:3;;;;1238:304;;;;;;;;;:::o;2235:608:1:-;2375:16;2434:3;:10;2415:8;:15;:29;2407:90;;;;;;;;;;;;;;;;;;;;;;2508:30;2555:8;:15;2541:30;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;148:4;140:6;136:17;126:27;;0:157;2541:30:1;;;;2508:63;;2587:9;2599:1;2587:13;;2582:224;2606:8;:15;2602:1;:19;2582:224;;;2673:1;2650:25;;:8;2659:1;2650:11;;;;;;;;;;;;;;:25;;;;2642:90;;;;;;;;;;;;;;;;;;;;;;2765:9;:17;2775:3;2779:1;2775:6;;;;;;;;;;;;;;2765:17;;;;;;;;;;;:30;2783:8;2792:1;2783:11;;;;;;;;;;;;;;2765:30;;;;;;;;;;;;;;;;2746:13;2760:1;2746:16;;;;;;;;;;;;;:49;;;;;2623:3;;;;;2582:224;;;;2823:13;2816:20;;;2235:608;;;;:::o;679:926:0:-;1009:10:9;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;887:10:0;;:17;;873:3;;:10;;:31;865:96;;;;;;;;;;;;;;;;;;;;;;1000:6;;:13;;979:10;;:17;;:34;971:102;;;;;;;;;;;;;;;;;;;;;;1088:9;1100:1;1088:13;;1083:119;1107:3;;:10;;1103:1;:14;1083:119;;;1165:1;1144:9;:17;1154:3;;1158:1;1154:6;;;;;;;;;;;;;1144:17;;;;;;;;;;;;:22;1136:66;;;;;;;;;;;;;;;;;;;;;;1119:3;;;;;1083:119;;;;1218:9;1230:1;1218:13;;1213:386;1237:3;;:10;;1233:1;:14;1213:386;;;1268:10;1281:3;;1285:1;1281:6;;;;;;;;;;;;;1268:19;;1301:10;1314;;1325:1;1314:13;;;;;;;;;;;;;;;;;;;;;;1301:26;;1341:13;1357:6;;1364:1;1357:9;;;;;;;;;;;;;1341:25;;1396:24;1414:5;1396:9;:13;1406:2;1396:13;;;;;;;;;;;;:17;;:24;;;;:::i;:::-;1380:9;:13;1390:2;1380:13;;;;;;;;;;;:40;;;;1454:28;1476:5;1454:9;:13;1464:2;1454:13;;;;;;;;;;;:17;1468:2;1454:17;;;;;;;;;;;;;;;;:21;;:28;;;;:::i;:::-;1434:9;:13;1444:2;1434:13;;;;;;;;;;;:17;1448:2;1434:17;;;;;;;;;;;;;;;:48;;;;1540:2;1501:53;;1536:1;1501:53;;1516:10;1501:53;;;1544:2;1548:5;1501:53;;;;;;;;;;;;;;;;1213:386;;;1249:3;;;;;1213:386;;;;679:926;;;;;;:::o;183:78:2:-;;;;;;;;;;;;;;;;;;;:::o;1501:153::-;1562:13;1594:53;1605:18;;;;;;;;;;;;;;;;;1625:21;1638:7;1625:12;:21::i;:::-;1594:10;:53::i;:::-;1587:60;;1501:153;;;:::o;213:84:3:-;1009:10:9;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;286:4:3;273:6;:10;280:2;273:10;;;;;;;;;;;;:17;;;;;;;;;;;;;;;;;;213:84;:::o;772:199:2:-;1009:10:9;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;930:34:2;943:2;947:7;956;;930:34;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;930:34:2;;;;;;:12;:34::i;:::-;772:199;;;;:::o;805:77:9:-;843:7;869:6;;;;;;;;;;;862:13;;805:77;:::o;3321:287:1:-;3422:8;3408:22;;:10;:22;;;;3400:79;;;;;;;;;;;;;;;;;;;;;;3532:8;3489:18;:30;3508:10;3489:30;;;;;;;;;;;;;;;:40;3520:8;3489:40;;;;;;;;;;;;;;;;:51;;;;;;;;;;;;;;;;;;3582:8;3555:46;;3570:10;3555:46;;;3592:8;3555:46;;;;;;;;;;;;;;;3321:287;;:::o;396:105:3:-;454:4;476:18;491:2;476:14;:18::i;:::-;469:25;;396:105;;;:::o;1682:102:0:-;1738:7;1764:9;:13;1774:2;1764:13;;;;;;;;;;;;1757:20;;1682:102;;;:::o;239:65:4:-;;;;;;;;;;;;;;;;;;;:::o;303:87:3:-;1009:10:9;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;378:5:3;365:6;:10;372:2;365:10;;;;;;;;;;;;:18;;;;;;;;;;;;;;;;;;303:87;:::o;3889:149:1:-;3971:4;3994:18;:27;4013:7;3994:27;;;;;;;;;;;;;;;:37;4022:8;3994:37;;;;;;;;;;;;;;;;;;;;;;;;;3987:44;;3889:149;;;;:::o;966:266:3:-;1150:2;673:18;688:2;673:14;:18::i;:::-;672:19;664:61;;;;;;;;;;;;;;;;;;;;;;1176:4;1168:30;;;1199:4;1205:2;1209;1213:5;1220:4;;1168:57;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1168:57:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1168:57:3;;;;966:266;;;;;;;:::o;1223:107:9:-;1009:10;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;1295:28;1314:8;1295:18;:28::i;:::-;1223:107;:::o;977:518:2:-;1009:10:9;:8;:10::i;:::-;1001:55;;;;;;;;;;;;;;;;;;;;;;1188:9:2;;:16;;1174:3;;:10;;:30;1166:91;;;;;;;;;;;;;;;;;;;;;;1295:8;;:15;;1275:9;;:16;;:35;1267:98;;;;;;;;;;;;;;;;;;;;;;1381:9;1393:1;1381:13;;1376:113;1400:3;;:10;;1396:1;:14;1376:113;;;1431:47;1444:3;;1448:1;1444:6;;;;;;;;;;;;;1452:9;;1462:1;1452:12;;;;;;;;;;;;;1466:8;;1475:1;1466:11;;;;;;;;;;;;;43::-1;30:25;137:1;131:4;127:12;116:8;100:14;96:29;92:48;72:18;68:73;58:2;;155:1;152;145:12;58:2;188:18;178:8;174:33;162:45;;0:210;29:8;16:22;6:32;;69:4;59:8;55:19;43:31;;93:18;85:6;82:30;79:2;;;125:1;122;115:12;79:2;183:3;175:6;171:16;155:14;151:37;141:8;137:52;134:2;;;202:1;199;192:12;134:2;1431:47:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1431:47:2;;;;;;:12;:47::i;:::-;1412:3;;;;;1376:113;;;;977:518;;;;;;:::o;901:419:13:-;954:13;979:10;992:1;979:14;;1003:6;1012:1;1003:10;;1023:68;1035:1;1030;:6;1023:68;;1052:7;;;;;;;1078:2;1073:7;;;;;;;;;1023:68;;;1100:16;1129:5;1119:16;;;;;;;;;;;;;;;;;;;;;;;;;29:1:-1;21:6;17:14;116:4;104:10;96:6;87:34;147:4;139:6;135:17;125:27;;0:156;1119:16:13;;;;1100:35;;1150:6;1157:1;1150:8;;1145:141;1162:5;1160:1;:7;1145:141;;;1196:2;1192:1;:6;;;;;;1188:10;;1233:21;1251:1;1233:11;:21::i;:::-;1212:3;1228:1;1224;1216:5;:9;:13;1212:18;;;;;;;;;;;:42;;;;;;;;;;;1273:2;1268:7;;;;;;;;;1169:3;;;;;1145:141;;;;1309:3;1295:18;;;;;901:419;;;:::o;54:515::-;131:13;156:16;181:1;156:27;;193:16;218:1;193:27;;230:16;273:3;:10;260:3;:10;:23;249:35;;;;;;;;;;;;;;;;;;;;;;;;;29:1:-1;21:6;17:14;116:4;104:10;96:6;87:34;147:4;139:6;135:17;125:27;;0:156;249:35:13;;;;230:54;;294:17;320:2;294:29;;333:6;342:1;333:10;;353:6;362:1;353:10;;382:1;378:5;;373:76;389:3;:10;385:1;:14;373:76;;;432:3;436:1;432:6;;;;;;;;;;;;;;;;420:4;425:3;;;;;;420:9;;;;;;;;;;;:18;;;;;;;;;;;401:3;;;;;;;373:76;;;467:1;463:5;;458:76;474:3;:10;470:1;:14;458:76;;;517:3;521:1;517:6;;;;;;;;;;;;;;;;505:4;510:3;;;;;;505:9;;;;;;;;;;;:18;;;;;;;;;;;486:3;;;;;;;458:76;;;557:4;543:19;;;;;;;;54:515;;;;:::o;507:99:3:-;566:4;589:6;:10;596:2;589:10;;;;;;;;;;;;;;;;;;;;;582:17;;507:99;;;:::o;1739:93:9:-;1782:4;1819:6;;;;;;;;;;;1805:20;;:10;:20;;;1798:27;;1739:93;:::o;835:176:12:-;893:7;912:9;928:1;924;:5;912:17;;952:1;947;:6;;939:46;;;;;;;;;;;;;;;;;;;;;;1003:1;996:8;;;835:176;;;;:::o;527:239:2:-;702:7;676:10;:14;687:2;676:14;;;;;;;;;;;:23;691:7;676:23;;;;;;;;;;;:33;;;;;;;;;;;;:::i;:::-;;738:2;724:35;742:7;751;724:35;;;;;;;;;;;;;;;;527:239;;;:::o;1431:225:9:-;1524:1;1504:22;;:8;:22;;;;1496:73;;;;;;;;;;;;;;;;;;;;;;1613:8;1584:38;;1605:6;;;;;;;;;;;1584:38;;;;;;;;;;;;1641:8;1632:6;;:17;;;;;;;;;;;;;;;;;;1431:225;:::o;575:320:13:-;628:4;653:1;648:6;;:1;:6;;:16;;;;;663:1;658;:6;;;;648:16;644:187;;;711:1;698:9;692:16;;:20;687:26;;680:33;;;;644:187;746:1;734:14;;:2;:14;;:32;;;;;764:2;758:1;752:14;;;;734:32;730:101;;;817:2;813:1;800:9;794:16;;:20;:25;789:31;;782:38;;;;730:101;880:8;;;575:320;;;;:::o;232:1555:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5:130:-1:-;;85:6;72:20;63:29;;97:33;124:5;97:33;;;57:78;;;;;160:352;;;290:3;283:4;275:6;271:17;267:27;257:2;;308:1;305;298:12;257:2;341:6;328:20;318:30;;368:18;360:6;357:30;354:2;;;400:1;397;390:12;354:2;434:4;426:6;422:17;410:29;;485:3;477:4;469:6;465:17;455:8;451:32;448:41;445:2;;;502:1;499;492:12;445:2;250:262;;;;;;538:707;;655:3;648:4;640:6;636:17;632:27;622:2;;673:1;670;663:12;622:2;710:6;697:20;732:80;747:64;804:6;747:64;;;732:80;;;723:89;;829:5;854:6;847:5;840:21;884:4;876:6;872:17;862:27;;906:4;901:3;897:14;890:21;;959:6;1006:3;998:4;990:6;986:17;981:3;977:27;974:36;971:2;;;1023:1;1020;1013:12;971:2;1048:1;1033:206;1058:6;1055:1;1052:13;1033:206;;;1116:3;1138:37;1171:3;1159:10;1138:37;;;1133:3;1126:50;1199:4;1194:3;1190:14;1183:21;;1227:4;1222:3;1218:14;1211:21;;1090:149;1080:1;1077;1073:9;1068:14;;1033:206;;;1037:14;615:630;;;;;;;;1270:360;;;1408:3;1401:4;1393:6;1389:17;1385:27;1375:2;;1426:1;1423;1416:12;1375:2;1459:6;1446:20;1436:30;;1486:18;1478:6;1475:30;1472:2;;;1518:1;1515;1508:12;1472:2;1552:4;1544:6;1540:17;1528:29;;1603:3;1595:4;1587:6;1583:17;1573:8;1569:32;1566:41;1563:2;;;1620:1;1617;1610:12;1563:2;1368:262;;;;;;1656:352;;;1786:3;1779:4;1771:6;1767:17;1763:27;1753:2;;1804:1;1801;1794:12;1753:2;1837:6;1824:20;1814:30;;1864:18;1856:6;1853:30;1850:2;;;1896:1;1893;1886:12;1850:2;1930:4;1922:6;1918:17;1906:29;;1981:3;1973:4;1965:6;1961:17;1951:8;1947:32;1944:41;1941:2;;;1998:1;1995;1988:12;1941:2;1746:262;;;;;;2034:707;;2151:3;2144:4;2136:6;2132:17;2128:27;2118:2;;2169:1;2166;2159:12;2118:2;2206:6;2193:20;2228:80;2243:64;2300:6;2243:64;;;2228:80;;;2219:89;;2325:5;2350:6;2343:5;2336:21;2380:4;2372:6;2368:17;2358:27;;2402:4;2397:3;2393:14;2386:21;;2455:6;2502:3;2494:4;2486:6;2482:17;2477:3;2473:27;2470:36;2467:2;;;2519:1;2516;2509:12;2467:2;2544:1;2529:206;2554:6;2551:1;2548:13;2529:206;;;2612:3;2634:37;2667:3;2655:10;2634:37;;;2629:3;2622:50;2695:4;2690:3;2686:14;2679:21;;2723:4;2718:3;2714:14;2707:21;;2586:149;2576:1;2573;2569:9;2564:14;;2529:206;;;2533:14;2111:630;;;;;;;;2749:124;;2826:6;2813:20;2804:29;;2838:30;2862:5;2838:30;;;2798:75;;;;;2880:128;;2959:6;2946:20;2937:29;;2971:32;2997:5;2971:32;;;2931:77;;;;;3029:335;;;3143:3;3136:4;3128:6;3124:17;3120:27;3110:2;;3161:1;3158;3151:12;3110:2;3194:6;3181:20;3171:30;;3221:18;3213:6;3210:30;3207:2;;;3253:1;3250;3243:12;3207:2;3287:4;3279:6;3275:17;3263:29;;3337:3;3330;3322:6;3318:16;3308:8;3304:31;3301:40;3298:2;;;3354:1;3351;3344:12;3298:2;3103:261;;;;;;3387:336;;;3502:3;3495:4;3487:6;3483:17;3479:27;3469:2;;3520:1;3517;3510:12;3469:2;3553:6;3540:20;3530:30;;3580:18;3572:6;3569:30;3566:2;;;3612:1;3609;3602:12;3566:2;3646:4;3638:6;3634:17;3622:29;;3696:3;3689;3681:6;3677:16;3667:8;3663:31;3660:40;3657:2;;;3713:1;3710;3703:12;3657:2;3462:261;;;;;;3731:130;;3811:6;3798:20;3789:29;;3823:33;3850:5;3823:33;;;3783:78;;;;;3868:241;;3972:2;3960:9;3951:7;3947:23;3943:32;3940:2;;;3988:1;3985;3978:12;3940:2;4023:1;4040:53;4085:7;4076:6;4065:9;4061:22;4040:53;;;4030:63;;4002:97;3934:175;;;;;4116:366;;;4237:2;4225:9;4216:7;4212:23;4208:32;4205:2;;;4253:1;4250;4243:12;4205:2;4288:1;4305:53;4350:7;4341:6;4330:9;4326:22;4305:53;;;4295:63;;4267:97;4395:2;4413:53;4458:7;4449:6;4438:9;4434:22;4413:53;;;4403:63;;4374:98;4199:283;;;;;;4489:1179;;;;;;;;;4750:3;4738:9;4729:7;4725:23;4721:33;4718:2;;;4767:1;4764;4757:12;4718:2;4802:1;4819:53;4864:7;4855:6;4844:9;4840:22;4819:53;;;4809:63;;4781:97;4909:2;4927:53;4972:7;4963:6;4952:9;4948:22;4927:53;;;4917:63;;4888:98;5045:2;5034:9;5030:18;5017:32;5069:18;5061:6;5058:30;5055:2;;;5101:1;5098;5091:12;5055:2;5129:80;5201:7;5192:6;5181:9;5177:22;5129:80;;;5119:90;;;;4996:219;5274:2;5263:9;5259:18;5246:32;5298:18;5290:6;5287:30;5284:2;;;5330:1;5327;5320:12;5284:2;5358:80;5430:7;5421:6;5410:9;5406:22;5358:80;;;5348:90;;;;5225:219;5503:3;5492:9;5488:19;5475:33;5528:18;5520:6;5517:30;5514:2;;;5560:1;5557;5550:12;5514:2;5588:64;5644:7;5635:6;5624:9;5620:22;5588:64;;;5578:74;;;;5454:204;4712:956;;;;;;;;;;;;5675:867;;;;;;;5866:3;5854:9;5845:7;5841:23;5837:33;5834:2;;;5883:1;5880;5873:12;5834:2;5918:1;5935:53;5980:7;5971:6;5960:9;5956:22;5935:53;;;5925:63;;5897:97;6025:2;6043:53;6088:7;6079:6;6068:9;6064:22;6043:53;;;6033:63;;6004:98;6133:2;6151:53;6196:7;6187:6;6176:9;6172:22;6151:53;;;6141:63;;6112:98;6241:2;6259:53;6304:7;6295:6;6284:9;6280:22;6259:53;;;6249:63;;6220:98;6377:3;6366:9;6362:19;6349:33;6402:18;6394:6;6391:30;6388:2;;;6434:1;6431;6424:12;6388:2;6462:64;6518:7;6509:6;6498:9;6494:22;6462:64;;;6452:74;;;;6328:204;5828:714;;;;;;;;;6549:360;;;6667:2;6655:9;6646:7;6642:23;6638:32;6635:2;;;6683:1;6680;6673:12;6635:2;6718:1;6735:53;6780:7;6771:6;6760:9;6756:22;6735:53;;;6725:63;;6697:97;6825:2;6843:50;6885:7;6876:6;6865:9;6861:22;6843:50;;;6833:60;;6804:95;6629:280;;;;;;6916:366;;;7037:2;7025:9;7016:7;7012:23;7008:32;7005:2;;;7053:1;7050;7043:12;7005:2;7088:1;7105:53;7150:7;7141:6;7130:9;7126:22;7105:53;;;7095:63;;7067:97;7195:2;7213:53;7258:7;7249:6;7238:9;7234:22;7213:53;;;7203:63;;7174:98;6999:283;;;;;;7289:638;;;7460:2;7448:9;7439:7;7435:23;7431:32;7428:2;;;7476:1;7473;7466:12;7428:2;7539:1;7528:9;7524:17;7511:31;7562:18;7554:6;7551:30;7548:2;;;7594:1;7591;7584:12;7548:2;7614:78;7684:7;7675:6;7664:9;7660:22;7614:78;;;7604:88;;7490:208;7757:2;7746:9;7742:18;7729:32;7781:18;7773:6;7770:30;7767:2;;;7813:1;7810;7803:12;7767:2;7833:78;7903:7;7894:6;7883:9;7879:22;7833:78;;;7823:88;;7708:209;7422:505;;;;;;7934:959;;;;;;;8177:2;8165:9;8156:7;8152:23;8148:32;8145:2;;;8193:1;8190;8183:12;8145:2;8256:1;8245:9;8241:17;8228:31;8279:18;8271:6;8268:30;8265:2;;;8311:1;8308;8301:12;8265:2;8339:80;8411:7;8402:6;8391:9;8387:22;8339:80;;;8329:90;;;;8207:218;8484:2;8473:9;8469:18;8456:32;8508:18;8500:6;8497:30;8494:2;;;8540:1;8537;8530:12;8494:2;8568:80;8640:7;8631:6;8620:9;8616:22;8568:80;;;8558:90;;;;8435:219;8713:2;8702:9;8698:18;8685:32;8737:18;8729:6;8726:30;8723:2;;;8769:1;8766;8759:12;8723:2;8797:80;8869:7;8860:6;8849:9;8845:22;8797:80;;;8787:90;;;;8664:219;8139:754;;;;;;;;;8900:975;;;;;;;9151:2;9139:9;9130:7;9126:23;9122:32;9119:2;;;9167:1;9164;9157:12;9119:2;9230:1;9219:9;9215:17;9202:31;9253:18;9245:6;9242:30;9239:2;;;9285:1;9282;9275:12;9239:2;9313:80;9385:7;9376:6;9365:9;9361:22;9313:80;;;9303:90;;;;9181:218;9458:2;9447:9;9443:18;9430:32;9482:18;9474:6;9471:30;9468:2;;;9514:1;9511;9504:12;9468:2;9542:80;9614:7;9605:6;9594:9;9590:22;9542:80;;;9532:90;;;;9409:219;9687:2;9676:9;9672:18;9659:32;9711:18;9703:6;9700:30;9697:2;;;9743:1;9740;9733:12;9697:2;9771:88;9851:7;9842:6;9831:9;9827:22;9771:88;;;9761:98;;;;9638:227;9113:762;;;;;;;;;9882:239;;9985:2;9973:9;9964:7;9960:23;9956:32;9953:2;;;10001:1;9998;9991:12;9953:2;10036:1;10053:52;10097:7;10088:6;10077:9;10073:22;10053:52;;;10043:62;;10015:96;9947:174;;;;;10128:241;;10232:2;10220:9;10211:7;10207:23;10203:32;10200:2;;;10248:1;10245;10238:12;10200:2;10283:1;10300:53;10345:7;10336:6;10325:9;10321:22;10300:53;;;10290:63;;10262:97;10194:175;;;;;10376:617;;;;;10534:2;10522:9;10513:7;10509:23;10505:32;10502:2;;;10550:1;10547;10540:12;10502:2;10585:1;10602:53;10647:7;10638:6;10627:9;10623:22;10602:53;;;10592:63;;10564:97;10692:2;10710:53;10755:7;10746:6;10735:9;10731:22;10710:53;;;10700:63;;10671:98;10828:2;10817:9;10813:18;10800:32;10852:18;10844:6;10841:30;10838:2;;;10884:1;10881;10874:12;10838:2;10912:65;10969:7;10960:6;10949:9;10945:22;10912:65;;;10902:75;;;;10779:204;10496:497;;;;;;;;11001:173;;11088:46;11130:3;11122:6;11088:46;;;11163:4;11158:3;11154:14;11140:28;;11081:93;;;;;11182:113;11265:24;11283:5;11265:24;;;11260:3;11253:37;11247:48;;;11333:466;;11479:86;11558:6;11553:3;11479:86;;;11472:93;;11592:65;11584:6;11581:77;11578:2;;;11671:1;11668;11661:12;11578:2;11704:4;11696:6;11692:17;11682:27;;11721:43;11757:6;11752:3;11745:5;11721:43;;;11786:6;11781:3;11777:16;11770:23;;11465:334;;;;;;11838:690;;11983:54;12031:5;11983:54;;;12050:86;12129:6;12124:3;12050:86;;;12043:93;;12157:56;12207:5;12157:56;;;12233:7;12261:1;12246:260;12271:6;12268:1;12265:13;12246:260;;;12338:6;12332:13;12359:63;12418:3;12403:13;12359:63;;;12352:70;;12439:60;12492:6;12439:60;;;12429:70;;12303:203;12293:1;12290;12286:9;12281:14;;12246:260;;;12250:14;12519:3;12512:10;;11962:566;;;;;;;;12536:104;12613:21;12628:5;12613:21;;;12608:3;12601:34;12595:45;;;12670:297;;12784:70;12847:6;12842:3;12784:70;;;12777:77;;12866:43;12902:6;12897:3;12890:5;12866:43;;;12931:29;12953:6;12931:29;;;12926:3;12922:39;12915:46;;12770:197;;;;;;12975:347;;13087:39;13120:5;13087:39;;;13138:71;13202:6;13197:3;13138:71;;;13131:78;;13214:52;13259:6;13254:3;13247:4;13240:5;13236:16;13214:52;;;13287:29;13309:6;13287:29;;;13282:3;13278:39;13271:46;;13067:255;;;;;;13329:339;;13437:35;13466:5;13437:35;;;13484:71;13548:6;13543:3;13484:71;;;13477:78;;13560:52;13605:6;13600:3;13593:4;13586:5;13582:16;13560:52;;;13633:29;13655:6;13633:29;;;13628:3;13624:39;13617:46;;13417:251;;;;;;13676:364;;13836:67;13900:2;13895:3;13836:67;;;13829:74;;13936:66;13932:1;13927:3;13923:11;13916:87;14031:2;14026:3;14022:12;14015:19;;13822:218;;;;14049:465;;14209:67;14273:2;14268:3;14209:67;;;14202:74;;14309:66;14305:1;14300:3;14296:11;14289:87;14410:66;14405:2;14400:3;14396:12;14389:88;14505:2;14500:3;14496:12;14489:19;;14195:319;;;;14523:465;;14683:67;14747:2;14742:3;14683:67;;;14676:74;;14783:66;14779:1;14774:3;14770:11;14763:87;14884:66;14879:2;14874:3;14870:12;14863:88;14979:2;14974:3;14970:12;14963:19;;14669:319;;;;14997:364;;15157:67;15221:2;15216:3;15157:67;;;15150:74;;15257:66;15253:1;15248:3;15244:11;15237:87;15352:2;15347:3;15343:12;15336:19;;15143:218;;;;15370:465;;15530:67;15594:2;15589:3;15530:67;;;15523:74;;15630:66;15626:1;15621:3;15617:11;15610:87;15731:66;15726:2;15721:3;15717:12;15710:88;15826:2;15821:3;15817:12;15810:19;;15516:319;;;;15844:465;;16004:67;16068:2;16063:3;16004:67;;;15997:74;;16104:66;16100:1;16095:3;16091:11;16084:87;16205:66;16200:2;16195:3;16191:12;16184:88;16300:2;16295:3;16291:12;16284:19;;15990:319;;;;16318:465;;16478:67;16542:2;16537:3;16478:67;;;16471:74;;16578:66;16574:1;16569:3;16565:11;16558:87;16679:66;16674:2;16669:3;16665:12;16658:88;16774:2;16769:3;16765:12;16758:19;;16464:319;;;;16792:465;;16952:67;17016:2;17011:3;16952:67;;;16945:74;;17052:66;17048:1;17043:3;17039:11;17032:87;17153:66;17148:2;17143:3;17139:12;17132:88;17248:2;17243:3;17239:12;17232:19;;16938:319;;;;17266:465;;17426:67;17490:2;17485:3;17426:67;;;17419:74;;17526:66;17522:1;17517:3;17513:11;17506:87;17627:66;17622:2;17617:3;17613:12;17606:88;17722:2;17717:3;17713:12;17706:19;;17412:319;;;;17740:465;;17900:67;17964:2;17959:3;17900:67;;;17893:74;;18000:66;17996:1;17991:3;17987:11;17980:87;18101:66;18096:2;18091:3;18087:12;18080:88;18196:2;18191:3;18187:12;18180:19;;17886:319;;;;18214:364;;18374:67;18438:2;18433:3;18374:67;;;18367:74;;18474:66;18470:1;18465:3;18461:11;18454:87;18569:2;18564:3;18560:12;18553:19;;18360:218;;;;18587:364;;18747:67;18811:2;18806:3;18747:67;;;18740:74;;18847:66;18843:1;18838:3;18834:11;18827:87;18942:2;18937:3;18933:12;18926:19;;18733:218;;;;18960:465;;19120:67;19184:2;19179:3;19120:67;;;19113:74;;19220:66;19216:1;19211:3;19207:11;19200:87;19321:66;19316:2;19311:3;19307:12;19300:88;19416:2;19411:3;19407:12;19400:19;;19106:319;;;;19433:103;19506:24;19524:5;19506:24;;;19501:3;19494:37;19488:48;;;19543:113;19626:24;19644:5;19626:24;;;19621:3;19614:37;19608:48;;;19663:213;;19781:2;19770:9;19766:18;19758:26;;19795:71;19863:1;19852:9;19848:17;19839:6;19795:71;;;19752:124;;;;;19883:1099;;20261:3;20250:9;20246:19;20238:27;;20276:71;20344:1;20333:9;20329:17;20320:6;20276:71;;;20358:72;20426:2;20415:9;20411:18;20402:6;20358:72;;;20478:9;20472:4;20468:20;20463:2;20452:9;20448:18;20441:48;20503:118;20616:4;20607:6;20599;20503:118;;;20495:126;;20669:9;20663:4;20659:20;20654:2;20643:9;20639:18;20632:48;20694:118;20807:4;20798:6;20790;20694:118;;;20686:126;;20861:9;20855:4;20851:20;20845:3;20834:9;20830:19;20823:49;20886:86;20967:4;20958:6;20950;20886:86;;;20878:94;;20232:750;;;;;;;;;;;;20989:763;;21247:3;21236:9;21232:19;21224:27;;21262:71;21330:1;21319:9;21315:17;21306:6;21262:71;;;21344:72;21412:2;21401:9;21397:18;21388:6;21344:72;;;21427;21495:2;21484:9;21480:18;21471:6;21427:72;;;21510;21578:2;21567:9;21563:18;21554:6;21510:72;;;21631:9;21625:4;21621:20;21615:3;21604:9;21600:19;21593:49;21656:86;21737:4;21728:6;21720;21656:86;;;21648:94;;21218:534;;;;;;;;;;21759:361;;21927:2;21916:9;21912:18;21904:26;;21977:9;21971:4;21967:20;21963:1;21952:9;21948:17;21941:47;22002:108;22105:4;22096:6;22002:108;;;21994:116;;21898:222;;;;;22127:201;;22239:2;22228:9;22224:18;22216:26;;22253:65;22315:1;22304:9;22300:17;22291:6;22253:65;;;22210:118;;;;;22335:293;;22469:2;22458:9;22454:18;22446:26;;22519:9;22513:4;22509:20;22505:1;22494:9;22490:17;22483:47;22544:74;22613:4;22604:6;22544:74;;;22536:82;;22440:188;;;;;22635:301;;22773:2;22762:9;22758:18;22750:26;;22823:9;22817:4;22813:20;22809:1;22798:9;22794:17;22787:47;22848:78;22921:4;22912:6;22848:78;;;22840:86;;22744:192;;;;;22943:407;;23134:2;23123:9;23119:18;23111:26;;23184:9;23178:4;23174:20;23170:1;23159:9;23155:17;23148:47;23209:131;23335:4;23209:131;;;23201:139;;23105:245;;;;23357:407;;23548:2;23537:9;23533:18;23525:26;;23598:9;23592:4;23588:20;23584:1;23573:9;23569:17;23562:47;23623:131;23749:4;23623:131;;;23615:139;;23519:245;;;;23771:407;;23962:2;23951:9;23947:18;23939:26;;24012:9;24006:4;24002:20;23998:1;23987:9;23983:17;23976:47;24037:131;24163:4;24037:131;;;24029:139;;23933:245;;;;24185:407;;24376:2;24365:9;24361:18;24353:26;;24426:9;24420:4;24416:20;24412:1;24401:9;24397:17;24390:47;24451:131;24577:4;24451:131;;;24443:139;;24347:245;;;;24599:407;;24790:2;24779:9;24775:18;24767:26;;24840:9;24834:4;24830:20;24826:1;24815:9;24811:17;24804:47;24865:131;24991:4;24865:131;;;24857:139;;24761:245;;;;25013:407;;25204:2;25193:9;25189:18;25181:26;;25254:9;25248:4;25244:20;25240:1;25229:9;25225:17;25218:47;25279:131;25405:4;25279:131;;;25271:139;;25175:245;;;;25427:407;;25618:2;25607:9;25603:18;25595:26;;25668:9;25662:4;25658:20;25654:1;25643:9;25639:17;25632:47;25693:131;25819:4;25693:131;;;25685:139;;25589:245;;;;25841:407;;26032:2;26021:9;26017:18;26009:26;;26082:9;26076:4;26072:20;26068:1;26057:9;26053:17;26046:47;26107:131;26233:4;26107:131;;;26099:139;;26003:245;;;;26255:407;;26446:2;26435:9;26431:18;26423:26;;26496:9;26490:4;26486:20;26482:1;26471:9;26467:17;26460:47;26521:131;26647:4;26521:131;;;26513:139;;26417:245;;;;26669:407;;26860:2;26849:9;26845:18;26837:26;;26910:9;26904:4;26900:20;26896:1;26885:9;26881:17;26874:47;26935:131;27061:4;26935:131;;;26927:139;;26831:245;;;;27083:407;;27274:2;27263:9;27259:18;27251:26;;27324:9;27318:4;27314:20;27310:1;27299:9;27295:17;27288:47;27349:131;27475:4;27349:131;;;27341:139;;27245:245;;;;27497:407;;27688:2;27677:9;27673:18;27665:26;;27738:9;27732:4;27728:20;27724:1;27713:9;27709:17;27702:47;27763:131;27889:4;27763:131;;;27755:139;;27659:245;;;;27911:407;;28102:2;28091:9;28087:18;28079:26;;28152:9;28146:4;28142:20;28138:1;28127:9;28123:17;28116:47;28177:131;28303:4;28177:131;;;28169:139;;28073:245;;;;28325:213;;28443:2;28432:9;28428:18;28420:26;;28457:71;28525:1;28514:9;28510:17;28501:6;28457:71;;;28414:124;;;;;28545:412;;28711:2;28700:9;28696:18;28688:26;;28725:71;28793:1;28782:9;28778:17;28769:6;28725:71;;;28844:9;28838:4;28834:20;28829:2;28818:9;28814:18;28807:48;28869:78;28942:4;28933:6;28869:78;;;28861:86;;28682:275;;;;;;28964:324;;29110:2;29099:9;29095:18;29087:26;;29124:71;29192:1;29181:9;29177:17;29168:6;29124:71;;;29206:72;29274:2;29263:9;29259:18;29250:6;29206:72;;;29081:207;;;;;;29295:256;;29357:2;29351:9;29341:19;;29395:4;29387:6;29383:17;29494:6;29482:10;29479:22;29458:18;29446:10;29443:34;29440:62;29437:2;;;29515:1;29512;29505:12;29437:2;29535:10;29531:2;29524:22;29335:216;;;;;29558:304;;29717:18;29709:6;29706:30;29703:2;;;29749:1;29746;29739:12;29703:2;29784:4;29776:6;29772:17;29764:25;;29847:4;29841;29837:15;29829:23;;29640:222;;;;29869:304;;30028:18;30020:6;30017:30;30014:2;;;30060:1;30057;30050:12;30014:2;30095:4;30087:6;30083:17;30075:25;;30158:4;30152;30148:15;30140:23;;29951:222;;;;30180:151;;30266:3;30258:11;;30304:4;30299:3;30295:14;30287:22;;30252:79;;;;30338:137;;30447:5;30441:12;30431:22;;30412:63;;;;30482:118;;30572:5;30566:12;30556:22;;30537:63;;;;30607:122;;30701:5;30695:12;30685:22;;30666:63;;;;30736:108;;30834:4;30829:3;30825:14;30817:22;;30811:33;;;;30852:178;;30982:6;30977:3;30970:19;31019:4;31014:3;31010:14;30995:29;;30963:67;;;;;31039:162;;31153:6;31148:3;31141:19;31190:4;31185:3;31181:14;31166:29;;31134:67;;;;;31210:163;;31325:6;31320:3;31313:19;31362:4;31357:3;31353:14;31338:29;;31306:67;;;;;31381:91;;31443:24;31461:5;31443:24;;;31432:35;;31426:46;;;;31479:85;;31552:5;31545:13;31538:21;31527:32;;31521:43;;;;31571:144;;31643:66;31636:5;31632:78;31621:89;;31615:100;;;;31722:121;;31795:42;31788:5;31784:54;31773:65;;31767:76;;;;31850:72;;31912:5;31901:16;;31895:27;;;;31930:145;32011:6;32006:3;32001;31988:30;32067:1;32058:6;32053:3;32049:16;32042:27;31981:94;;;;32084:268;32149:1;32156:101;32170:6;32167:1;32164:13;32156:101;;;32246:1;32241:3;32237:11;32231:18;32227:1;32222:3;32218:11;32211:39;32192:2;32189:1;32185:10;32180:15;;32156:101;;;32272:6;32269:1;32266:13;32263:2;;;32337:1;32328:6;32323:3;32319:16;32312:27;32263:2;32133:219;;;;;32360:97;;32448:2;32444:7;32439:2;32432:5;32428:14;32424:28;32414:38;;32408:49;;;;32465:117;32534:24;32552:5;32534:24;;;32527:5;32524:35;32514:2;;32573:1;32570;32563:12;32514:2;32508:74;;32589:111;32655:21;32670:5;32655:21;;;32648:5;32645:32;32635:2;;32691:1;32688;32681:12;32635:2;32629:71;;32707:115;32775:23;32792:5;32775:23;;;32768:5;32765:34;32755:2;;32813:1;32810;32803:12;32755:2;32749:73;;32829:117;32898:24;32916:5;32898:24;;;32891:5;32888:35;32878:2;;32937:1;32934;32927:12;32878:2;32872:74;",
  "source": "pragma solidity ^0.5.12;\npragma experimental ABIEncoderV2;\n\nimport './lib/ERC1155/ERC1155Lockable.sol';\nimport './lib/ERC1155/ERC1155Documents.sol';\nimport './lib/ERC1155/ERC1155Metadata.sol';\nimport './lib/utils/StringUtils.sol';\n\ncontract StashBlox is ERC1155Lockable, ERC1155Documents, ERC1155Metadata {\n\n    // Mapping from token ID to Supply\n    mapping (uint256 => uint256) private _supplies;\n\n    /**\n     * @dev Function to mint an amount of a token with the given ID.\n     * @param ids ID of the token to be minted\n     * @param recipients The addresses that will own the minted token\n     * @param values Amount of the token to be minted for each recipient\n     */\n    function createToken(uint256[] calldata ids,\n                         address[] calldata recipients,\n                         uint256[] calldata values)\n    external onlyOwner {\n        require(ids.length == recipients.length, \"StashBlox: ids and recipients must have same lengths\");\n        require(recipients.length == values.length, \"StashBlox: recipients and values must have same lengths\");\n        for (uint256 i = 0; i < ids.length; ++i)\n            require(_supplies[ids[i]] == 0, \"StashBlox: Token already minted\");\n\n        for (uint256 i = 0; i < ids.length; ++i) {\n            uint256 id = ids[i];\n            address to = recipients[i];\n            uint256 value = values[i];\n            _supplies[id] = _supplies[id].add(value);\n            _balances[id][to] = _balances[id][to].add(value);\n            emit TransferSingle(msg.sender, address(0), to, id, value);\n            // emit URI(uri, id);\n        }\n    }\n\n\n    /**\n     * @param id Token ID\n     * @return Token supply\n     */\n    function totalSupply(uint256 id) external view returns (uint256) {\n        return _supplies[id];\n    }\n\n}\n",
  "sourcePath": "/home/ouziel/Work/StashBloxContracts/contracts/StashBlox.sol",
  "ast": {
    "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/StashBlox.sol",
    "exportedSymbols": {
      "StashBlox": [
        153
      ]
    },
    "id": 154,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".12"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:0"
      },
      {
        "id": 2,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "25:33:0"
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Lockable.sol",
        "file": "./lib/ERC1155/ERC1155Lockable.sol",
        "id": 3,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 979,
        "src": "60:43:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Documents.sol",
        "file": "./lib/ERC1155/ERC1155Documents.sol",
        "id": 4,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 797,
        "src": "104:44:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Metadata.sol",
        "file": "./lib/ERC1155/ERC1155Metadata.sol",
        "id": 5,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 1007,
        "src": "149:43:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/utils/StringUtils.sol",
        "file": "./lib/utils/StringUtils.sol",
        "id": 6,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 1734,
        "src": "193:37:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 7,
              "name": "ERC1155Lockable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 978,
              "src": "254:15:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Lockable_$978",
                "typeString": "contract ERC1155Lockable"
              }
            },
            "id": 8,
            "nodeType": "InheritanceSpecifier",
            "src": "254:15:0"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 9,
              "name": "ERC1155Documents",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 796,
              "src": "271:16:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Documents_$796",
                "typeString": "contract ERC1155Documents"
              }
            },
            "id": 10,
            "nodeType": "InheritanceSpecifier",
            "src": "271:16:0"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11,
              "name": "ERC1155Metadata",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1006,
              "src": "289:15:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Metadata_$1006",
                "typeString": "contract ERC1155Metadata"
              }
            },
            "id": 12,
            "nodeType": "InheritanceSpecifier",
            "src": "289:15:0"
          }
        ],
        "contractDependencies": [
          654,
          796,
          978,
          1006,
          1114,
          1124,
          1169,
          1257,
          1276,
          1733
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 153,
        "linearizedBaseContracts": [
          153,
          1006,
          796,
          1733,
          1124,
          978,
          1257,
          1276,
          654,
          1114,
          1169
        ],
        "name": "StashBlox",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 16,
            "name": "_supplies",
            "nodeType": "VariableDeclaration",
            "scope": 153,
            "src": "351:46:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
              "typeString": "mapping(uint256 => uint256)"
            },
            "typeName": {
              "id": 15,
              "keyType": {
                "id": 13,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "360:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "351:28:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                "typeString": "mapping(uint256 => uint256)"
              },
              "valueType": {
                "id": 14,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "371:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 139,
              "nodeType": "Block",
              "src": "855:750:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 35,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 31,
                            "name": "ids",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19,
                            "src": "873:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 32,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "873:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 33,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "887:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 34,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "887:17:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "873:31:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "5374617368426c6f783a2069647320616e6420726563697069656e7473206d75737420686176652073616d65206c656e67746873",
                        "id": 36,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "906:54:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_3c80a2ee9a9467e60d983237b78a741d439dcf9548c7a1ae4c68a3a52e077103",
                          "typeString": "literal_string \"StashBlox: ids and recipients must have same lengths\""
                        },
                        "value": "StashBlox: ids and recipients must have same lengths"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_3c80a2ee9a9467e60d983237b78a741d439dcf9548c7a1ae4c68a3a52e077103",
                          "typeString": "literal_string \"StashBlox: ids and recipients must have same lengths\""
                        }
                      ],
                      "id": 30,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        1751,
                        1752
                      ],
                      "referencedDeclaration": 1752,
                      "src": "865:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 37,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "865:96:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 38,
                  "nodeType": "ExpressionStatement",
                  "src": "865:96:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 44,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 40,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "979:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 41,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "979:17:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 42,
                            "name": "values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 25,
                            "src": "1000:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 43,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1000:13:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "979:34:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "5374617368426c6f783a20726563697069656e747320616e642076616c756573206d75737420686176652073616d65206c656e67746873",
                        "id": 45,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1015:57:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_5623f3b014745a33b4bd2ab0b5a1ece7ab13377d46736878cc8a8b0c6a96f5b0",
                          "typeString": "literal_string \"StashBlox: recipients and values must have same lengths\""
                        },
                        "value": "StashBlox: recipients and values must have same lengths"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_5623f3b014745a33b4bd2ab0b5a1ece7ab13377d46736878cc8a8b0c6a96f5b0",
                          "typeString": "literal_string \"StashBlox: recipients and values must have same lengths\""
                        }
                      ],
                      "id": 39,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        1751,
                        1752
                      ],
                      "referencedDeclaration": 1752,
                      "src": "971:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "971:102:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 47,
                  "nodeType": "ExpressionStatement",
                  "src": "971:102:0"
                },
                {
                  "body": {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 66,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 60,
                              "name": "_supplies",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 16,
                              "src": "1144:9:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                "typeString": "mapping(uint256 => uint256)"
                              }
                            },
                            "id": 64,
                            "indexExpression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 61,
                                "name": "ids",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19,
                                "src": "1154:3:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 63,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 62,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 49,
                                "src": "1158:1:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "1154:6:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1144:17:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 65,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1165:1:0",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "1144:22:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "5374617368426c6f783a20546f6b656e20616c7265616479206d696e746564",
                          "id": 67,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "string",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1168:33:0",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_stringliteral_92eee84c5387e2eaafffc850fe2ed735d64b2bc8edc56ed49462499f30e3b38c",
                            "typeString": "literal_string \"StashBlox: Token already minted\""
                          },
                          "value": "StashBlox: Token already minted"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          {
                            "typeIdentifier": "t_stringliteral_92eee84c5387e2eaafffc850fe2ed735d64b2bc8edc56ed49462499f30e3b38c",
                            "typeString": "literal_string \"StashBlox: Token already minted\""
                          }
                        ],
                        "id": 59,
                        "name": "require",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [
                          1751,
                          1752
                        ],
                        "referencedDeclaration": 1752,
                        "src": "1136:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                          "typeString": "function (bool,string memory) pure"
                        }
                      },
                      "id": 68,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1136:66:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 69,
                    "nodeType": "ExpressionStatement",
                    "src": "1136:66:0"
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 55,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 52,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "1103:1:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 53,
                        "name": "ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19,
                        "src": "1107:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      "id": 54,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1107:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1103:14:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 70,
                  "initializationExpression": {
                    "assignments": [
                      49
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 49,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 70,
                        "src": "1088:9:0",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 48,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "1088:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 51,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1100:1:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1088:13:0"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 57,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": true,
                      "src": "1119:3:0",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 56,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 49,
                        "src": "1121:1:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 58,
                    "nodeType": "ExpressionStatement",
                    "src": "1119:3:0"
                  },
                  "nodeType": "ForStatement",
                  "src": "1083:119:0"
                },
                {
                  "body": {
                    "id": 137,
                    "nodeType": "Block",
                    "src": "1254:345:0",
                    "statements": [
                      {
                        "assignments": [
                          83
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 83,
                            "name": "id",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1268:10:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 82,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "1268:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 87,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 84,
                            "name": "ids",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19,
                            "src": "1281:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 86,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 85,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1285:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1281:6:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1268:19:0"
                      },
                      {
                        "assignments": [
                          89
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 89,
                            "name": "to",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1301:10:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 88,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "1301:7:0",
                              "stateMutability": "nonpayable",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 93,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 90,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "1314:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 92,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 91,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1325:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1314:13:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1301:26:0"
                      },
                      {
                        "assignments": [
                          95
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 95,
                            "name": "value",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1341:13:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 94,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "1341:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 99,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 96,
                            "name": "values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 25,
                            "src": "1357:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 98,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 97,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1364:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1357:9:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1341:25:0"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 109,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 100,
                              "name": "_supplies",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 16,
                              "src": "1380:9:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                "typeString": "mapping(uint256 => uint256)"
                              }
                            },
                            "id": 102,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 101,
                              "name": "id",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 83,
                              "src": "1390:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "1380:13:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 107,
                                "name": "value",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 95,
                                "src": "1414:5:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "baseExpression": {
                                  "argumentTypes": null,
                                  "id": 103,
                                  "name": "_supplies",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 16,
                                  "src": "1396:9:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                    "typeString": "mapping(uint256 => uint256)"
                                  }
                                },
                                "id": 105,
                                "indexExpression": {
                                  "argumentTypes": null,
                                  "id": 104,
                                  "name": "id",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 83,
                                  "src": "1406:2:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "nodeType": "IndexAccess",
                                "src": "1396:13:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 106,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1345,
                              "src": "1396:17:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 108,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1396:24:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "1380:40:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 110,
                        "nodeType": "ExpressionStatement",
                        "src": "1380:40:0"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 124,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 111,
                                "name": "_balances",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 182,
                                "src": "1434:9:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_uint256_$_t_mapping$_t_address_$_t_uint256_$_$",
                                  "typeString": "mapping(uint256 => mapping(address => uint256))"
                                }
                              },
                              "id": 114,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 112,
                                "name": "id",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 83,
                                "src": "1444:2:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "1434:13:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                "typeString": "mapping(address => uint256)"
                              }
                            },
                            "id": 115,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 113,
                              "name": "to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 89,
                              "src": "1448:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "1434:17:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 122,
                                "name": "value",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 95,
                                "src": "1476:5:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "baseExpression": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 116,
                                    "name": "_balances",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 182,
                                    "src": "1454:9:0",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_mapping$_t_uint256_$_t_mapping$_t_address_$_t_uint256_$_$",
                                      "typeString": "mapping(uint256 => mapping(address => uint256))"
                                    }
                                  },
                                  "id": 118,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 117,
                                    "name": "id",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 83,
                                    "src": "1464:2:0",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "1454:13:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                    "typeString": "mapping(address => uint256)"
                                  }
                                },
                                "id": 120,
                                "indexExpression": {
                                  "argumentTypes": null,
                                  "id": 119,
                                  "name": "to",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 89,
                                  "src": "1468:2:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "nodeType": "IndexAccess",
                                "src": "1454:17:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 121,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1345,
                              "src": "1454:21:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 123,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1454:28:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "1434:48:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 125,
                        "nodeType": "ExpressionStatement",
                        "src": "1434:48:0"
                      },
                      {
                        "eventCall": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 127,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1748,
                                "src": "1516:3:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 128,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1516:10:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "hexValue": "30",
                                  "id": 130,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1536:1:0",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_0_by_1",
                                    "typeString": "int_const 0"
                                  },
                                  "value": "0"
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_rational_0_by_1",
                                    "typeString": "int_const 0"
                                  }
                                ],
                                "id": 129,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "nodeType": "ElementaryTypeNameExpression",
                                "src": "1528:7:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_address_$",
                                  "typeString": "type(address)"
                                },
                                "typeName": "address"
                              },
                              "id": 131,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "1528:10:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 132,
                              "name": "to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 89,
                              "src": "1540:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 133,
                              "name": "id",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 83,
                              "src": "1544:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 134,
                              "name": "value",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 95,
                              "src": "1548:5:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              },
                              {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 126,
                            "name": "TransferSingle",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1020,
                            "src": "1501:14:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256,uint256)"
                            }
                          },
                          "id": 135,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1501:53:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 136,
                        "nodeType": "EmitStatement",
                        "src": "1496:58:0"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 78,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 75,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 72,
                      "src": "1233:1:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 76,
                        "name": "ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19,
                        "src": "1237:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      "id": 77,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1237:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1233:14:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 138,
                  "initializationExpression": {
                    "assignments": [
                      72
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 72,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 138,
                        "src": "1218:9:0",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 71,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "1218:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 74,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 73,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1230:1:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1218:13:0"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 80,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": true,
                      "src": "1249:3:0",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 79,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 72,
                        "src": "1251:1:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 81,
                    "nodeType": "ExpressionStatement",
                    "src": "1249:3:0"
                  },
                  "nodeType": "ForStatement",
                  "src": "1213:386:0"
                }
              ]
            },
            "documentation": "@dev Function to mint an amount of a token with the given ID.\n@param ids ID of the token to be minted\n@param recipients The addresses that will own the minted token\n@param values Amount of the token to be minted for each recipient",
            "id": 140,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1209,
                  "src": "845:9:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "845:9:0"
              }
            ],
            "name": "createToken",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 19,
                  "name": "ids",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "700:22:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 17,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "700:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 18,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "700:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 22,
                  "name": "recipients",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "749:29:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 20,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "749:7:0",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 21,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "749:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 25,
                  "name": "values",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "805:25:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 23,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "805:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 24,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "805:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "699:132:0"
            },
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:0:0"
            },
            "scope": 153,
            "src": "679:926:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 151,
              "nodeType": "Block",
              "src": "1747:37:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 147,
                      "name": "_supplies",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 16,
                      "src": "1764:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                        "typeString": "mapping(uint256 => uint256)"
                      }
                    },
                    "id": 149,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 148,
                      "name": "id",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 142,
                      "src": "1774:2:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1764:13:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 146,
                  "id": 150,
                  "nodeType": "Return",
                  "src": "1757:20:0"
                }
              ]
            },
            "documentation": "@param id Token ID\n@return Token supply",
            "id": 152,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 142,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 152,
                  "src": "1703:10:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 141,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1702:12:0"
            },
            "returnParameters": {
              "id": 146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 145,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 152,
                  "src": "1738:7:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 144,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1738:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1737:9:0"
            },
            "scope": 153,
            "src": "1682:102:0",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 154,
        "src": "232:1555:0"
      }
    ],
    "src": "0:1788:0"
  },
  "legacyAST": {
    "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/StashBlox.sol",
    "exportedSymbols": {
      "StashBlox": [
        153
      ]
    },
    "id": 154,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".12"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:0"
      },
      {
        "id": 2,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "25:33:0"
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Lockable.sol",
        "file": "./lib/ERC1155/ERC1155Lockable.sol",
        "id": 3,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 979,
        "src": "60:43:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Documents.sol",
        "file": "./lib/ERC1155/ERC1155Documents.sol",
        "id": 4,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 797,
        "src": "104:44:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/ERC1155/ERC1155Metadata.sol",
        "file": "./lib/ERC1155/ERC1155Metadata.sol",
        "id": 5,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 1007,
        "src": "149:43:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/home/ouziel/Work/StashBloxContracts/contracts/lib/utils/StringUtils.sol",
        "file": "./lib/utils/StringUtils.sol",
        "id": 6,
        "nodeType": "ImportDirective",
        "scope": 154,
        "sourceUnit": 1734,
        "src": "193:37:0",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 7,
              "name": "ERC1155Lockable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 978,
              "src": "254:15:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Lockable_$978",
                "typeString": "contract ERC1155Lockable"
              }
            },
            "id": 8,
            "nodeType": "InheritanceSpecifier",
            "src": "254:15:0"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 9,
              "name": "ERC1155Documents",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 796,
              "src": "271:16:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Documents_$796",
                "typeString": "contract ERC1155Documents"
              }
            },
            "id": 10,
            "nodeType": "InheritanceSpecifier",
            "src": "271:16:0"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 11,
              "name": "ERC1155Metadata",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1006,
              "src": "289:15:0",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC1155Metadata_$1006",
                "typeString": "contract ERC1155Metadata"
              }
            },
            "id": 12,
            "nodeType": "InheritanceSpecifier",
            "src": "289:15:0"
          }
        ],
        "contractDependencies": [
          654,
          796,
          978,
          1006,
          1114,
          1124,
          1169,
          1257,
          1276,
          1733
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 153,
        "linearizedBaseContracts": [
          153,
          1006,
          796,
          1733,
          1124,
          978,
          1257,
          1276,
          654,
          1114,
          1169
        ],
        "name": "StashBlox",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 16,
            "name": "_supplies",
            "nodeType": "VariableDeclaration",
            "scope": 153,
            "src": "351:46:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
              "typeString": "mapping(uint256 => uint256)"
            },
            "typeName": {
              "id": 15,
              "keyType": {
                "id": 13,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "360:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "351:28:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                "typeString": "mapping(uint256 => uint256)"
              },
              "valueType": {
                "id": 14,
                "name": "uint256",
                "nodeType": "ElementaryTypeName",
                "src": "371:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 139,
              "nodeType": "Block",
              "src": "855:750:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 35,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 31,
                            "name": "ids",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19,
                            "src": "873:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 32,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "873:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 33,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "887:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 34,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "887:17:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "873:31:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "5374617368426c6f783a2069647320616e6420726563697069656e7473206d75737420686176652073616d65206c656e67746873",
                        "id": 36,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "906:54:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_3c80a2ee9a9467e60d983237b78a741d439dcf9548c7a1ae4c68a3a52e077103",
                          "typeString": "literal_string \"StashBlox: ids and recipients must have same lengths\""
                        },
                        "value": "StashBlox: ids and recipients must have same lengths"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_3c80a2ee9a9467e60d983237b78a741d439dcf9548c7a1ae4c68a3a52e077103",
                          "typeString": "literal_string \"StashBlox: ids and recipients must have same lengths\""
                        }
                      ],
                      "id": 30,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        1751,
                        1752
                      ],
                      "referencedDeclaration": 1752,
                      "src": "865:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 37,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "865:96:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 38,
                  "nodeType": "ExpressionStatement",
                  "src": "865:96:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 44,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 40,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "979:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 41,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "979:17:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 42,
                            "name": "values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 25,
                            "src": "1000:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 43,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1000:13:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "979:34:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "5374617368426c6f783a20726563697069656e747320616e642076616c756573206d75737420686176652073616d65206c656e67746873",
                        "id": 45,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1015:57:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_5623f3b014745a33b4bd2ab0b5a1ece7ab13377d46736878cc8a8b0c6a96f5b0",
                          "typeString": "literal_string \"StashBlox: recipients and values must have same lengths\""
                        },
                        "value": "StashBlox: recipients and values must have same lengths"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_5623f3b014745a33b4bd2ab0b5a1ece7ab13377d46736878cc8a8b0c6a96f5b0",
                          "typeString": "literal_string \"StashBlox: recipients and values must have same lengths\""
                        }
                      ],
                      "id": 39,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        1751,
                        1752
                      ],
                      "referencedDeclaration": 1752,
                      "src": "971:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "971:102:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 47,
                  "nodeType": "ExpressionStatement",
                  "src": "971:102:0"
                },
                {
                  "body": {
                    "expression": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 66,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 60,
                              "name": "_supplies",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 16,
                              "src": "1144:9:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                "typeString": "mapping(uint256 => uint256)"
                              }
                            },
                            "id": 64,
                            "indexExpression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 61,
                                "name": "ids",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 19,
                                "src": "1154:3:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 63,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 62,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 49,
                                "src": "1158:1:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "1154:6:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "1144:17:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 65,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1165:1:0",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "1144:22:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "5374617368426c6f783a20546f6b656e20616c7265616479206d696e746564",
                          "id": 67,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "string",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1168:33:0",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_stringliteral_92eee84c5387e2eaafffc850fe2ed735d64b2bc8edc56ed49462499f30e3b38c",
                            "typeString": "literal_string \"StashBlox: Token already minted\""
                          },
                          "value": "StashBlox: Token already minted"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          {
                            "typeIdentifier": "t_stringliteral_92eee84c5387e2eaafffc850fe2ed735d64b2bc8edc56ed49462499f30e3b38c",
                            "typeString": "literal_string \"StashBlox: Token already minted\""
                          }
                        ],
                        "id": 59,
                        "name": "require",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [
                          1751,
                          1752
                        ],
                        "referencedDeclaration": 1752,
                        "src": "1136:7:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                          "typeString": "function (bool,string memory) pure"
                        }
                      },
                      "id": 68,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1136:66:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 69,
                    "nodeType": "ExpressionStatement",
                    "src": "1136:66:0"
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 55,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 52,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "1103:1:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 53,
                        "name": "ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19,
                        "src": "1107:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      "id": 54,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1107:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1103:14:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 70,
                  "initializationExpression": {
                    "assignments": [
                      49
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 49,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 70,
                        "src": "1088:9:0",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 48,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "1088:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 51,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 50,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1100:1:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1088:13:0"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 57,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": true,
                      "src": "1119:3:0",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 56,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 49,
                        "src": "1121:1:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 58,
                    "nodeType": "ExpressionStatement",
                    "src": "1119:3:0"
                  },
                  "nodeType": "ForStatement",
                  "src": "1083:119:0"
                },
                {
                  "body": {
                    "id": 137,
                    "nodeType": "Block",
                    "src": "1254:345:0",
                    "statements": [
                      {
                        "assignments": [
                          83
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 83,
                            "name": "id",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1268:10:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 82,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "1268:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 87,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 84,
                            "name": "ids",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 19,
                            "src": "1281:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 86,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 85,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1285:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1281:6:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1268:19:0"
                      },
                      {
                        "assignments": [
                          89
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 89,
                            "name": "to",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1301:10:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 88,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "1301:7:0",
                              "stateMutability": "nonpayable",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 93,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 90,
                            "name": "recipients",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 22,
                            "src": "1314:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 92,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 91,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1325:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1314:13:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1301:26:0"
                      },
                      {
                        "assignments": [
                          95
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 95,
                            "name": "value",
                            "nodeType": "VariableDeclaration",
                            "scope": 137,
                            "src": "1341:13:0",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 94,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "1341:7:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 99,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 96,
                            "name": "values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 25,
                            "src": "1357:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 98,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 97,
                            "name": "i",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 72,
                            "src": "1364:1:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "1357:9:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "1341:25:0"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 109,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 100,
                              "name": "_supplies",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 16,
                              "src": "1380:9:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                "typeString": "mapping(uint256 => uint256)"
                              }
                            },
                            "id": 102,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 101,
                              "name": "id",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 83,
                              "src": "1390:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "1380:13:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 107,
                                "name": "value",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 95,
                                "src": "1414:5:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "baseExpression": {
                                  "argumentTypes": null,
                                  "id": 103,
                                  "name": "_supplies",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 16,
                                  "src": "1396:9:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                                    "typeString": "mapping(uint256 => uint256)"
                                  }
                                },
                                "id": 105,
                                "indexExpression": {
                                  "argumentTypes": null,
                                  "id": 104,
                                  "name": "id",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 83,
                                  "src": "1406:2:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "nodeType": "IndexAccess",
                                "src": "1396:13:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 106,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1345,
                              "src": "1396:17:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 108,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1396:24:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "1380:40:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 110,
                        "nodeType": "ExpressionStatement",
                        "src": "1380:40:0"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 124,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 111,
                                "name": "_balances",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 182,
                                "src": "1434:9:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_uint256_$_t_mapping$_t_address_$_t_uint256_$_$",
                                  "typeString": "mapping(uint256 => mapping(address => uint256))"
                                }
                              },
                              "id": 114,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 112,
                                "name": "id",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 83,
                                "src": "1444:2:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "1434:13:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                "typeString": "mapping(address => uint256)"
                              }
                            },
                            "id": 115,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 113,
                              "name": "to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 89,
                              "src": "1448:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "1434:17:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 122,
                                "name": "value",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 95,
                                "src": "1476:5:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              ],
                              "expression": {
                                "argumentTypes": null,
                                "baseExpression": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 116,
                                    "name": "_balances",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 182,
                                    "src": "1454:9:0",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_mapping$_t_uint256_$_t_mapping$_t_address_$_t_uint256_$_$",
                                      "typeString": "mapping(uint256 => mapping(address => uint256))"
                                    }
                                  },
                                  "id": 118,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 117,
                                    "name": "id",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 83,
                                    "src": "1464:2:0",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "1454:13:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                                    "typeString": "mapping(address => uint256)"
                                  }
                                },
                                "id": 120,
                                "indexExpression": {
                                  "argumentTypes": null,
                                  "id": 119,
                                  "name": "to",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 89,
                                  "src": "1468:2:0",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "nodeType": "IndexAccess",
                                "src": "1454:17:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 121,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1345,
                              "src": "1454:21:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 123,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "1454:28:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "1434:48:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 125,
                        "nodeType": "ExpressionStatement",
                        "src": "1434:48:0"
                      },
                      {
                        "eventCall": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 127,
                                "name": "msg",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1748,
                                "src": "1516:3:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_magic_message",
                                  "typeString": "msg"
                                }
                              },
                              "id": 128,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "sender",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": null,
                              "src": "1516:10:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "hexValue": "30",
                                  "id": 130,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "1536:1:0",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_0_by_1",
                                    "typeString": "int_const 0"
                                  },
                                  "value": "0"
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_rational_0_by_1",
                                    "typeString": "int_const 0"
                                  }
                                ],
                                "id": 129,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "nodeType": "ElementaryTypeNameExpression",
                                "src": "1528:7:0",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_address_$",
                                  "typeString": "type(address)"
                                },
                                "typeName": "address"
                              },
                              "id": 131,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "1528:10:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 132,
                              "name": "to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 89,
                              "src": "1540:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 133,
                              "name": "id",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 83,
                              "src": "1544:2:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 134,
                              "name": "value",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 95,
                              "src": "1548:5:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              },
                              {
                                "typeIdentifier": "t_address_payable",
                                "typeString": "address payable"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 126,
                            "name": "TransferSingle",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1020,
                            "src": "1501:14:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256,uint256)"
                            }
                          },
                          "id": 135,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1501:53:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 136,
                        "nodeType": "EmitStatement",
                        "src": "1496:58:0"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 78,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 75,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 72,
                      "src": "1233:1:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 76,
                        "name": "ids",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 19,
                        "src": "1237:3:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      "id": 77,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1237:10:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1233:14:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 138,
                  "initializationExpression": {
                    "assignments": [
                      72
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 72,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 138,
                        "src": "1218:9:0",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 71,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "1218:7:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 74,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 73,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1230:1:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "1218:13:0"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 80,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": true,
                      "src": "1249:3:0",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 79,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 72,
                        "src": "1251:1:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 81,
                    "nodeType": "ExpressionStatement",
                    "src": "1249:3:0"
                  },
                  "nodeType": "ForStatement",
                  "src": "1213:386:0"
                }
              ]
            },
            "documentation": "@dev Function to mint an amount of a token with the given ID.\n@param ids ID of the token to be minted\n@param recipients The addresses that will own the minted token\n@param values Amount of the token to be minted for each recipient",
            "id": 140,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": null,
                "id": 28,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 27,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1209,
                  "src": "845:9:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "845:9:0"
              }
            ],
            "name": "createToken",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 26,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 19,
                  "name": "ids",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "700:22:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 17,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "700:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 18,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "700:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 22,
                  "name": "recipients",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "749:29:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 20,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "749:7:0",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 21,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "749:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 25,
                  "name": "values",
                  "nodeType": "VariableDeclaration",
                  "scope": 140,
                  "src": "805:25:0",
                  "stateVariable": false,
                  "storageLocation": "calldata",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 23,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "805:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 24,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "805:9:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "699:132:0"
            },
            "returnParameters": {
              "id": 29,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "855:0:0"
            },
            "scope": 153,
            "src": "679:926:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 151,
              "nodeType": "Block",
              "src": "1747:37:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 147,
                      "name": "_supplies",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 16,
                      "src": "1764:9:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_uint256_$_t_uint256_$",
                        "typeString": "mapping(uint256 => uint256)"
                      }
                    },
                    "id": 149,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 148,
                      "name": "id",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 142,
                      "src": "1774:2:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "1764:13:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 146,
                  "id": 150,
                  "nodeType": "Return",
                  "src": "1757:20:0"
                }
              ]
            },
            "documentation": "@param id Token ID\n@return Token supply",
            "id": 152,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 142,
                  "name": "id",
                  "nodeType": "VariableDeclaration",
                  "scope": 152,
                  "src": "1703:10:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 141,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1702:12:0"
            },
            "returnParameters": {
              "id": 146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 145,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 152,
                  "src": "1738:7:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 144,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1738:7:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1737:9:0"
            },
            "scope": 153,
            "src": "1682:102:0",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 154,
        "src": "232:1555:0"
      }
    ],
    "src": "0:1788:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.12+commit.7709ece9.Emscripten.clang"
  },
  "networks": {
    "5777": {
      "events": {
        "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "_approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event",
          "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
        },
        "0x7c77b0a5e04b8b0a37a64aa8dd7a24c2cdfb5f2302c065c6044b33077b96abaa": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "hash",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "DocumentAdded",
          "type": "event",
          "signature": "0x7c77b0a5e04b8b0a37a64aa8dd7a24c2cdfb5f2302c065c6044b33077b96abaa"
        },
        "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event",
          "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
        },
        "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "_ids",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "_values",
              "type": "uint256[]"
            }
          ],
          "name": "TransferBatch",
          "type": "event",
          "signature": "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb"
        },
        "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "TransferSingle",
          "type": "event",
          "signature": "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"
        },
        "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "_value",
              "type": "string"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "_id",
              "type": "uint256"
            }
          ],
          "name": "URI",
          "type": "event",
          "signature": "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b"
        }
      },
      "links": {},
      "address": "0x11Cfe8a2EA4147B1b20b860FC3b1b1df4b9a4B35",
      "transactionHash": "0x28dcaa464fe87a0a1afee8687d122bcde8f79a18c6017db096a82812ebefb708"
    }
  },
  "schemaVersion": "3.0.16",
  "updatedAt": "2019-10-27T21:59:19.262Z",
  "devdoc": {
    "methods": {
      "balanceOf(address,uint256)": {
        "details": "Get the specified address' balance for token with specified ID. Attempting to query the zero account for a balance will result in a revert.",
        "params": {
          "account": "The address of the token holder",
          "id": "ID of the token"
        },
        "return": "The account's balance of the token type requested"
      },
      "balanceOfBatch(address[],uint256[])": {
        "details": "Get the balance of multiple account/token pairs. If any of the query accounts is the zero account, this query will revert.",
        "params": {
          "accounts": "The addresses of the token holders",
          "ids": "IDs of the tokens"
        },
        "return": "Balances for each account and token id pair"
      },
      "createToken(uint256[],address[],uint256[])": {
        "details": "Function to mint an amount of a token with the given ID.",
        "params": {
          "ids": "ID of the token to be minted",
          "recipients": "The addresses that will own the minted token",
          "values": "Amount of the token to be minted for each recipient"
        }
      },
      "isApprovedForAll(address,address)": {
        "params": {
          "account": "The account of the Tokens",
          "operator": "Address of authorized operator"
        },
        "return": "True if the operator is approved, false if not"
      },
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "setApprovalForAll(address,bool)": {
        "details": "Sets or unsets the approval of a given operator.     * An operator is allowed to transfer all tokens of the sender on their behalf.     * Because an account already has operator privileges for itself, this function will revert if the account attempts to set the approval status for itself.",
        "params": {
          "approved": "representing the status of the approval to be set",
          "operator": "address to set the approval"
        }
      },
      "supportsInterface(bytes4)": {
        "params": {
          "_interfaceID": "The interface identifier, as specified in ERC-165"
        },
        "return": "`true` if the contract implements `_interfaceID` and"
      },
      "totalSupply(uint256)": {
        "params": {
          "id": "Token ID"
        },
        "return": "Token supply"
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      },
      "uri(uint256)": {
        "params": {
          "id": "Token ID"
        },
        "return": "URI string"
      }
    }
  },
  "userdoc": {
    "methods": {
      "isApprovedForAll(address,address)": {
        "notice": "Queries the approval status of an operator for a given account."
      },
      "supportsInterface(bytes4)": {
        "notice": "Query if a contract implements an interface"
      }
    }
  }
}
