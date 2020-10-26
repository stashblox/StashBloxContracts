// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.7.1;

contract Data {


    /***************************************
    TYPES
    ****************************************/

    struct Config {
        uint256 callbackAutoExecuteMaxAccounts;
        string baseURI;
        string versionRecipient;
        address owner;
        address GSNTrustedForwarder;
        address proxyRegistryAccount;
    }

    struct Account {
        bool isTokenizer;
        bool isLocked;
        uint256 ETHBalance;
        uint256[] tokens;
        mapping(address => bool) operatorApprovals;
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
        address legalAuthority;
        bool isPrivate;
        bool locked;
        mapping(address => Holder) holders;
        address[] holderList; // Can contains zero balance
        address[] feesRecipients;
        uint256[] feesRecipientsPercentage;
        uint256[2][] storageFees; //list of tuple [timestamp, price]
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
    CONSTANTS
    ****************************************/


    bytes4 constant internal INTERFACE_SIGNATURE_ERC165 = 0x01ffc9a7;
    bytes4 constant internal INTERFACE_SIGNATURE_ERC1155 = 0xd9b67a26;


    /***************************************
    GLOBAL VARIABLES
    ****************************************/


    Config public  _config;
    mapping (address => Account) public _accounts;
    mapping (uint256 => Token) public _tokens;
    mapping (uint256 => Callback) public _callbacks;


    /***************************************
    EXTERNAL FUNCTIONS
    ****************************************/


    function tokenDetails(uint256 id) public view returns (address[] memory,
                                                           address[] memory,
                                                           uint256[] memory,
                                                           uint256[2][] memory) {
        return (_tokens[id].holderList,
                _tokens[id].feesRecipients,
                _tokens[id].feesRecipientsPercentage,
                _tokens[id].storageFees);
    }

    function tokenList(address account) public view returns (uint256[] memory) {
        return _accounts[account].tokens;
    }

}
