import { type } from "arktype";
import { createStaleCache } from "./cache/stale-cache";

export interface GithubStarsSnapshot {
  count: number;
  fetchedAt: string;
}

const githubRepositoryResponseSchema = type({
  stargazers_count: "number.integer >= 0",
});

const githubRepositoryApiUrl = "https://api.github.com/repos/ridafkih/keeper.sh";
const githubApiVersion = "2022-11-28";
const githubUserAgent = "@keeper.sh/canary-web";

async function fetchGithubStarsCount(): Promise<number> {
  const response = await fetch(githubRepositoryApiUrl, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": githubUserAgent,
      "x-github-api-version": githubApiVersion,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub stars request failed: ${response.status} ${response.statusText}`);
  }

  const parsedResponse = githubRepositoryResponseSchema(await response.json());
  if (parsedResponse instanceof type.errors) {
    throw new Error(`Invalid GitHub stars response: ${parsedResponse}`);
  }

  return parsedResponse.stargazers_count;
}

const githubStarsCache = createStaleCache<number>({
  load: fetchGithubStarsCount,
  name: "github-stars",
  ttlMs: 1000 * 60 * 30,
});

export async function getGithubStarsSnapshot(): Promise<GithubStarsSnapshot> {
  const snapshot = await githubStarsCache.getSnapshot();
  return {
    count: snapshot.value,
    fetchedAt: new Date(snapshot.fetchedAtMs).toISOString(),
  };
}
