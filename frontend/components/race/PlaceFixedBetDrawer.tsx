import { Runner } from "@/utils/types";
import {
  Button,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  useDisclosure,
} from "@heroui/react";

type PlaceFixedBetDrawerProps = {
  runner: Runner;
};

const PlaceFixedBetDrawer = ({ runner }: PlaceFixedBetDrawerProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const potentialPayout = 324 * runner.winOdds;

  return (
    <>
      <Button
        className="bg-transparent text-[var(--color-primary)] font-medium font-mono border border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 px-4 py-1 rounded-[var(--radius-base)] transition-colors"
        onPress={onOpen}
      >
        {runner.winOdds.toFixed(2)}
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 mt-5">
                <h3 className="text-xl font-bold text-white">Place Your Bet</h3>
                <p className="text-sm text-gray-400">
                  Place your bet at fixed odds with guaranteed returns if your
                  selection wins.
                </p>
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-6">
                {/* Selected Runner */}
                <div className="p-4 bg-[var(--color-muted-bg)] rounded-[var(--radius-base)] border border-[var(--color-border)]">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-5">
                      <div className="bg-secordary text-white font-semibold text-lg rounded-full bg-secondary px-2">
                        {runner.Number}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{runner.name}</h4>
                        <p className="text-sm text-gray-400">{runner.jockey}</p>
                      </div>
                    </div>

                    <div className=" flex items-center justify-between">
                      <span className="text-slate-200 text-sm">
                        Fixed odds:
                      </span>
                      <span className="text-[var(--color-primary)] font-mono font-bold text-xl">
                        {runner.winOdds.toFixed(2)}
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
                    disabled
                    className="bg-primary w-fit font-medium font-heading opacity-60 hover:bg-primary hover:opacity-60 disabled:hover:opacity-60 disabled:hover:cursor-default"
                  >
                    Win
                  </Button>
                </div>

                {/* Bet amount */}
                <div className="flex flex-col gap-4">
                  <h5 className="text-sm font-medium text-gray-400">
                    Bet Amount
                  </h5>
                  <Input
                    name="betAmount"
                    type="number"
                    variant="bordered"
                    placeholder="0.00"
                    // value={betAmount}
                    // onChange={(e) => setBetAmount(e.target.value)}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-gray-400">$RACE</span>
                      </div>
                    }
                    classNames={{
                      inputWrapper:
                        "focus-within:ring-2 ring-primary/50 focus-within:border-none",
                      input:
                        "border-none focus-within:ring-0 focus-within:border-none focus-within:outline-0 font-mono text-lg placeholder:text-muted-foreground/50",
                    }}
                  />
                </div>

                {/* Potential Payout */}
                <div className="p-4 bg-[var(--color-muted-bg)] rounded-[var(--radius-base)] border border-[var(--color-border)]">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">
                        Potential Payout
                      </h4>
                      <p className="text-xs text-gray-500">
                        If your runner wins
                      </p>
                    </div>
                    <div className="text-xl font-bold font-mono text-green-accent ml-auto">
                      {potentialPayout.toFixed(2)} RACE
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-6">
                  <Button
                    className="w-full bg-transparent text-danger border border-danger hover:bg-danger/10 font-medium"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#14161A] font-bold shadow-lg shadow-[var(--color-primary)]/30 transition-all hover:shadow-[var(--color-primary)]/50"
                    onPress={onClose}
                  >
                    Place Bet
                  </Button>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PlaceFixedBetDrawer;
