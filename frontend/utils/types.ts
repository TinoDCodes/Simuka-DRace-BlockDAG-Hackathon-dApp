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

export type RaceStatus =
  | "OPEN"
  | "INRUNNING"
  | "RESULTED"
  | "CANCELLED"
  | "ABANDONED"
  | "SETTLED";

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
  lifeTime: number;
  utilization: number;
  breakdowns: Breakdown[]; // Possibly a typo — should be "breakdowns"?
};

export type Breakdown = {
  id: string;
  impliedOdds: number;
  liquidity: number;
  name: string;
  number: number;
  scratched: boolean;
};

export type Bet = {
  id: number;
  eventId: number;
  selectionId: number;
  status: number; // Possible values: • 0 = Pending • 1 = Accepted • 2 = Rejected • 3 = Cancelled • 4 = Settled • 5 = Void • 6 = Suspended • 7 = InPlay • 8 = Inactive
  placedAtUtc: string;
  lastModifiedAtUtc: string;
  strikeTxnId: string;
  settlementTxnId: string;
  walletAddress: string;
  eventDetails: string;
  selectionDetails: string;
  stake: number;
  odds: number;
  betType: number; // Possible values: • 0 = FixedOdds • 1 = PoolBetting
};
