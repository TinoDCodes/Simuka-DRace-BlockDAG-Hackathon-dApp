import { TokenContractABI } from "@/utils/abis";
import { useAccount, useReadContract } from "wagmi";

export const useTokenAccount = () => {
  const { address } = useAccount();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: "0x6F5d380687dcE063bD0fFee54aF13C616064Bf22",
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
