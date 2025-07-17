import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const details = await request.json();
  const backendUrl = process.env.BACKEND_BASE_URL;

  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: "Backend Base URL not defined" }),
      {
        status: 500,
      }
    );
  }

  const res = await fetch(`${backendUrl}/Bets`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (!res.ok) {
    console.error(res);
    return new Response(JSON.stringify({ error: `Failed to fetch bet` }), {
      status: res.status,
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request: NextRequest) {
  const details = await request.json();
  const backendUrl = process.env.BACKEND_BASE_URL;

  if (!backendUrl) {
    return new Response(
      JSON.stringify({ error: "Backend Base URL not defined" }),
      {
        status: 500,
      }
    );
  }

  console.log("request body", details);

  const res = await fetch(`${backendUrl}/Bets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (!res.ok) {
    console.error(res);
    return new Response(
      JSON.stringify({
        error: `Failed to updated bet with tx hash or failure status`,
      }),
      {
        status: res.status,
      }
    );
  }

  const data = await res.json();
  console.log("data", data);
  return new Response(JSON.stringify(data), { status: 200 });
}

// {
//   "betId": 10,
//   "txnId": "0xcc26a6b101d6508385bb3011b9154694fe101c1162f73a3953e4e22c2b8b7025",
//   "succeeded": true
// }
