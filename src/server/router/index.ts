import { createRouter } from "./context";
import superjson from "superjson";

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
   });

export type AppRouter = typeof appRouter;
