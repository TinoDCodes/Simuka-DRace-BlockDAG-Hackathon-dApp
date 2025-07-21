import { ethers } from "hardhat";
import parameters from "../ignition/parameters.json"; // Adjust path if needed
//npx hardhat run scripts/estimateGas.ts --network simuka
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Estimating gas from account:", deployer.address);
  console.log("Using constructor args:", parameters);

  const RaceChainBetting = await ethers.getContractFactory("RaceChainBetting");

  const tx = RaceChainBetting.getDeployTransaction(parameters.RaceChainBettingModule.owner, parameters.RaceChainBettingModule.tokenAddress, parameters.RaceChainBettingModule.tokenDecimals);
  tx.from = deployer.address;

  const estimatedGas = await deployer.estimateGas(tx);

  console.log("Estimated Gas:", estimatedGas.toString());
}

main().catch((error) => {
  console.error("Error estimating gas:", error);
  process.exit(1);
});
