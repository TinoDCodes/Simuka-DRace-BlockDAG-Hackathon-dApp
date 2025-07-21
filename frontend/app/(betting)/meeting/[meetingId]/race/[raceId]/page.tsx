import RaceView from "@/components/race/RaceView";

export default async function RacePage({
  params,
}: {
  params: Promise<{ meetingId: string; raceId: string }>;
}) {
  const { meetingId, raceId } = await params;

  return <RaceView meetingId={meetingId} raceId={raceId} />;
}
