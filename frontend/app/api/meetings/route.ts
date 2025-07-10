import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  // const apiKey = process.env.MEETINGS_API_KEY;
  const backendUrl = process.env.BACKEND_BASE_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL or date not found" },
      { status: 500 }
    );
  }

  // You can build the backend request URL with query param
  const url = `${backendUrl}/meetings${date ? `?date=${date}` : ""}`;

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
