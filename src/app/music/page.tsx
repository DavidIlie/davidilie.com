import React from "react";
import type { Metadata } from "next";

import { buildMetadata } from "~/lib/metadata";

import { api, HydrateClient } from "~/trpc/server";
import { SpotifyClientPage } from "./client";

export const metadata: Metadata = buildMetadata({
   title: "Music",
   description:
      "What I've been listening to lately — currently playing, top artists, top tracks, and recently played, pulled live from Spotify.",
   path: "/music",
});

const Page = async () => {
   void api.spotify.data.prefetch();
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <div className="space-y-6">
            <SpotifyClientPage />
         </div>
      </HydrateClient>
   );
};

export default Page;
