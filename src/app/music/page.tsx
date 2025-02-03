import React from "react";
import { Metadata } from "next";

import { api, HydrateClient } from "~/trpc/server";
import { SpotifyClientPage } from "./client";

export const metadata: Metadata = {
   title: "Music",
};

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
