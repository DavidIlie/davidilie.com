import { getPlayingStateAndSong, getSpotifyData } from "~/server/spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
   playingStateAndSong: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
   data: publicProcedure.query(async ({ ctx }) => {
      return await getSpotifyData();
   }),
   playingHistory: publicProcedure.query(async () => {
      const data = await getSpotifyData();
      return {
         items: data.recentlyPlayed.items,
         cachedAt: data.rateDate ?? new Date(),
      };
   }),
});
