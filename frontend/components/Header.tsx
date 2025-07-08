import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

import LogoIcon from "@/public/DRace-logo-icon.png";

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

      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Header;
