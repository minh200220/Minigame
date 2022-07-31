// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Minigame {
    // address private owner;
    // uint256 public startTime;
    // uint256 public endTime;
    Player[] public arrPlayer;

    struct Player {
        string _ID;
        address _WALLET;
    }

    // Modifiers
    // modifier isOngoing() {
    //     require(block.timestamp < endTime, 'This auction is closed.');
    //     _;
    // }
    // modifier notOngoing() {
    //     require(block.timestamp >= endTime, 'This auction is still open.');
    //     _;
    // }
    // modifier isOwner() {
    //     require(msg.sender == owner, 'Only owner can perform task.');
    //     _;
    // }
    // modifier notOwner() {
    //     require(msg.sender != owner, 'Owner is not allowed to bid.');
    //     _;
    // }

    event SM_send_data(address _wallet, string _id);
    event SM_send_winner(address _wallet, string _id);
    event SM_send_number(uint _one, uint _two);

    // constructor () {
    //     owner = msg.sender;
    //     startTime = block.timestamp;
    //     endTime = block.timestamp + 1 hours;
    // }

    // put isOngoing() notOwner() after 'public'
    function SignUp(string memory _id) public {
        Player memory newPlayer = Player(_id, msg.sender);
        arrPlayer.push(newPlayer);
        emit SM_send_data(msg.sender, _id);
    }

    // put notOngoing() isOwner() after 'private'
    // Solidity pseudo-random function:
    function random() private view returns (uint) {
        uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        return randomHash % arrPlayer.length;
    } 

    function random2() public {
        uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        // uint winnerIndex = randomHash % arrPlayer.length;
        emit SM_send_number(randomHash, arrPlayer.length);
        // emit SM_send_winner(arrPlayer[winnerIndex]._WALLET, arrPlayer[winnerIndex]._ID);
    } 

    // function getOwner() public view returns (address) {
    //     return owner;
    // }
}