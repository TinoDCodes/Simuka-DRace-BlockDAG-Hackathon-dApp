import { RaceChainBetting__factory } from "typechain/factories/contracts/RaceChainBetting__factory";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { ethers, parseUnits } from "ethers";
import { addToast } from "@heroui/react";
import { TokenContractABI } from "@/utils/abis";
import { useEffect, useState } from "react";
import {
  InitiateFixedBetRequest,
  StrikeBetRequest,
} from "@/utils/request-types";

type BetDetails = {
  raceId: number;
  stake: number;
  odds: number;
  selectionId: number;
  selectionDetails: string;
};

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PRIMORDIAL_CONTRACT_ADDRESS!;
const TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_PRIMORDIAL_TEST_RACE_COIN_ADDRESS!;

/* ------------- PLACE FIXED BET ------------- */
export const usePlaceFixedBet = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [betId, setBetId] = useState<number>();

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
      const reqBody: StrikeBetRequest = {
        betId: betId!,
        txnId: txHash!,
        succeeded: success,
      };

      try {
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
  }, [status, betId, txHash]);

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
      const reqBody: InitiateFixedBetRequest = {
        walletAddress: address,
        eventId: raceId,
        selectionId: selectionId,
        eventDetails: `race ${raceId}`,
        selectionDetails: selectionDetails,
        stake: stake,
        odds: odds,
        betType: 0,
      };

      // 2) get unique bet id
      const res = await fetch("/api/bets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        throw new Error("Failed to place bet");
      }

      const bet = await res.json();
      const betId = bet.id;

      setBetId(betId);

      // 3) approve
      await writeContractAsync(
        {
          address: `0x${TOKEN_ADDRESS}`,
          abi: TokenContractABI,
          functionName: "approve",
          args: [`0x${CONTRACT_ADDRESS}`, stakeBN],
          gas: BigInt(100_000),
          gasPrice: parseUnits("5", "gwei"),
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
          gas: BigInt(100_000),
          gasPrice: parseUnits("5", "gwei"),
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
  const [betId, setBetId] = useState<number>();

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
      const reqBody: StrikeBetRequest = {
        betId: betId!,
        txnId: txHash!,
        succeeded: success,
      };

      try {
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
  }, [status, betId, txHash]);

  const placePoolBet = async ({
    raceId,
    stake,
    selectionId,
    selectionDetails,
  }: BetDetails) => {
    setIsLoading(true);

    // 1) scale
    const stakeBN = ethers.parseUnits(stake.toString(), 18);

    try {
      const reqBody: InitiateFixedBetRequest = {
        walletAddress: address,
        eventId: raceId,
        selectionId: selectionId,
        eventDetails: `race ${raceId}`,
        selectionDetails: selectionDetails,
        stake: stake,
        odds: 0,
        betType: 1,
      };

      // 2) get unique bet id
      const res = await fetch("/api/bets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        throw new Error("Failed to place bet");
      }

      const bet = await res.json();
      const betId = bet.id;

      setBetId(betId);

      console.log("stake bn", stakeBN);
      // 3) approve
      await writeContractAsync(
        {
          address: `0x${TOKEN_ADDRESS}`,
          abi: TokenContractABI,
          functionName: "approve",
          args: [`0x${CONTRACT_ADDRESS}`, stakeBN],
          gas: BigInt(100_000),
          gasPrice: parseUnits("5", "gwei"),
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
          gas: BigInt(100_000),
          gasPrice: parseUnits("5", "gwei"),
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
