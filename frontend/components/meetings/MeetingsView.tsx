"use client";

import { useEffect, useState } from "react";
import LoadingOverlay from "../LoadingOverlay";
import { useMeetingData } from "./MeetingData";
import PaginationControl from "./PaginationControl";
import { Meeting } from "@/utils/types";
import Link from "next/link";
import ErrorDisplay from "../ErrorDisplay";
import { CalendarX2Icon } from "lucide-react";

type MeetingsViewProps = {
  date: string;
  page: string;
};

const PAGE_SIZE = 10;

const MeetingsView = ({ date, page }: MeetingsViewProps) => {
  const {
    meetingData,
    isLoading,
    isError,
    error,
    errorUpdatedAt,
    failureCount,
  } = useMeetingData(date);
  const [displayedMeetings, setDisplayedMeetings] = useState<Meeting[]>([]);

  const currentPage: number = parseInt(page) || 1;

  useEffect(() => {
    if (meetingData && meetingData.length > 0) {
      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      setDisplayedMeetings(meetingData.slice(start, end));
    }
  }, [meetingData, currentPage]);

  // Loading state UI
  if (isLoading && failureCount < 1) {
    return <LoadingOverlay />;
  }

  // Error state UI
  if (isError) {
    return (
      <ErrorDisplay
        title="Error"
        message={
          error?.message ??
          "There was an unexpected error while loading the race data."
        }
        errorCode={error?.cause as string}
        lastUpdatedAt={errorUpdatedAt}
      />
    );
  }

  // When data is undefined, return null
  if (!meetingData) return null;

  // Empty data UI
  if (meetingData.length === 0)
    return (
      <div className="grow flex flex-col items-center justify-center text-center px-4 py-12 text-white/60">
        <CalendarX2Icon className="w-10 h-10 mb-4 text-white/30" />
        <p className="text-lg font-mono">No meetings found</p>
        <p className="text-sm mt-1 text-white/40">
          Try selecting a different date above.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col flex-grow w-full">
      <div className="w-full h-full lg:max-w-7xl mx-auto p-4 grid gap-3">
        {displayedMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="w-full bg-primary/10 p-4 rounded-xl shadow-md border border-[#2A2A35] flex flex-col lg:grid lg:grid-cols-10 lg:gap-6 overflow-x-hidden"
          >
            <div className="flex flex-col justify-center space-y-2 col-span-2 mb-2 lg:mb-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white line-clamp-1">
                  {meeting.title}
                </h2>
                <span className="text-xs px-2 py-1 rounded bg-red-600 text-white font-medium shrink-0">
                  LIVE
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{meeting.country}</p>
            </div>

            <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-thin scrollbar-thumb-[#333] col-span-8 flex-nowrap">
              {meeting.races.map((race) => (
                <Link
                  key={race.id}
                  href={`/race/${race.id}`}
                  className={`
                  flex flex-col items-center px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all
                  ${
                    race.status === "Settled"
                      ? "bg-[#3a3a50]/40 text-white/70 hover:scale-105"
                      : "bg-[#2b2b35]  hover:bg-[#3a3a50]"
                  }`}
                >
                  <div className="text-inherit">R{race.raceNumber}</div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                    {race.time}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <PaginationControl
          total={meetingData.length}
          itemsPerPage={PAGE_SIZE}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default MeetingsView;
