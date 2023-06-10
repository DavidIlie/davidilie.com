"use client";

import React from "react";
import { FaSpotify } from "react-icons/fa";

import { Tooltip, Footer as UIFooter } from "ui";
import { SPOTIFY_ACCOUNT } from "~/lib/constants";
import { RouterOutputs } from "~/trpc/shared";

const Footer: React.FC<{ data: RouterOutputs["spotify"]["getFooterData"] }> = ({
   data,
}) => {
   return (
      <UIFooter>
         <div className="flex items-center mb-2 justify-evenly sm:mb-0">
            <div className="mr-1 text-2xl text-green-600 dark:text-green-500">
               <Tooltip content="Currently Playing" disabled={!data.isPlaying}>
                  <a href={SPOTIFY_ACCOUNT} target="_blank" rel="noreferrer">
                     <FaSpotify />
                  </a>
               </Tooltip>
            </div>
            <span className="mx-0.5" />
            {data.isPlaying ? (
               <Tooltip content={data.artist}>
                  <a
                     href={data.songUrl}
                     target="_blank"
                     rel="noreferrer"
                     className="font-semibold"
                  >
                     <h1>{data.title}</h1>
                  </a>
               </Tooltip>
            ) : (
               <p className="font-semibold">Currently Paused</p>
            )}
         </div>
      </UIFooter>
   );
};

export default Footer;
