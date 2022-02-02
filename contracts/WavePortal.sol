// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {

    event NewWave(
        address indexed from, 
        uint timestamp, 
        string message
    );

    struct Wave {
        address waver; // The address of the user who waved
        string message; // The message the user sent
        uint256 timestamp; // The timestamp when user waved
    }

    Wave[] waves;
    uint256 totalCongrats;
    uint seed = block.timestamp + block.difficulty;
    mapping(address => uint) public lastWaved;

    constructor() payable {
        console.log("I am a contract and I am SMAART.");
    }

    function congratulate(string memory _message) public {
        require(
            lastWaved[msg.sender] + 10 minutes <= block.timestamp,
            "Wait 10 minutes"
        );

        lastWaved[msg.sender] = block.timestamp;

        totalCongrats += 1;
        console.log("%s has congratulated you with a message\n%s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed += (block.difficulty + block.timestamp);
        seed %= 100;

        console.log("Random # Generated:", seed);

        if(seed < 50){
            uint prizeAmount = 0.0001 ether;

            // Checking if the contract has this money left
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            // Since the call methods return (bool, bytes memory), we are storing the bool value only
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");

            // If the transactio is a success require's condition is true and the function will end
            // else it will print the following message to the console.
            require(success, "Failed to withdraw money from the contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllCongos() public view returns(Wave[] memory) {
        return waves;
    }

    function getTotalCongrats() public view returns (uint256) {
        console.log("We have %d total Congrats!", totalCongrats);
        return totalCongrats;
    }

}