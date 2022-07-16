import type { NextApiHandler } from "next";

import { prisma } from "@/server/db/client";

const youtubeQuery = async (
   item: "subscriberCount" | "viewCount" | "videoCount",
   channel: string
): Promise<number> => {
   const r = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel}&fields=items/statistics/${item}&key=${process.env.STATISTICS_JOB_API_KEY}`
   );
   const response = await r.json();
   return parseInt(response.items[0].statistics[item]);
};

const createStatsObject = async (channel: string) => ({
   subscribers: await youtubeQuery("subscriberCount", channel),
   views: await youtubeQuery("viewCount", channel),
   videos: await youtubeQuery("videoCount", channel),
});

const handler: NextApiHandler = async (req, res) => {
   try {
      const { secret } = req.query;

      if (!secret || secret !== process.env.STATISTICS_JOB_SECRET)
         return res.status(401).json({ message: "haha no" });

      const channel = process.env.STATISTICS_JOB_CHANNEL;

      let stats;

      try {
         stats = await createStatsObject(channel);
      } catch (error: any) {
         return res
            .status(500)
            .json({ message: error.message || "Unknown Error" });
      }

      await prisma.youTubeStatictic.upsert({
         where: { channel },
         create: { channel, ...stats },
         update: stats,
      });

      return res.json({ message: "ok" });
   } catch (error: any) {
      return res
         .status(500)
         .json({ message: error.message || "Unknown Error" });
   }
};

export default handler;
