// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

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
    }

    struct Account {
        bool isTokenizer;
        bool isLocked;
        uint256 ethBalance;
    }

    struct Holder {
        uint256 balance;
        uint256 birthday;
        bool isMaintener;
        bool isHolder; // never come back to false
        bool isApproved; // for private tokens
    }

    struct Token {
        uint256 supply;
        uint256 decimals;
        uint256 lumpSumFees;
        uint256 standardFees;
        uint256 minHoldingForCallback;
        uint256 metadataHash;
        uint256 feesUnitType; // 0 ether, 1 erc20, 2 erc1155
        uint256 feesUnitId;
        address feesUnitAddress;
        address feesRecipient;
        address legalAuthority;
        bool isPrivate;
        bool locked;
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

    /**
     * @notice emitted when a token is updated.
     * @dev use _tokens getter to obtain the new state
     */
    mapping(uint256 => Token) public _tokens;
    
    mapping(uint256 => address[]) public _holderList;
    mapping(uint256 => mapping(address => Holder)) public _holders;
    mapping(uint256 => uint256[2][]) public _storageFees; //list of tuple [timestamp, price]

    // mappings by callbackId
    mapping(uint256 => Callback) public _callbacks;
    mapping(uint256 => address[]) public _callees;

}
