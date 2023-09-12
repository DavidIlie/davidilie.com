import { YouTubeStatistic } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const cronRouter = createTRPCRouter({
   statistics: publicProcedure.query(async ({ ctx }) => {
      return (await ctx.prisma.youTubeStatistic.findFirst()) as YouTubeStatistic;
   }),
});
