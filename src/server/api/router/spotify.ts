import { getPlayingStateAndSong } from "~/server/spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
   playingStateAndSong: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
});
