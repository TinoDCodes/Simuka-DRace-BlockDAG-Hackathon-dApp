import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const backendUrl = process.env.BACKEND_BASE_URL;

  if (!backendUrl || !id) {
    return new Response(
      JSON.stringify({ error: "Backend URL or race ID not found" }),
      {
        status: 500,
      }
    );
  }

  // You can build the backend request URL with query param
  const url = `${backendUrl}/race`;

  const res = await fetch(url);

  if (!res.ok) {
    return new Response(JSON.stringify({ error: `Failed to fetch race` }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
