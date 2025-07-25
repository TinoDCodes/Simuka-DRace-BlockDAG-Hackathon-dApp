import { RaceChainBetting__factory } from "typechain/factories/contracts/RaceChainBetting__factory";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { ethers } from "ethers";
import { addToast, closeAll } from "@heroui/react";
import { TokenContractABI } from "@/utils/abis";
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { StrikeBetRequest } from "@/utils/request-types";

type BetDetails = {
  raceId: number;
  stake: number;
  odds: number;
  selectionId: number;
  selectionDetails: string;
};

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PRIMORDIAL_CONTRACT_ADDRESS!;
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_PRIMORDIAL_RACE_COIN_ADDRESS!;

const nanoid = customAlphabet("0123456789", 9);

/* ------------- PLACE FIXED BET ------------- */
export const usePlaceFixedBet = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [bet, setBet] = useState<StrikeBetRequest | null>(null);

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
    const strikeBet = async (success: boolean) => {
      try {
        if (!bet) {
          console.error("No bet to strike");
          return;
        }

        const reqBody: StrikeBetRequest = {
          ...bet,
          transactionId: txHash!,
          succeeded: success,
        };

        await fetch("/api/bets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
      } catch (error) {
        console.error("Failed to report bet result:", error);
      }
    };

    const handleStatusChange = async () => {
      if (status === "success") {
        addToast({
          title: "Bet placed successfully!",
          description: "Your bet has been placed successfully.",
          color: "success",
          icon: "🎉",
        });
        await strikeBet(true);
      }

      if (status === "error") {
        addToast({
          title: "Error placing bet!",
          description: "Unable to place bet. Transaction reverted.",
          color: "danger",
        });
        await strikeBet(false);
      }

      setTimeout(() => {
        closeAll();
      }, 1000);
    };

    handleStatusChange();
  }, [status, bet, txHash]);

  const placeFixedBet = async ({
    raceId,
    stake,
    odds,
    selectionId,
    selectionDetails,
  }: BetDetails) => {
    setIsLoading(true);

    // 1) scale
    const stakeBN = ethers.parseUnits(stake.toString(), 18);
    const scaledOdds = Math.round(odds * 100);

    try {
      // 2) get unique bet id
      const betId = Number(nanoid());

      setBet({
        id: betId,
        walletAddress: address as string,
        eventId: raceId,
        selectionId: selectionId,
        eventDetails: `race ${raceId}`,
        selectionDetails: selectionDetails,
        stake: stake,
        odds: odds,
        betType: 0, // 0 for fixed bet
        transactionId: "",
        succeeded: false,
      });

      // 3) approve
      await writeContractAsync(
        {
          address: `0x${TOKEN_ADDRESS}`,
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

      // 4) place bet
      await writeContractAsync(
        {
          address: `0x${CONTRACT_ADDRESS}`,
          abi: RaceChainBetting__factory.abi,
          functionName: "placeBet",
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

/* ------------- PLACE POOL BET ------------- */
export const usePlacePoolBet = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [bet, setBet] = useState<StrikeBetRequest | null>(null);

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
    const strikeBet = async (success: boolean) => {
      try {
        if (!bet) {
          console.error("No bet to strike");
          return;
        }

        const reqBody: StrikeBetRequest = {
          ...bet,
          transactionId: txHash!,
          succeeded: success,
        };

        await fetch("/api/bets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
      } catch (error) {
        console.error("Failed to report bet result:", error);
      }
    };

    const handleStatusChange = async () => {
      if (status === "success") {
        addToast({
          title: "Bet placed successfully!",
          description: "Your bet has been placed successfully.",
          color: "success",
          icon: "🎉",
        });
        await strikeBet(true);
      }

      if (status === "error") {
        addToast({
          title: "Error placing bet!",
          description: "Unable to place bet. Transaction reverted.",
          color: "danger",
        });
        await strikeBet(false);
      }
    };

    handleStatusChange();
  }, [status, bet, txHash]);

  const placePoolBet = async ({
    raceId,
    stake,
    selectionId,
    selectionDetails,
    impliedOdds,
  }: BetDetails & { impliedOdds: number }) => {
    setIsLoading(true);

    // 1) scale
    const stakeBN = ethers.parseUnits(stake.toString(), 18);

    try {
      // 2) get unique bet id
      const betId = Number(nanoid());

      setBet({
        id: betId,
        walletAddress: address as string,
        eventId: raceId,
        selectionId: selectionId,
        eventDetails: `race ${raceId}`,
        selectionDetails: selectionDetails,
        stake: stake,
        odds: impliedOdds,
        betType: 1, // 1 for pool bet
        transactionId: "",
        succeeded: false,
      });

      // 3) approve
      await writeContractAsync(
        {
          address: `0x${TOKEN_ADDRESS}`,
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

      // 4) place bet
      await writeContractAsync(
        {
          address: `0x${CONTRACT_ADDRESS}`,
          abi: RaceChainBetting__factory.abi,
          functionName: "placeBet",
          args: [betId, stakeBN, 0, selectionId], // pass 0 for odds to signify AI‑implied odds
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
    placePoolBet,
    isLoading,
  };
};
