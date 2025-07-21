import { ethers } from "hardhat";
import parameters from "../ignition/parameters.json"; 

async function main() {
  const provider = ethers.provider;

  const address = parameters.RaceChainBettingModule.owner; // Replace or pass as an argument

  const balance = await provider.getBalance(address);
  console.log(`Balance of ${address}: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
