"use client";

import React from "react";
import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Music } from "lucide-react";

import { SPOTIFY_ACCOUNT } from "~/components/footer";
import { useTRPC } from "~/trpc/react";

const CurrentlyPlaying: React.FC = () => {
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(
      trpc.spotify.playingStateAndSong.queryOptions(),
   );

   if (!data.isPlaying)
      return (
         <a
            href={SPOTIFY_ACCOUNT}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-muted/80 p-5 transition-all duration-300 hover:border-border hover:shadow-lg sm:p-6"
         >
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-muted sm:h-20 sm:w-20">
               <Music className="h-6 w-6 text-muted-foreground sm:h-8 sm:w-8" />
            </div>
            <div>
               <p className="text-sm font-medium text-muted-foreground">
                  Not currently listening
               </p>
               <p className="mt-0.5 text-xs text-muted-foreground/60">
                  Check back later
               </p>
            </div>
         </a>
      );

   return (
      <a
         href={data.songUrl}
         target="_blank"
         rel="noreferrer"
         className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-transparent p-5 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/5 sm:p-6"
      >
         <div className="absolute top-3 right-4 flex items-end gap-[3px]">
            <span
               className="music-bar h-3 bg-green-500"
               style={{ animationDuration: "0.8s" }}
            />
            <span
               className="music-bar h-3 bg-green-500"
               style={{ animationDuration: "0.6s", animationDelay: "0.2s" }}
            />
            <span
               className="music-bar h-3 bg-green-500"
               style={{ animationDuration: "0.9s", animationDelay: "0.1s" }}
            />
         </div>
         <Image
            src={data.albumImageUrl!}
            alt={data.album!}
            width={80}
            height={80}
            className="h-16 w-16 flex-shrink-0 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
         />
         <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium tracking-wider text-green-600 uppercase dark:text-green-400">
               Now Playing
            </p>
            <h3 className="truncate text-base font-bold sm:text-lg">
               {data.title}
            </h3>
            <p className="truncate text-sm opacity-70">{data.artist}</p>
            <p className="truncate text-xs opacity-50">{data.album}</p>
         </div>
      </a>
   );
};

export default CurrentlyPlaying;
