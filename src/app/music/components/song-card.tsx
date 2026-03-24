"use client";

import React from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";

const SongCard: React.FC<{
   song: {
      name: string;
      album: { name: string; image: string };
      artist: { name: string };
      url: string;
      date?: Date;
   };
   rank?: number;
}> = ({ song, rank }) => {
   return (
      <a
         href={song.url}
         target="_blank"
         rel="noreferrer"
         className="group flex w-full items-center gap-3 rounded-xl border border-gray-200/80 bg-white/60 p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600 dark:hover:shadow-lg dark:hover:shadow-black/20 sm:gap-4 sm:p-3"
      >
         {rank !== undefined && (
            <span className="min-w-[1.25rem] text-center text-sm font-bold tabular-nums text-gray-300 dark:text-gray-600 sm:min-w-[1.5rem] sm:text-base">
               {rank}
            </span>
         )}
         <Image
            alt={`${song.album.name}`}
            className="h-11 w-11 flex-shrink-0 rounded-lg object-cover shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12"
            height={48}
            width={48}
            src={song.album.image}
         />
         <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold leading-tight sm:text-base">
               {song.name}
            </h3>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
               {song.artist.name}
               {song.date && (
                  <span className="text-gray-400 dark:text-gray-600">
                     {" · "}
                     {formatDistance(new Date(song.date), new Date(), {
                        addSuffix: true,
                     })}
                  </span>
               )}
            </p>
         </div>
      </a>
   );
};

export default SongCard;
