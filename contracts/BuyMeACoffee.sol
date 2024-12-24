// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BuyMeACoffee {
    //Event to emit when a memo is created
    event NewMemo(
        address indexed from,
        unit256 timestamp,
        string name,
        string message
    );

    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable owner;

    
}