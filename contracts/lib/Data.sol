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
        string baseURI;
        string versionRecipient;
        address owner;
        address gsnTrustedForwarder;
        address proxyRegistryAccount;
        address tokenizer; // should be a contract managing permission
    }

    struct Account {
        bool isLocked;
        uint256 ethBalance;
        uint256 nonce;
    }

    struct Holder {
        uint256 balance;
        uint256 birthday;
        bool isHolder; // never come back to false
        bool isApproved; // for private tokens
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
    }
    mapping(bytes32 => uint8) internal tokenStructMap;

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
    CONSTANTS
    ****************************************/


    bytes4 constant internal INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;
    bytes4 constant internal INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;
    bytes4 constant internal RECEIVER_SINGLE_MAGIC_VALUE = 0xf23a6e61;
    bytes4 constant internal RECEIVER_BATCH_MAGIC_VALUE = 0xbc197c81;


    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    Config public  _config;

    // mappings by address
    mapping(address => Account) public _accounts;
    mapping(address => uint256[]) public _tokenList;
    mapping(address => mapping(address => bool)) _operatorApprovals;
    mapping(address => mapping(address => mapping(uint256 => uint256))) _externalBalances;

    // mappings by tokenId
    mapping(uint256 => Token) internal _tokens;
    mapping(uint256 => address[]) public _holderList;
    mapping(uint256 => mapping(address => Holder)) public _holders;
    mapping(uint256 => uint256[2][]) public _demurrageFees; //list of tuple [timestamp, price]

    // mappings by callbackId
    mapping(uint256 => Callback) public _callbacks;
    mapping(uint256 => address[]) public _callees;

    // --- EIP712 niceties ---
    bytes32 public DOMAIN_SEPARATOR;
    bytes32 public APPROVAL_TYPEHASH;

}
