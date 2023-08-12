import { NextApiHandler } from "next";
import { GitHubProject } from "@prisma/client";
import webhook from "webhook-discord";

import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

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
   const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL);

   try {
      const { secret } = req.query;

      if (!secret || secret !== env.GITHUB_JOB_SECRET)
         return res.status(400).json({ message: "haha no" });

      const r = await fetch(
         `https://api.github.com/users/${env.GITHUB_JOB_USERNAME}/repos`,
      );
      const response = (await r.json()) as any[];

      await Promise.all(
         response.map(
            async (project) =>
               await prisma.gitHubProject.upsert({
                  where: { name: project.name },
                  create: createProjectJSON(project),
                  update: createProjectJSON(project),
               }),
         ),
      );

      hook.success(
         `GitHub Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```Total Repos: " + response.length + "```",
      );

      return res.json({ message: "ok" });
   } catch (error: any) {
      hook.err(
         `GitHub Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```" + JSON.stringify(error) + "```",
      );
      return res
         .status(500)
         .json({ message: error.message || "Unknown Error" });
   }
};

export default handler;