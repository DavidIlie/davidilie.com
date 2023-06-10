"use client";
import { Footer } from "ui";
import { SPOTIFY_ACCOUNT } from "~/lib/constants";

import { FaSpotify } from "react-icons/fa";

const LoadingFooter = () => {
   return (
      <Footer>
         <div className="flex items-center mb-2 justify-evenly sm:mb-0">
            <p className="flex">
               <a href={SPOTIFY_ACCOUNT} target="_blank" rel="noreferrer">
                  <FaSpotify className="mr-1 text-2xl text-green-500" />
               </a>
               Loading Spotify
            </p>
         </div>
      </Footer>
   );
};

export default LoadingFooter;
