// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Coffee {
    /**
     * @notice Storage of all donations
     * receiver => donations
     */
    mapping (address => Donation[]) internal donationsReceived;

    /**
     * @notice Storage of balances
     * user => balance
     */
    mapping (address => uint256) internal balances;

    /**
     * @notice Internal representation of a donation
     */
    struct Donation {
        uint256 amount;
        uint256 timestamp;
        address donator;
        bytes message;
    }

    event Donated(address donator, address receiver, uint256 amount);
    event Withdraw(address withdrawer, uint256 amount);

    /**
     * @notice Returns all donations received for an address
     */
    function getDonations(address receiver) public view returns (Donation[] memory) {
        return donationsReceived[receiver];
    }

    /**
     * @notice Returns the callers balance
     */
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    /**
     * @notice Returns count of all donations received
     */
    function getDonationCount() public view returns (uint256) {
        return donationsReceived[msg.sender].length;
    }

    /**
     * @notice Withdraw balance
     */
    function withdraw() public {
        // checks
        uint256 balance = balances[msg.sender];
        require(balance > 0);

        // effects
        balances[msg.sender] -= balance;

        // interactions
        payable(msg.sender).transfer(balance);
        emit Withdraw(msg.sender, balance);
    }

    /**
     * @notice Donate to an address
     */
    function buyCoffee(address receiver, bytes calldata message) public payable {
        uint256 amount = msg.value;
        require(amount > 0);

        donationsReceived[receiver].push(Donation(
            amount,
            block.timestamp,
            msg.sender,
            message
        ));

        balances[receiver] += amount;
        emit Donated(msg.sender, receiver, amount);
    }
}
