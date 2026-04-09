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
         className="group flex w-full items-center gap-3 rounded-xl border border-border/80 bg-card/60 p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md sm:gap-4 sm:p-3"
      >
         {rank !== undefined && (
            <span className="min-w-[1.25rem] text-center text-sm font-bold tabular-nums text-muted-foreground/40 sm:min-w-[1.5rem] sm:text-base">
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
            <p className="truncate text-xs text-muted-foreground sm:text-sm">
               {song.artist.name}
               {song.date && (
                  <span className="text-muted-foreground/60">
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
