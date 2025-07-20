import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition"; // core Ignition plugin
import "@nomicfoundation/hardhat-ignition-ethers"; // Ignition + ethers.js glue
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";

dotenv.config();

const { SEPOLIA_NETWORK_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf",
          },
        },
      },
      viaIR: true,
    },
  },
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_NETWORK_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
    primordial: {
      url: "https://rpc.primordial.bdagscan.com",
      accounts: [PRIVATE_KEY || ""],
      chainId: 1043,
      gasPrice: 50_000_000_000, // 50 gwei
      timeout: 200000,
    },
    simuka: {
      url: "http://4.194.208.98:18545", // simuka solutions PTY LTD primordial private node test via curl http://4.194.208.98:18545
      accounts: [PRIVATE_KEY || ""],
      chainId: 1337, // use a custom ID if needed for private node
      gasPrice: 50_000_000_000,
      timeout: 200000,
    },
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://localhost:8545",
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY || "",
      primordial: "no-api-key-needed",
    },
    customChains: [
      {
        network: "primordial",
        chainId: 1043,
        urls: {
          apiURL: "https://primordial.bdagscan.com/api",
          browserURL: "https://primordial.bdagscan.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 60000,
  },
};

export default config;
