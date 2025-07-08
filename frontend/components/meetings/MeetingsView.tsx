"use client";

import { useMeetingData } from "./MeetingData";

type MeetingsViewProps = {
  date: string;
};

const MeetingsView = ({ date }: MeetingsViewProps) => {
  const { meetingData, isLoading, isError } = useMeetingData(date);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading meetings.</div>;
  if (!meetingData || meetingData.length === 0)
    return <div className="text-muted">No meetings found.</div>;

  return (
    <div className="w-full lg:max-w-7xl mx-auto p-4 grid gap-3">
      {meetingData.map((meeting) => (
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
              <button
                key={race.id}
                className={`
                  flex flex-col items-center px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all
                  ${
                    race.status === "Settled"
                      ? "bg-[#3a3a50]/40 text-white/70 hover:scale-105"
                      : "bg-[#2b2b35] text-white hover:bg-[#3a3a50]"
                  }`}
              >
                <div>R{race.raceNumber}</div>
                <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                  {race.time}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingsView;
