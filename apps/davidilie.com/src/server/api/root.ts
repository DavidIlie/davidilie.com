import { createTRPCRouter } from "~/server/api/trpc";
import { spotifyRouter } from "./routers/spotify";

export const appRouter = createTRPCRouter({
   spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
