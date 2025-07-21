import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RaceChainBettingModule", (m) => {
  const owner = m.getParameter("owner");
  const tokenAddress = m.getParameter("tokenAddress");
  const tokenDecimals = m.getParameter("tokenDecimals");

  const raceChainBetting = m.contract("RaceChainBetting", [
    owner,
    tokenAddress,
    tokenDecimals,
  ]);

  return { raceChainBetting };
});
