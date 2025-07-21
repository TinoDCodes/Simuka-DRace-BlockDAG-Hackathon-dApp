import { Race } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useRaceData = (meetingId: string, raceId: string) => {
  const { data, isLoading, isError, error, errorUpdatedAt, failureCount } =
    useQuery<Race>({
      queryKey: ["race", meetingId, raceId],
      queryFn: async () => {
        const res = await fetch(
          `/api/race?meetingId=${meetingId}&raceId=${raceId}`
        );

        if (!res.ok) {
          throw new Error(
            "There was an unexpected error while loading the race data.",
            {
              cause: res.status,
            }
          );
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
    error,
    errorUpdatedAt,
    failureCount,
  };
};
