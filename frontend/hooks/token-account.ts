import { TokenContractABI } from "@/utils/abis";
import { useAccount, useReadContract } from "wagmi";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TEST_RACE_COIN_ADDRESS!;

export const useTokenAccount = () => {
  const { address } = useAccount();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: `0x${TOKEN_ADDRESS}`,
    abi: TokenContractABI,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address,
      refetchInterval: 30 * 1000,
      refetchIntervalInBackground: true,
    },
  });

  return {
    balance,
    isLoading,
    refetch,
  };
};
