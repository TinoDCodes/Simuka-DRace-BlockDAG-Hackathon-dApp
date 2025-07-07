import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const apiKey = process.env.MEETINGS_API_KEY;
  const backendUrl = "http://localhost:3001/meetings";
  const date = request.nextUrl.searchParams.get("date");

  // You can build the backend request URL with query param
  const url = `${backendUrl}?date=${encodeURIComponent(date ?? "")}`;

  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
