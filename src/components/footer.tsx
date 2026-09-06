"use client";

import React, { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Music, Pause } from "lucide-react";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "~/components/ui/tooltip";
import { useTRPC } from "~/trpc/react";
import ExternalLink from "./external-link";
import { Socials } from "./socials";

const Footer: React.FC = () => {
   return (
      <footer className="w-full bg-muted/50 pt-5 pb-5 text-foreground">
         <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:flex-row sm:justify-evenly">
            <div className="mb-2 sm:mb-0 sm:w-1/3">
               <Suspense fallback={<BuiltInfo />}>
                  <SpotifySuspense />
               </Suspense>
            </div>
            <h2 className="mb-2 text-center text-[1.2rem] sm:mb-0 sm:w-1/3">
               Powered by{" "}
               <a
                  href="https://davidapps.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium duration-150 hover:text-brand"
               >
                  David Ilie Apps Platform
               </a>
            </h2>
            <div className="flex justify-center sm:mb-0 sm:w-1/3">
               <Socials font="1.5" />
            </div>
         </div>
      </footer>
   );
};

const BuiltInfo = () => {
   return (
      <p>
         Built with{" "}
         <ExternalLink className="font-bold" url="https://nextjs.org">
            Next.js
         </ExternalLink>
         {", "}
         <ExternalLink className="font-bold" url="https://trpc.io">
            tRPC
         </ExternalLink>{" "}
         and{" "}
         <ExternalLink className="font-bold" url="https://tailwindcss.com">
            Tailwind
         </ExternalLink>
      </p>
   );
};

export const SPOTIFY_ACCOUNT = `https://open.spotify.com/user/312tjs5nlu2gipgpp3kj77y6xm2m`;

const SpotifySuspense: React.FC = () => {
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(
      trpc.spotify.playingStateAndSong.queryOptions(),
   );

   return (
      <div className="mb-2 flex gap-1 sm:mb-0">
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <a
                     href={SPOTIFY_ACCOUNT}
                     target="_blank"
                     rel="noreferrer"
                     className="cursor-pointer text-2xl text-green-600 dark:text-green-500"
                  >
                     {data.isPlaying ? <Music /> : <Pause />}
                  </a>
               </TooltipTrigger>
               <TooltipContent asChild>
                  <p>Currently {data.isPlaying ? "Playing" : "Paused"}</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <span className="mx-0.5" />
         {data.isPlaying ? (
            <TooltipProvider>
               <Tooltip disableHoverableContent={!data.isPlaying}>
                  <TooltipTrigger asChild>
                     <span className="flex min-w-0 items-baseline gap-1">
                        <a
                           href={data.songUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="min-w-0 cursor-pointer font-semibold"
                        >
                           <span className="block max-w-[11rem] truncate text-ellipsis">
                              {data.title}
                           </span>
                        </a>
                        {data.deviceName && (
                           <span className="max-w-[8rem] shrink-0 truncate text-xs text-muted-foreground">
                              on {data.deviceName}
                           </span>
                        )}
                     </span>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>{data.artist}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         ) : (
            <BuiltInfo />
         )}
      </div>
   );
};

export default Footer;
