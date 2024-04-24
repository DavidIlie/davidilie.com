import { getPlayingStateAndSong, getSpotifyData } from "~/server/spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
   playingStateAndSong: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
   data: publicProcedure.query(async () => {
      return await getSpotifyData();
   }),
});
