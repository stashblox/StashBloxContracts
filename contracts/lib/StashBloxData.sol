// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

contract StashBloxData {


    /***************************************
    TYPES
    ****************************************/


    struct User {
        bool isTokenizer;
        bool isLocked;
        uint256 ETHBalance;
        uint256[] tokens;
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
        uint256 lumpSumTransactionFees;
        uint256 valueTransactionFees;
        uint256 minHoldingForCallback;
        uint256 metadataHash;
        address legalAuthority;
        bool isPrivate;
        bool locked;
        mapping(address => Holder) holders;
        address[] holderList; // Can contains zero balance
        address[] feesRecipients;
        uint256[] feesRecipientsPercentage;
        uint256[2][] storageCostHistory; //list of tuple [timestamp, price]
    }

    struct Config {
        uint256 callbackAutoExecuteMaxAddresses;
        string baseURI;
        address[10] proxyRegistryAddresses;
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
        address[] callees;
    }

    /***************************************
    GLOBAL VARIABLES
    ****************************************/

    Config public  _config;
    mapping (address => User) public _users;
    mapping (uint256 => Token) public _tokens;
    mapping (uint256 => Callback) public _callbacks;


}
