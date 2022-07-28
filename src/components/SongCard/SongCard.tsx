import React from "react";
import Image from "next/image";

import { shimmer } from "@/lib/shimmer";
import { SongTrack } from "@/server/lib/spotify";

const SongCard: React.FC<{
   song: SongTrack;
   titleCard?: boolean;
   isPlaying?: boolean;
}> = ({ song, titleCard = false, isPlaying = false }) => (
   <a
      target="_blank"
      rel="noreferrer"
      href={song?.songUrl}
      className="h-full max-w-xl overflow-visible"
   >
      <div
         style={{
            gridTemplateColumns: `${titleCard ? `150px` : `110px`} 1fr`,
         }}
         className="grid py-4 px-3 overflow-visible duration-200 bg-gray-100 border-2 border-gray-200 shadow-lg cursor-pointer dark:bg-gray-800 dark:border-gray-700 rounded-2xl hover:shadow-xl hoverItem"
      >
         <div
            //@ts-ignore
            style={{ boxSizing: titleCard ? `150px` : `110px` }}
            className="rounded-2xl"
         >
            <Image
               alt={(song?.title || song?.name) + " album cover"}
               style={{ borderRadius: "1rem" }}
               width={titleCard ? `150px` : `110px`}
               height={titleCard ? `150px` : `110px`}
               blurDataURL={shimmer(1920, 1080)}
               placeholder="blur"
               src={
                  (titleCard
                     ? song.albumImageUrl
                     : song.album.images[0]!.url) as string
               }
            />
         </div>
         <div className="flex flex-col max-w-full ml-5 truncate">
            <p className="max-w-full text-2xl font-semibold truncate">
               {`${song?.title || song?.name}${
                  titleCard && !isPlaying ? ` - Paused` : ``
               }`}
            </p>
            <div className="flex flex-col w-full mt-2 text-gray-400">
               <h1 className="line-clamp-1">{`Album • ${
                  titleCard ? song.album : song.album.name
               }`}</h1>
               <p className="line-clamp-1">
                  Artist{song.artists?.length > 1 && `s`} •{` `}
                  {song.artist ||
                     song.artists?.map((artist: any) => artist.name).join(`, `)}
               </p>
            </div>
         </div>
      </div>
   </a>
);

export default SongCard;
