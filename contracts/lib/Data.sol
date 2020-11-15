// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

contract Data {

    /***************************************
    TYPES
    TODO: pack struct members
    ****************************************/

    struct Config {
        uint256 callbackAutoExecuteMaxAccounts;
        address owner;
        address gsnTrustedForwarder;
        address proxyRegistryAccount;
        address tokenizer; // should be a contract managing permission
        bytes4 INTERFACE_SIGNATURE_ERC165;
        bytes4 INTERFACE_SIGNATURE_ERC1155;
        bytes4 RECEIVER_SINGLE_MAGIC_VALUE;
        bytes4 RECEIVER_BATCH_MAGIC_VALUE;
        string baseURI;
        string versionRecipient;
        //mapping(address => bool) whitelistedERC1155;
    }

    struct EIP712Config {
        bytes32 DOMAIN_SEPARATOR;
        bytes32 APPROVAL_TYPEHASH;
        bytes32 TRANSFER_TYPEHASH;
        bytes32 SALT;
        uint256 chainId;
        address contractAddress;
    }


    struct AccountToken {
        uint256 balance;
        uint256 birthday;
        bool isApproved; // for private tokens
    }

    struct Account {
        bool isLocked;
        uint256 nonce;
        uint256[] tokenList;
        mapping(uint256 => AccountToken) tokens;
        mapping(address => bool) approvedOperator;
        mapping(uint256 => uint256) externalBalances; // currencyId => balance
    }

    struct DemurrageFees {
        uint256 startAt;
        uint256 price;
    }

    struct Currency {
        uint256 currencyType; // 0 ether, 1 erc20, 2 erc1155
        uint256 id; // for erc1155
        address contractAddress; // for erc1155 and erc20
    }

    struct Token {
        uint256 supply;
        uint256 decimals;
        uint256 metadataHash;
        uint256 minHoldingForCallback;
        uint256 lumpSumFees;
        uint256 standardFees;
        uint256 feesCurrencyId;
        address feesRecipient;
        address legalAuthority;
        address maintener;
        bool    isPrivate;
        bool    locked;

        address[] holderList;
    }

    struct Callback {
        uint256 tokenId;
        uint256 price;
        uint256 escrowedAmount;
        uint256 callCounter;
        uint256 documentHash;
        address caller;
        bool needLegalApproval;
        bool approvedByLegal;
        bool refused;
        bool accepted;
        bool completed;
    }


    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    Config public  _config;
    EIP712Config public _eip712Config;

    // mappings by address
    mapping(address => Account) public _accounts;

    // mappings by tokenId
    mapping(uint256 => Token) public _tokens;
    //mapping(uint256 => address[]) public _holderList;
    mapping(uint256 => DemurrageFees[]) public _demurrageFees;
    // initialized in constructor and used to set token properties
    mapping(bytes32 => uint8) internal tokenStructMap;

    mapping(address => mapping(uint256 => uint256)) internal _currencyIDs;
    mapping(uint256 => Currency) internal _currencies;

    // mappings by callbackId
    mapping(uint256 => Callback) public _callbacks;
    mapping(uint256 => address[]) public _callees;

}
