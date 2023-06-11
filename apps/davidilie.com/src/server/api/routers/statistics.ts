import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const statisticsRouter = createTRPCRouter({
   data: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.youTubeStatictic.findFirst();
   }),
});
