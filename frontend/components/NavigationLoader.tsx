// app/loading.tsx
"use client";

import { motion } from "framer-motion";
import LogoIcon from "@/public/DRace-logo-icon.png";
import Image from "next/image";

const NavigationLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-md">
      {/* Floating blockchain bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-[var(--color-primary)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2.5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulsing Logo */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
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
    </div>
  );
};

export default NavigationLoader;
