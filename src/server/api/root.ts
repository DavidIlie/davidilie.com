import { spotifyRouter } from "./router/spotify";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
   spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
