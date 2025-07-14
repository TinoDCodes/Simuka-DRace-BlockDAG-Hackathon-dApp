import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition"; // core Ignition plugin
import "@nomicfoundation/hardhat-ignition-ethers"; // Ignition + ethers.js glue
import * as dotenv from "dotenv";
dotenv.config();

const { SEPOLIA_NETWORK_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_NETWORK_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
