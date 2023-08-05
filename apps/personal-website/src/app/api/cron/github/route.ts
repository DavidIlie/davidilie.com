import type { NextRequest } from "next/server";
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

export const GET = async (req: NextRequest) => {
   const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL);

   try {
      const secret = req.nextUrl.searchParams.get("secret");

      if (!secret || secret !== env.GITHUB_JOB_SECRET)
         return new Response(JSON.stringify({ message: "haha no" }), {
            status: 400,
         });

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

      return new Response(JSON.stringify({ message: "ok" }));
   } catch (error: any) {
      hook.err(
         `GitHub Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```" + JSON.stringify(error) + "```",
      );
      return new Response(
         JSON.stringify({ message: error.message || "Unknown Error" }),
         { status: 500 },
      );
   }
};
