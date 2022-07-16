import React from "react";
import { FaSpotify } from "react-icons/fa";

import { trpc } from "@/lib/trpc";
import Tooltip from "../Tooltip";
import Socials from "../Socials";

const Footer: React.FC = () => {
   const { error, data: currentlyPlaying } = trpc.useQuery([
      "spotify.isPlaying",
   ]);

   const SPOTIFY_ACCOUNT = `https://open.spotify.com/user/31ykyntuzozd4cpa62zraff2afxe`;

   return (
      <footer className="w-full pt-5 pb-5 text-black dark:text-white bg-slate-200 bg-opacity-40 dark:bg-slate-800 dark:bg-opacity-50">
         <div className="flex flex-wrap items-center justify-center mx-12 sm:justify-evenly">
            <div className="flex items-center mb-2 justify-evenly sm:mb-0">
               {currentlyPlaying?.songUrl ? (
                  <>
                     <div className="mr-1 text-2xl text-green-600 dark:text-green-500">
                        {currentlyPlaying.isPlaying ? (
                           <Tooltip content="Currently Playing">
                              <span>
                                 <FaSpotify />
                              </span>
                           </Tooltip>
                        ) : (
                           <Tooltip content="Currently paused">
                              <span>
                                 <FaSpotify />
                              </span>
                           </Tooltip>
                        )}
                     </div>
                     <span className="mx-0.5" />
                     <Tooltip content={currentlyPlaying.artist}>
                        <a
                           href={currentlyPlaying.songUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="font-semibold"
                        >
                           <h1>{currentlyPlaying.title}</h1>
                        </a>
                     </Tooltip>
                     <span className="mx-1"> - </span>
                     <a
                        href={SPOTIFY_ACCOUNT}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-green-500 dark:text-green-700"
                     >
                        Spotify
                     </a>
                  </>
               ) : (
                  <p className="flex">
                     <a href={SPOTIFY_ACCOUNT} target="_blank" rel="noreferrer">
                        <FaSpotify className="mr-1 text-2xl text-green-500" />
                     </a>
                     {error ? "- There was an error" : "- Not Playing Anything"}
                  </p>
               )}
            </div>
            <h1 className="mb-2 text-lg sm:mb-0">
               Powered by{" "}
               <a
                  href="https://davidapps.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium duration-150 hover:text-blue-500"
               >
                  David Ilie Apps Platform
               </a>
            </h1>
            <div>
               <Socials font="1.5" />
            </div>
         </div>
      </footer>
   );
};

export default Footer;
