import { Race } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useRaceData = (raceId: string) => {
  const { data, isLoading, isError } = useQuery<Race>({
    queryKey: ["race", raceId],
    queryFn: async () => {
      const res = await fetch(`/api/race?raceId=${raceId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch race");
      }

      return await res.json();
    },
    refetchInterval: 60 * 1000, // 1 minute
    staleTime: 55 * 1000, // 55 seconds
    refetchIntervalInBackground: true,
  });

  return {
    raceData: data,
    isLoading,
    isError,
  };
};
