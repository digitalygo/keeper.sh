import { NextRequest } from "next/server";

const API_URL = process.env.API_URL;
if (!API_URL) {
  throw new Error("API_URL is not set");
}

export async function GET(request: NextRequest) {
  const cookie = request.headers.get("Cookie");

  const response = await fetch(`${API_URL}/api/events`, {
    headers: {
      ...(cookie && { Cookie: cookie }),
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
