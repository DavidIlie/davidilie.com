import { env } from "~/env.mjs";

import { getPlayingStateAndSong, getSpotifyData } from "~/server/spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
   playingStateAndSong: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
   data: publicProcedure.query(async ({ ctx }) => {
      if (env.NODE_ENV === "production")
         await fetch(env.WEBHOOK_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               content: "Someone triggered a spotify request!",
            }),
         });

      return await getSpotifyData();
   }),
});
