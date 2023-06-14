import type { NextRequest } from "next/server";
import webhook from "webhook-discord";

import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL);

const youtubeQuery = async (
   item: "subscriberCount" | "viewCount" | "videoCount",
): Promise<number> => {
   const r = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${env.STATISTICS_JOB_CHANNEL}&fields=items/statistics/${item}&key=${env.STATISTICS_JOB_API_KEY}`,
   );
   const response = await r.json();
   return parseInt(response.items[0].statistics[item] as string);
};

export const GET = async (req: NextRequest) => {
   try {
      const secret = req.nextUrl.searchParams.get("secret");

      if (!secret || secret !== env.STATISTICS_JOB_SECRET)
         return new Response(JSON.stringify({ message: "haha no" }), {
            status: 400,
         });

      const stats = {
         subscribers: await youtubeQuery("subscriberCount"),
         views: await youtubeQuery("viewCount"),
         videos: await youtubeQuery("videoCount"),
      };

      await prisma.youTubeStatistic.upsert({
         where: { channel: env.STATISTICS_JOB_CHANNEL },
         create: { channel: env.STATISTICS_JOB_CHANNEL, ...stats },
         update: stats,
      });

      hook.success("", "YouTube: ```" + JSON.stringify(stats) + "```");

      return new Response(JSON.stringify({ message: "ok" }));
   } catch (error: any) {
      hook.err(
         `Statistics Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```" + JSON.stringify(error) + "```",
      );
      return new Response(
         JSON.stringify({ message: error.message || "Unknown Error" }),
         { status: 500 },
      );
   }
};
