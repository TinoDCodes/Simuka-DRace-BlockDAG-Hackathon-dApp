# RaceChain

RaceChain is a decentralized horse racing protocol that brings transparency, automation, and accessibility to global horse race betting. Built using Solidity, NextJS, C#, and PostgreSQL, RaceChain delivers a trustless, fast, and globally accessible betting experience.

![RaceChain Banner](frontend/public/racechain-banner.png)

## 🚀 Features
- 🏇 On-chain horse race betting (fixed odds and tote liquidity options)
- 💸 Only 1% platform fees (vs traditional 10-15%)
- 🔗 Smart contract-based payouts and liquidity management
- ⚡ Block DAG infrastructure for high scalability
- 📊 Immutable race history and odds transparency
- 👥 DAO and AI-driven odds engine
- 🌐 Global access to horse racing markets
- 💡 Real-time racing data ingestion
- 💰 Decentralized liquidity pools

## Table of Contents
- [Installation](#-local-setup)
- [Usage](#-usage)
- [Technology Stack](#%EF%B8%8F-technology-stack)
- [Project Structure](#-project-structure)
- [License](#license)

---

## 🧪 Local Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Hardhat
- Git

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/RaceChain.git](https://github.com/TinoDCodes/Simuka-DRace-BlockDAG-Hackathon-dApp.git)
   cd Simuka-DRace-BlockDAG-Hackathon-dApp
   ```

2. **Set up the smart contract environment (dApp folder)**:
   ```bash
   cd dApp
   npm install
   ```

3. **Set up the frontend (frontend folder)**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**:
   - Create `.env` files in both `dApp` and `frontend` directories based on the provided `.env.example` files
   - Add your Infura/Alchemy API keys, wallet private key (for deployment), and other required secrets
  

## 🔧 Usage

### Compile & Deploy Smart Contracts

1. Set up `parameters.json` in the `ignition` folder with relevant contract deployment params.

2. **Compile the smart contracts**:
   ```bash
   cd dApp
   npx hardhat compile
   ```

3. **Deploy contracts**:
   ```bash
   npx hardhat ignition deploy .\ignition\modules\<cdeployment-module> --network <network-name> --parameters .\ignition\<path-to-parameters-file>
   ```
(See the Hardhat and Hardhat Ignition documentations for more information.)

### Run Frontend (Next.js)

1. Navigate to `frontend/`
2. Install and run:
   ```bash
   npm run dev
   ```
---

## ⚙️ Technology Stack

### Smart Contracts (dApp folder)
- **Solidity**: For writing smart contracts
- **Hardhat**: Development environment for Ethereum
- **Ethers.js & Hardhat Ignition**: Interacting with Ethereum blockchain
- **Mocha**: Smart contract testing
- **OpenZeppelin**: Secure smart contract libraries

### Frontend (frontend folder)
- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework
- **Wagmi**: React hooks for Ethereum
- **Hero UI**: Component library
- **Recharts**: Data visualization library
- **Framer Motion**: Animation library
- **RainbowKit**: Wallet adapter library

### Backend (Hosted Privately)
- ASP.NET Core (C#) + EF Core
- PostgreSQL
- Nethereum
- Chainlink Oracle (planned)
- Docker + Azure App Services (deployment)
- Serilog + Application Insights (monitoring)

## 📂 Project Structure

```
RaceChain/
├── dApp/                   # Smart contract project
│   ├── contracts/          # Solidity smart contracts
│   ├── scripts/            # Custom scripts
│   ├── ignition/           # Ignition modules
│   ├── typechain-types/    # Typescript factories and helpers
│   ├── test/               # Smart contract tests
│   ├── hardhat.config.js   # Hardhat configuration
│   └── package.json
│
├── frontend/               # Next.js application
│   ├── public/             # Static assets
│   ├── app/                # Next.js pages, layouts & api routes
│   ├── components/         # React components
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions & files
│   │   └── ...             
│   ├── next.config.js      # Next.js configuration
│   └── package.json
│
├── LICENSE
└── README.md                # This file
```

## 💰 Revenue Model

- 🏛️ DAO collects a small settlement fee on liquidity pool settlements.
- 🤖 Stakers co-own the AI model that generates odds and trading signals.
- 🔄 A tiny fee is applied to peer-to-peer betswaps.
- 💸 Revenue is distributed between the DAO treasury and staking participants.

---

## 🧠 About

RaceChain is developed by **Simuka Solutions**, a blockchain innovation firm focused on real-world decentralized applications in sports, finance, and governance.

🌐 Visit us: [simukasolutions.com](https://simukasolutions.com)

---

## 🪪 License

MIT License. See [LICENSE](./LICENSE) for details.
