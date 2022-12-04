// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainPe is Ownable {
    event PaymentCompleted(
        string name,
        string vpa,
        uint256 amount,
        uint256 rate,
        address indexed sender
    );

    function pay(
        string memory vpa,
        string memory name,
        uint256 amount,
        uint256 rate
    ) public payable {
        require(msg.value * rate >= amount);
        emit PaymentCompleted(name, vpa, amount, rate, msg.sender);
    }
}
