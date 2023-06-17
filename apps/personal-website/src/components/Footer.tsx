import React from "react";
import { FaSpotify } from "react-icons/fa";

import { getPlayingStateAndSong } from "~/server/lib/spotify";
import { SPOTIFY_ACCOUNT } from "~/lib/constants";

import { Tooltip, Footer as UIFooter } from "@david/ui";

const Footer = async () => {
   const data = await getPlayingStateAndSong();
   return (
      <UIFooter>
         <div className="mb-2 flex max-w-[16rem] items-center sm:mb-0 sm:w-48 ">
            <div className="flex">
               <div className="mr-1 text-2xl text-green-600 dark:text-green-500">
                  <Tooltip
                     content="Currently Playing"
                     disabled={!data.isPlaying}
                  >
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
                        <h1 className="max-w-[16rem] truncate text-ellipsis sm:w-48">
                           {data.title}
                        </h1>
                     </a>
                  </Tooltip>
               ) : (
                  <p className="font-semibold">Currently Paused</p>
               )}
            </div>
         </div>
      </UIFooter>
   );
};

export const FooterLoader = () => {
   return (
      <UIFooter>
         <div className="mb-2 flex max-w-[16rem] sm:mb-0 sm:w-48">
            <a href={SPOTIFY_ACCOUNT} target="_blank" rel="noreferrer">
               <FaSpotify className="mr-1 text-2xl text-green-500" />
            </a>
            <span className="mx-0.5" />
            <span>Loading Spotify...</span>
         </div>
      </UIFooter>
   );
};

export default Footer;
