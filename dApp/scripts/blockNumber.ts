import { ethers } from "hardhat";
//npx hardhat run scripts/blockNumber.ts --network simuka

async function main() {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log("Current block number:", blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
