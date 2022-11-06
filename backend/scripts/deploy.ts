import { ethers } from "hardhat";

async function main() {
  const Coffee = await ethers.getContractFactory("Coffee");
  const coffee = await Coffee.deploy();

  await coffee.deployed();

  console.log(`Coffee deployed to ${coffee.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
