import { fetchContributions } from "~/server/github-contributions";
import { GitHubGraph } from "./github-graph";

export async function GitHubGraphServer() {
   const data = await fetchContributions();
   if (!data) return null;
   return <GitHubGraph data={data} />;
}
