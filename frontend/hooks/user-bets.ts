import { Bet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useWalletBets = () => {
  const { address } = useAccount();

  const {
    data: bets,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Bet[]>({
    queryKey: ["walletBets", address],
    queryFn: async () => {
      const res = await fetch(`/api/bets?address=${address}`);
      const data = await res.json();
      return data;
    },
    enabled: !!address,
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
    staleTime: 29 * 1000,
  });

  return {
    bets,
    isLoading,
    isError,
    error,
    refetch,
  };
};
