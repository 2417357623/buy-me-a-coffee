// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BuyMeACoffee {
    //Event to emit when a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
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

    address payable public owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name,string memory _message) payable public {
        require(msg.value > 0,"can't buy coffee with 0 eth");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));

        
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}