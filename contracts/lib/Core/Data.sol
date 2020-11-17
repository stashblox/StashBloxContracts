// SPDX-License-Identifier: UNLICENSED
// (c) Copyright 2020 Stashblox, all rights reserved.
pragma solidity ^0.7.4;

contract Data {

    /***************************************
    TYPES
    TODO: pack struct members
    ****************************************/

    enum Actions {
        SET_AUTHORIZATION,
        UPDATE_CONFIG,
        CREATE_TOKEN,
        UPDATE_TOKEN,
        TRANSFER_OWNERSHIP,
        REGISTER_CURRENCY,
        CALL_TOKENS,
        LOCK_ACCOUNT,
        GSN_FORWARDER,
        TRANSFER_TOKEN_FOR,
        HOLD_PRIVATE_TOKEN
    }

    struct Config {
        address owner;
        address proxyRegistryAccount;
        bytes32 DOMAIN_SEPARATOR;
        bytes32 APPROVAL_TYPEHASH;
        bytes32 TRANSFER_TYPEHASH;
        bytes32 SALT;
        string baseURI;
        string versionRecipient;
    }

    struct AccountToken {
        uint256 balance;
        uint256 birthday;
    }

    struct Account {
        bool isLocked;
        uint256 nonce;
        uint256[] tokenList;
        mapping(uint256 => AccountToken) tokens;
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
        uint256 lumpSumFees;
        uint256 standardFees;
        uint256 feesCurrencyId;
        address feesRecipient;
        bool    isPrivate;
        bool    locked;
        address[] holderList;
    }


    event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    event URI(string _value, uint256 indexed _id);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AccountUpdated(address indexed _account, uint256 _documentHash);
    event TokenUpdated(uint256 indexed _id, uint256 _documentHash);
    event ConfigUpdated();

    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    Config internal  _config;

    mapping(address => mapping(Actions => mapping(uint256 => bool))) internal _permissions;

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

    mapping(bytes4 => bool) internal _supportedInterfaces;

}
