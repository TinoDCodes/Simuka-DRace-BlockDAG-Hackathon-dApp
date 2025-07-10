"use client";

import WalletConnectionPrompt from "@/components/WalletConnectPrompt";
import { useAccount } from "wagmi";

export default function BetsPage() {
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) return <WalletConnectionPrompt />;

  return (
    <div className="flex flex-col items-center justify-center grow">
      <h1>My Bets</h1>
    </div>
  );
}
