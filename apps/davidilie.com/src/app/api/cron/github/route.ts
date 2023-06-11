import type { NextRequest } from "next/server";

import { GitHubProject } from "@prisma/client";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

import webhook from "webhook-discord";
const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL);

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
   try {
      const secret = req.nextUrl.searchParams.get("secret");

      if (!secret || secret !== env.GITHUB_JOB_SECRET)
         return new Response(JSON.stringify({ message: "haha no" }), {
            status: 400,
         });

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

      hook.success(
         `GitHub Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```Total Repos: " + response.length + "```"
      );

      return new Response(JSON.stringify({ message: "ok" }));
   } catch (error) {
      hook.err(
         `GitHub Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```" + JSON.stringify(error) + "```"
      );
      return new Response(
         JSON.stringify({ message: error.message || "Unknown Error" }),
         { status: 500 }
      );
   }
};
