import { useTokenAccount } from "@/hooks/token-account";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";

const TokenBalance = () => {
  const { balance, isLoading, refetch } = useTokenAccount();
  const [displayBalance, setDisplayBalance] = useState("0.00");

  useEffect(() => {
    if (balance) {
      const formattedBalance = parseFloat(
        ethers.formatUnits(balance as number, 18)
      ).toFixed(2);

      if (formattedBalance !== displayBalance) {
        // Trigger animation
        setTimeout(() => {
          setDisplayBalance(formattedBalance);
        }, 150);
      }
    }
  }, [balance, displayBalance]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[var(--color-primary)] animate-pulse" />
        <span className="text-sm font-mono text-gray-400">--.-- $RACE</span>
      </div>
    );
  }

  if (!balance) return null;

  return (
    <button
      className="flex items-center gap-2 font-mono"
      onClick={() => refetch()}
    >
      <div className="hidden md:block w-3 h-3 rounded-full bg-[var(--color-primary)]" />

      <Wallet className="md:hidden w-5 h-5 text-primary" />

      <AnimatePresence mode="wait">
        <motion.span
          key={displayBalance}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15 }}
          className="text-sm text-white"
        >
          {displayBalance}
        </motion.span>
      </AnimatePresence>

      <span className="hidden md:block text-xs text-gray-400">$RACE</span>
    </button>
  );
};

export default TokenBalance;
