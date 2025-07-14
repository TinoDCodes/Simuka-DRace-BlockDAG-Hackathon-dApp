import { RaceChainBetting__factory } from "typechain/factories/contracts/RaceChainBetting__factory";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";
import { addToast } from "@heroui/react";
import { TokenContractABI } from "@/utils/abis";
import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS!;

export const usePlaceFixedBet = () => {
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();

  const { status } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });

  useEffect(() => {
    if (status === "success") {
      addToast({
        title: "Bet placed successfully!",
        description: "Your bet has been placed successfully.",
        color: "success",
        icon: "🎉",
      });
    }

    if (status === "error") {
      addToast({
        title: "Error placing bet!",
        description: "Unable to place bet. Transaction reverted.",
        color: "danger",
      });
    }
  }, [status]);

  const placeFixedBet = async (
    betId: number,
    stake: number,
    odds: number,
    selectionId: number
  ) => {
    setIsLoading(true);

    // 1) scale
    const stakeBN = ethers.parseUnits(stake.toString(), 18);
    const scaledOdds = Math.round(odds * 100);

    try {
      // 2) approve
      await writeContractAsync(
        {
          address: "0x6F5d380687dcE063bD0fFee54aF13C616064Bf22",
          abi: TokenContractABI,
          functionName: "approve",
          args: [`0x${CONTRACT_ADDRESS}`, stakeBN],
        },
        {
          onError(error) {
            console.log(error);
            throw new Error("Failed to approve token spending");
          },
        }
      );

      // 3) place bet
      await writeContractAsync(
        {
          address: `0x${CONTRACT_ADDRESS}`,
          abi: RaceChainBetting__factory.abi,
          functionName: "placeFixedBet",
          args: [betId, stakeBN, scaledOdds, selectionId],
        },
        {
          onSuccess(transactionResponse) {
            // immediately let user know we’ve submitted
            addToast({
              title: "Bet transaction submitted",
              description: `Awaiting transaction confirmation...`,
              color: "default",
              classNames: {
                description: "overflow-clip text-wrap max-w-full",
                wrapper: "w-fit",
              },
            });

            // now await on‑chain confirmation
            setTxHash(transactionResponse);
            setIsLoading(false);
          },
          onError(error) {
            setIsLoading(false);
            throw new Error("Failed to place bet");
          },
        }
      );
    } catch (e) {
      // catch approval or placement throw
      setIsLoading(false);
      addToast({
        title: "Transaction Error",
        description: (e as Error).message,
        color: "danger",
      });
    }
  };

  return {
    placeFixedBet,
    isLoading,
  };
};
