import { motion } from "framer-motion";
import { WalletIcon } from "lucide-react";
import { Button } from "@heroui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit"; // Or your connection hook

const WalletConnectionPrompt = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center grow p-6"
    >
      <div className="max-w-md w-full bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-8 text-center">
        {/* Animated gradient circle */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-6"
        >
          <WalletIcon className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Wallet Not Connected
        </h2>
        <p className="text-gray-400 mb-6">
          Connect your wallet to view your bets, place wagers, and access all
          RaceChain features
        </p>

        <Button
          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#14161A] font-bold py-4 px-8 rounded-[var(--radius-base)] shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 transition-all"
          onPress={openConnectModal}
        >
          Connect Wallet
        </Button>
      </div>
    </motion.div>
  );
};

export default WalletConnectionPrompt;
