export type SocialLink = {
  platform: string;
  link: string;
  icon: string;
};

export type MeetingData = {
  meetings: Meeting[];
};

export type Meeting = {
  id: string;
  country: string;
  title: string;
  meetingDate: string; // You could use `Date` if it's parsed.
  races: Race[];
};

export type RaceStatus = "OPEN" | "INRUNNING" | "RESULTED";

export type Race = {
  id: string;
  status: RaceStatus;
  raceNumber: number;
  time: string; // e.g., "12:00 PM"
  distance: number;
  name: string;
  runners: Runner[];
  pool: Pool;
};

export type Runner = {
  id: string;
  name: string;
  jockey: string;
  trainer: string;
  barrier: number;
  Number: number;
  weight: number;
  winOdds: number;
  finalPosition: number;
  scratched: boolean;
};

export type Pool = {
  totalLiquidity: number;
  LifeTime: number;
  breakdowns: Breakdown[]; // Possibly a typo — should be "breakdowns"?
};

export type Breakdown = {
  id: string;
  impliedOdds: number;
  liquidity: number;
};
