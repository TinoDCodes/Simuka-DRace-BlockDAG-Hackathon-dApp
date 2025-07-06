import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6">
      <Link href="/">
        <h1 className="text-gradient text-2xl md:text-3xl font-extrabold">
          RaceChain
        </h1>
      </Link>

      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Header;
