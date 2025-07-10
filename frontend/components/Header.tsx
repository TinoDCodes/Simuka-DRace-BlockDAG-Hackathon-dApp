"use client";
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

import LogoIcon from "@/public/DRace-logo-icon.png";
import ViewBetsButton from "./ViewBetsButton";
import { useAccount } from "wagmi";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Menu, User2Icon, WalletIcon } from "lucide-react";
import { motion } from "framer-motion";
import { CustomButton } from "./ui/CustomButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src={LogoIcon}
            alt="RaceChain Logo Icon"
            width="0"
            height="0"
            className="h-12 w-auto"
          />
          <h1 className="text-gradient lg:text-lg font-extrabold">RaceChain</h1>
        </div>
      </Link>

      <div className="flex md:hidden">
        <UserMenu />
      </div>

      <div className="hidden md:flex items-center gap-4">
        <ViewBetsButton />

        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default Header;

const UserMenu = () => {
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();

  if (!isConnected || !address) return <ConnectButton showBalance={false} />;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Menu className="w-8 h-8" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="w-[70vw]">
        <DropdownItem href="/bets" key="my-bets">
          <Button className="w-full group relative overflow-hidden bg-[rgba(15,15,25,0.65)] backdrop-blur-md rounded-[var(--radius-base)] px-5 py-3 text-white font-medium font-mono transition-all duration-300 hover:border-[var(--color-primary)]">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/10 to-[var(--color-primary)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-0" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-4">
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
        </DropdownItem>
        <DropdownItem key="account-button">
          {openAccountModal && (
            <CustomButton
              color="account"
              onClick={openAccountModal}
              type="button"
              className="w-full flex items-center gap-4"
            >
              <User2Icon className="w-5 h-5" />
              <span>{getDisplayAddress(address)}</span>
            </CustomButton>
          )}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const getDisplayAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-5);
};
