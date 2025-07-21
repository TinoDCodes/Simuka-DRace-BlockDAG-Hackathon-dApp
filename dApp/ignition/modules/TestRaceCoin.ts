import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TestRaceCoinModule", (m) => {
  const owner = m.getParameter("owner");

  const testRaceCoin = m.contract("TestRaceCoin", [
    owner,
  ]);

  return { testRaceCoin };
});
