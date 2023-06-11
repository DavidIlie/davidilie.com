import { createTRPCRouter } from "~/server/api/trpc";

import { spotifyRouter } from "./routers/spotify";
import { statisticsRouter } from "./routers/statistics";

export const appRouter = createTRPCRouter({
   spotify: spotifyRouter,
   statistics: statisticsRouter,
});

export type AppRouter = typeof appRouter;
