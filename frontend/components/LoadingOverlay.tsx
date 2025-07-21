import { motion } from "framer-motion";
import Image from "next/image";
import LogoIcon from "@/public/DRace-logo-icon.png";

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/5 backdrop-blur-xs flex items-center justify-center">
      {/* Pulsing Logo */}
      <motion.div
        className="flex items-center justify-center"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={LogoIcon}
          alt="DRace Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
        />
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;
