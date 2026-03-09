import { getGithubStarsSnapshot } from "./github-stars";

const githubStarsPath = "/internal/github-stars";

export async function handleInternalRoute(request: Request): Promise<Response | null> {
  const requestUrl = new URL(request.url);
  if (request.method !== "GET" || requestUrl.pathname !== githubStarsPath) {
    return null;
  }

  try {
    const snapshot = await getGithubStarsSnapshot();
    return Response.json(snapshot, {
      headers: {
        "cache-control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { message: "Unable to read GitHub stars." },
      {
        status: 502,
      },
    );
  }
}
