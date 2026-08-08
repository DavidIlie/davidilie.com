import React, { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";

import { buildMetadata } from "~/lib/metadata";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { SpotifyClientPage } from "./client";
import { MusicPageSkeleton } from "./skeleton";

export const metadata: Metadata = buildMetadata({
   title: "Music",
   description:
      "What I've been listening to lately — currently playing, top artists, top tracks, and recently played, pulled live from Spotify.",
   path: "/music",
});

const SpotifyContent = async () => {
   // Spotify data needs API secrets that don't exist at build time.
   await connection();

   prefetch(trpc.spotify.data.queryOptions());
   prefetch(trpc.spotify.playingStateAndSong.queryOptions());

   return (
      <HydrateClient>
         <SpotifyClientPage />
      </HydrateClient>
   );
};

const Page = () => {
   return (
      <div className="space-y-6">
         <Suspense fallback={<MusicPageSkeleton />}>
            <SpotifyContent />
         </Suspense>
      </div>
   );
};

export default Page;
