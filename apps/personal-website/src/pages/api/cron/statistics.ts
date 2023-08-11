import { NextApiHandler } from "next";
import webhook from "webhook-discord";

import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

const youtubeQuery = async (
   item: "subscriberCount" | "viewCount" | "videoCount",
): Promise<number> => {
   const r = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${env.STATISTICS_JOB_CHANNEL}&fields=items/statistics/${item}&key=${env.STATISTICS_JOB_API_KEY}`,
   );
   const response = await r.json();
   return parseInt(response.items[0].statistics[item] as string);
};

const handler: NextApiHandler = async (req, res) => {
   const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL);

   try {
      const { secret } = req.query;

      if (!secret || secret !== env.STATISTICS_JOB_SECRET)
         return res.status(400).json({ message: "haha no" });

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

      return res.json({ message: "ok" });
   } catch (error: any) {
      hook.err(
         `Statistics Job ${env.NODE_ENV === "development" ? " (DEV)" : ""}`,
         "```" + JSON.stringify(error) + "```",
      );
      return res
         .status(500)
         .json({ message: error.message || "Unknown Error" });
   }
};

export default handler;
