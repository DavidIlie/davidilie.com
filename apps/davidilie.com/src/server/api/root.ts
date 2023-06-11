import { createTRPCRouter } from "~/server/api/trpc";

import { spotifyRouter } from "./routers/spotify";
import { jobRouter } from "./routers/jobs";

export const appRouter = createTRPCRouter({
   spotify: spotifyRouter,
   job: jobRouter,
});

export type AppRouter = typeof appRouter;
