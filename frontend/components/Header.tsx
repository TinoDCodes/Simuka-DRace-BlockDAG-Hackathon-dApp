import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6">
      <h1 className="text-gradient text-2xl md:text-3xl font-extrabold">
        RaceChain
      </h1>

      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Header;
