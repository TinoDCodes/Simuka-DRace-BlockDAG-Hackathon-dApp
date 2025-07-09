import RaceView from "@/components/race/RaceView";

export default async function RacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Invalid race ID</div>;
  }

  return <RaceView raceId={id} />;
}
