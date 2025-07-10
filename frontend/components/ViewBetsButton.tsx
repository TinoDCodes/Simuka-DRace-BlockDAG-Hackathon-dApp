"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { WalletIcon } from "lucide-react";
import { Button } from "@heroui/react";
import { useAccount } from "wagmi";

const ViewBetsButton = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Link href="/bets">
        <Button className="group relative overflow-hidden bg-[rgba(15,15,25,0.65)] backdrop-blur-md border border-[var(--color-border)] rounded-[var(--radius-base)] px-5 py-3 text-white font-medium font-mono transition-all duration-300 hover:border-[var(--color-primary)]">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/10 to-[var(--color-primary)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-0" />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <WalletIcon className="w-5 h-5 text-[var(--color-primary)]" />
            <span>My Bets</span>

            {/* Animated indicator */}
            <motion.div
              className="absolute -right-1 -top-1 w-2 h-2 bg-[var(--color-secondary)] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </div>
        </Button>
      </Link>
    </motion.div>
  );
};

export default ViewBetsButton;
