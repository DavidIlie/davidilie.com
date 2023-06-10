import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getPlayingStateAndSong, getSpotifyData } from "~/server/lib/spotify";

export const spotifyRouter = createTRPCRouter({
   getFooterData: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
   getData: publicProcedure.query(async () => {
      return await getSpotifyData();
   }),
});
