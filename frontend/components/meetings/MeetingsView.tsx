"use client";

type MeetingsViewProps = {
  date: string;
};

const MeetingsView = ({ date }: MeetingsViewProps) => {
  return <div className="mt-28">Get meetings for {date}</div>;
};

export default MeetingsView;
