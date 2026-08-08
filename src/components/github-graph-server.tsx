import { connection } from "next/server";

import { fetchContributions } from "~/server/github-contributions";
import { GitHubGraph } from "./github-graph";

export async function GitHubGraphServer() {
   // GitHub secrets don't exist at Docker build time, so the cached fetch
   // must run at request time ('use cache' still dedupes across requests).
   await connection();
   const data = await fetchContributions();
   if (!data) return null;
   return <GitHubGraph data={data} />;
}
