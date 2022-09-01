import superjson from "superjson";
import { z } from "zod";

import { createRouter } from "./context";
import { blogRouter } from "./blog";
import { spotifyRouter } from "./spotify";

export const appRouter = createRouter()
   .transformer(superjson)
   .merge("blog.", blogRouter)
   .merge("spotify.", spotifyRouter)
   .query("getStatistics", {
      async resolve({ ctx }) {
         return ctx.prisma.youTubeStatictic.findFirst();
      },
   })
   .query("getProjects", {
      async resolve({ ctx }) {
         return ctx.prisma.gitHubProject.findMany();
      },
   })
   .query("getProjectByName", {
      input: z.object({ name: z.string() }),
      async resolve({ ctx, input }) {
         return ctx.prisma.gitHubProject.findFirst({
            where: { name: input.name },
         });
      },
   });

export type AppRouter = typeof appRouter;
