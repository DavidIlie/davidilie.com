import { blogRouter } from "./router/blog";
import { cronRouter } from "./router/cron";
import { spotifyRouter } from "./router/spotify";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
   spotify: spotifyRouter,
   cron: cronRouter,
   blog: blogRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
