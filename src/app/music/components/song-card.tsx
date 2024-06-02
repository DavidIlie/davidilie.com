/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const SongCard: React.FC<{
   song: {
      name: string;
      album: { name: string; image: string };
      artist: { name: string };
      url: string;
   };
}> = ({ song }) => {
   return (
      <a
         href={song.url}
         className="hoverItem flex w-full rounded-lg border-2 border-gray-700 bg-gray-800 p-4 duration-150"
      >
         <div className="relative flex items-center">
            <img
               alt={`Album cover for ${song.album.name}`}
               className="w-18 h-18 rounded-md"
               height="110"
               src={song.album.image}
               style={{
                  aspectRatio: "110/110",
                  objectFit: "cover",
               }}
               width="110"
            />
            <div className="ml-4 w-[45%] text-white">
               <h3 className="truncate text-lg font-semibold">{song.name}</h3>
               <p className="truncate text-sm opacity-70">
                  Album • {song.album.name}
               </p>
               <p className="truncate text-sm opacity-70">
                  Artist • {song.artist.name}
               </p>
            </div>
         </div>
      </a>
   );
};

export default SongCard;
