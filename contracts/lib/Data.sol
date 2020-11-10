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
        bytes32 DOMAIN_SEPARATOR;
        bytes32 APPROVAL_TYPEHASH;
        bytes4 INTERFACE_SIGNATURE_ERC165;
        bytes4 INTERFACE_SIGNATURE_ERC1155;
        bytes4 RECEIVER_SINGLE_MAGIC_VALUE;
        bytes4 RECEIVER_BATCH_MAGIC_VALUE;
        string baseURI;
        string versionRecipient;
    }


    struct AccountToken {
        uint256 balance;
        uint256 birthday;
        bool isApproved; // for private tokens
    }

    struct Account {
        bool isLocked;
        uint256 ethBalance;
        uint256 nonce;
        uint256[] tokenList;
        mapping(uint256 => AccountToken) tokens;
        mapping(address => bool) approvedOperator;
        mapping(address => mapping(uint256 => uint256)) externalBalances;
    }

    struct DemurrageFees {
        uint256 startAt;
        uint256 price;
    }

    struct Token {
        uint256 supply;
        uint256 decimals;
        uint256 metadataHash;
        uint256 minHoldingForCallback;
        uint256 lumpSumFees;
        uint256 standardFees;
        uint256 feesUnitType; // 0 ether, 1 erc20, 2 erc1155
        uint256 feesUnitId;
        address feesUnitAddress;
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

    // mappings by address
    mapping(address => Account) public _accounts;

    // mappings by tokenId
    mapping(uint256 => Token) public _tokens;
    //mapping(uint256 => address[]) public _holderList;
    mapping(uint256 => DemurrageFees[]) public _demurrageFees;
    // initialized in constructor and used to set token properties
    mapping(bytes32 => uint8) internal tokenStructMap;

    // mappings by callbackId
    mapping(uint256 => Callback) public _callbacks;
    mapping(uint256 => address[]) public _callees;


}
