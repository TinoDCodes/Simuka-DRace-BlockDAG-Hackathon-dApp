import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const meetingId = request.nextUrl.searchParams.get("meetingId");
  const raceId = request.nextUrl.searchParams.get("raceId");
  const backendUrl = process.env.BACKEND_BASE_URL;

  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: "Backend Base URL not defined" }),
      {
        status: 500,
      }
    );
  }

  if (!meetingId || !raceId) {
    return new Response(
      JSON.stringify({ error: "Meeting ID or race ID not found" }),
      {
        status: 500,
      }
    );
  }

  // You can build the backend request URL with query param
  const url = `${backendUrl}/Racing/meetings/${meetingId}/races/${raceId}`;

  const res = await fetch(url);

  if (!res.ok) {
    return new Response(JSON.stringify({ error: `Failed to fetch race` }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
