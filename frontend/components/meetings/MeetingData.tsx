import { Meeting } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useMeetingData = (selectedDate: string) => {
  const { data, isLoading, isError } = useQuery<Meeting[]>({
    queryKey: ["meetingData", selectedDate], // reactively refetch on date change
    queryFn: async () => {
      const response = await fetch(`/api/meetings?date=${selectedDate}`);

      if (!response.ok) throw new Error("Failed to fetch meetings");

      return await response.json();
    },
    refetchInterval: 5 * 60 * 1000, // auto refetch every 5 minutes
    staleTime: 4.5 * 60 * 1000, // mark as stale just before refetch
  });

  return {
    meetingData: data,
    isLoading,
    isError,
  };
};
