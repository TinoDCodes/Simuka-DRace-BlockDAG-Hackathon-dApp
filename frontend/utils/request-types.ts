export type StrikeBetRequest = {
  id: number;
  walletAddress: string;
  eventId: number;
  selectionId: number;
  eventDetails: string;
  selectionDetails: string;
  stake: number;
  odds: number;
  betType: number;
  transactionId: string;
  succeeded: boolean;
};

export type InitiateFixedBetRequest = {
  walletAddress: `0x${string}` | undefined;
  eventId: number;
  selectionId: number;
  eventDetails: string;
  selectionDetails: string;
  stake: number;
  odds: number;
  betType: number;
};
