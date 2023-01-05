import type { NextApiHandler } from "next";
import webhook from "webhook-discord";
const hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL);

import { prisma } from "@/server/db/client";
import { GitHubProject } from "@prisma/client";

const createProjectJSON = (repo: any): GitHubProject => ({
   name: repo.name,
   url: repo.html_url,
   description: repo.description || "No description...",
   stars: repo.stargazers_count,
   issues: repo.open_issues,
   createdAt: repo.created_at,
   lastPush: repo.pushed_at,
   language: repo.language,
});

const handler: NextApiHandler = async (req, res) => {
   try {
      const { secret } = req.query;

      if (!secret || secret !== process.env.GITHUB_JOB_SECRET)
         return res.status(401).json({ message: "haha no" });

      const r = await fetch(
         `https://api.github.com/users/${process.env.GITHUB_JOB_USERNAME}/repos`
      );
      const response = (await r.json()) as any[];

      await Promise.all(
         response.map(
            async (project) =>
               await prisma.gitHubProject.upsert({
                  where: { name: project.name },
                  create: createProjectJSON(project),
                  update: createProjectJSON(project),
               })
         )
      );

      hook.success("", "GitHub: ```Total Repos: " + response.length + "```");

      return res.json({ message: "ok" });
   } catch (error: any) {
      hook.err("GitHub Job", "```" + JSON.stringify(error) + "```");
      return res
         .status(500)
         .json({ message: error.message || "Unknown Error" });
   }
};

export default handler;
