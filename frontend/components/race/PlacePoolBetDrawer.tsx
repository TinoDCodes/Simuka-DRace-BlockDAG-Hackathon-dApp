"use client";
import { usePlacePoolBet } from "@/hooks/betting-contract";
import { Breakdown } from "@/utils/types";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
  Progress,
} from "@heroui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAccount } from "wagmi";

type PlacePoolBetDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPool?: Breakdown & { raceId: number; totalLiquidity: number };
};

const PlacePoolBetDrawer = ({
  isOpen,
  setIsOpen,
  selectedPool,
}: PlacePoolBetDrawerProps) => {
  const { address } = useAccount();
  const { placePoolBet, isLoading } = usePlacePoolBet();

  const [inputValue, setInputValue] = useState<string>("0.00");
  const [betAmount, setBetAmount] = useState<number>(0);

  const handleBetAmountChange = (value: string) => {
    // Only allow numbers with up to 2 decimal places
    const regex = /^\d*(\.\d{0,2})?$/;

    if (value === "" || regex.test(value)) {
      setInputValue(value);

      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        setBetAmount(parsed);
      } else {
        setBetAmount(0);
      }
    }
  };

  const handleJoinPool = async () => {
    await placePoolBet({
      raceId: selectedPool!.raceId,
      stake: betAmount,
      odds: 0,
      selectionId: parseInt(selectedPool!.id),
      selectionDetails: `${selectedPool!.number}. ${selectedPool!.name}`,
    });
    setInputValue("0.00");
    setBetAmount(0);
    setIsOpen(false);
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 mt-5">
              <h3 className="text-xl font-bold text-white">Place Your Bet</h3>
              <p className="text-sm text-gray-400">
                Bet with the pool at AI-powered odds — guaranteed returns if
                your pick wins.
              </p>
            </DrawerHeader>
            <DrawerBody className="flex flex-col gap-6">
              {!selectedPool ? (
                <div className="flex flex-col grow h-full items-center justify-center">
                  <h3 className="text-gray-400">Invalid Selection</h3>
                  <p className="text-center text-lg font-bold text-gray-500">
                    Select a runner to place your bet
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected Runner */}
                  <div className="p-4 bg-[var(--color-muted-bg)] rounded-[var(--radius-base)] border border-[var(--color-border)]">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-5">
                        <div className="bg-secordary text-white font-semibold text-lg rounded-full bg-secondary px-2">
                          {selectedPool.number}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {selectedPool.name}
                          </h4>
                        </div>
                      </div>

                      <div className=" flex items-center justify-between">
                        <span className="text-slate-200 text-sm">
                          Liquidity:
                        </span>
                        <span className="text-[var(--color-primary)] font-mono font-bold text-xl">
                          {selectedPool.liquidity.toLocaleString()}{" "}
                          <span className="text-sm">$RACE</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bet type */}
                  <div className="flex flex-col gap-4">
                    <h5 className="text-sm font-medium text-gray-400">
                      Bet Type
                    </h5>
                    <Button
                      isDisabled
                      className="bg-primary w-fit font-medium font-heading"
                    >
                      Liquidity Pool
                    </Button>
                  </div>

                  {/* Bet amount */}
                  <div className="flex flex-col gap-4">
                    <h5 className="text-sm font-medium text-gray-400">
                      Bet Amount
                    </h5>
                    <Input
                      value={inputValue}
                      onChange={(e) => handleBetAmountChange(e.target.value)}
                      name="betAmount"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      step={0.05}
                      classNames={{
                        inputWrapper:
                          "focus-within:ring-2 ring-primary/50 focus-within:border-none",
                        input:
                          "border-none focus-within:ring-0 focus-within:border-none focus-within:outline-0 font-mono text-lg placeholder:text-muted-foreground/50",
                      }}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-gray-400">$RACE</span>
                        </div>
                      }
                    />
                  </div>

                  {/* AI‑Implied Odds */}
                  <div className="p-4 bg-[var(--color-muted-bg)] rounded-[var(--radius-base)] border border-[var(--color-border)]">
                    <div className="flex flex-col space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">
                          AI‑Implied Odds
                        </h4>
                        <p className="text-xs text-gray-500">
                          Based on current pool liquidity
                        </p>
                      </div>

                      {/* Odds Display */}
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold font-mono text-[var(--color-secondary)]">
                          {selectedPool.impliedOdds.toFixed(2)}×
                        </span>
                        <span className="text-sm text-gray-400">
                          ({(selectedPool.impliedOdds * 100).toLocaleString()}%)
                        </span>
                      </div>

                      {/* Visual indicator of how much of the pool this runner holds */}
                      <div className="w-full">
                        <Progress
                          value={Math.min(
                            (selectedPool.liquidity /
                              selectedPool.totalLiquidity) *
                              100,
                            100
                          )}
                          size="sm"
                          className="bg-[var(--color-border)] rounded-full overflow-hidden"
                        />
                        <div className="mt-1 text-xs text-gray-400">
                          {(
                            (selectedPool.liquidity /
                              selectedPool.totalLiquidity) *
                            100
                          ).toFixed(1)}
                          % of pool
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button
                          className="w-full bg-transparent text-danger border border-danger hover:bg-danger/10 font-semibold uppercase"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>

                        <Button
                          isDisabled={betAmount === 0 || isLoading || !address}
                          isLoading={isLoading}
                          className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#14161A] font-bold shadow-lg shadow-[var(--color-primary)]/30 transition-all hover:shadow-[var(--color-primary)]/50 uppercase"
                          onPress={handleJoinPool}
                        >
                          {isLoading ? "Joining Pool..." : "Join Pool"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {!address && (
                    <p className="text-center text-sm font-medium text-warning">
                      Please connect your wallet to join the pool
                    </p>
                  )}
                </>
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default PlacePoolBetDrawer;
