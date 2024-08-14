"use client";

import React from "react";

import { api } from "~/trpc/react";
import SongCard from "./song-card";

const CurrentlyPlaying: React.FC = () => {
   const [data] = api.spotify.playingStateAndSong.useSuspenseQuery();

   if (!data.isPlaying) return <p>Not Playing</p>;

   return (
      <SongCard
         song={{
            album: {
               image: data.albumImageUrl!,
               name: data.album!,
            },
            artist: {
               name: data.artist!,
            },
            name: data.title!,
            url: data.songUrl!,
         }}
      />
   );
};

export default CurrentlyPlaying;
