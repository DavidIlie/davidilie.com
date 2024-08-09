"use client";

import React, { Suspense } from "react";
import { Music, Pause } from "lucide-react";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import ExternalLink from "./external-link";
import { Socials } from "./socials";

const Footer: React.FC = () => {
   return (
      <footer className="w-full bg-slate-200 bg-opacity-40 pb-5 pt-5 text-black dark:bg-slate-800 dark:bg-opacity-50 dark:text-white">
         <div className="flex flex-col items-center sm:mx-32 sm:flex-row sm:justify-evenly">
            <Suspense
               fallback={
                  <div className="mb-2 sm:mb-0 sm:w-1/3">
                     Built with{" "}
                     <ExternalLink
                        className="font-bold"
                        url="https://nextjs.org"
                     >
                        Next.js
                     </ExternalLink>
                     ,{" "}
                     <ExternalLink className="font-bold" url="https://trpc.io">
                        tRPC
                     </ExternalLink>{" "}
                     and{" "}
                     <ExternalLink
                        className="font-bold"
                        url="https://tailwindcss.com"
                     >
                        Tailwind
                     </ExternalLink>
                  </div>
               }
            >
               <SpotifySuspense />
            </Suspense>
            <h2 className="mb-2 text-center text-[1.2rem] sm:mb-0 sm:w-1/3">
               Powered by{" "}
               <a
                  href="https://davidapps.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium duration-150 hover:text-blue-500"
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

export const SPOTIFY_ACCOUNT = `https://open.spotify.com/user/31up3s2w6xieifum25jf6h4e4efa`;

const SpotifySuspense: React.FC = () => {
   const [data] = api.spotify.playingStateAndSong.useSuspenseQuery();
   return (
      <div className="mb-2 flex gap-1 sm:mb-0 sm:w-1/3">
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
                     <a
                        href={data.songUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer font-semibold"
                     >
                        <h1 className="max-w-[16rem] truncate text-ellipsis">
                           {data.title}
                        </h1>
                     </a>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>{data.artist}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         ) : (
            <p className="font-semibold">Currently Paused</p>
         )}
      </div>
   );
};

export default Footer;
