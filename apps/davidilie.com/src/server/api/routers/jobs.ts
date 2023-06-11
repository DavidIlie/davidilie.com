import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const jobRouter = createTRPCRouter({
   statistics: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.youTubeStatictic.findFirst();
   }),
   projects: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.gitHubProject.findMany();
   }),
});
