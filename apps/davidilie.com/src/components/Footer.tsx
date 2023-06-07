"use client";

import React from "react";
import { FaSpotify } from "react-icons/fa";

import { Footer as UIFooter } from "ui";

const SPOTIFY_ACCOUNT = `https://open.spotify.com/user/31cqr3zpmgfnn3b2mgcnmzwbevcq`;

const Footer: React.FC = () => {
   return (
      <UIFooter>
         <>
            <p className="flex">
               <a href={SPOTIFY_ACCOUNT} target="_blank" rel="noreferrer">
                  <FaSpotify className="mr-2 text-2xl text-green-500" />
               </a>
               {" Not Playing Anything"}
            </p>
         </>
      </UIFooter>
   );
};

export default Footer;
