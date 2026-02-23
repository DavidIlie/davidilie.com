"use client";

import Image from "next/image";

import { Artist } from "~/server/spotify";

const ArtistCard: React.FC<{ artist: Artist; rank: number }> = ({
   artist,
   rank,
}) => {
   return (
      <a
         className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
         href={artist.external_urls.spotify}
         target="_blank"
         rel="noreferrer"
      >
         <Image
            src={artist.images[0].url}
            width={artist.images[0].width / 4}
            height={artist.images[0].height / 4}
            alt={artist.name}
            className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
         />
         <div className="absolute inset-0 flex flex-col items-center justify-end rounded-2xl bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2 sm:p-3">
            <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-[10px] font-bold text-white backdrop-blur-sm sm:h-6 sm:w-6 sm:text-xs">
               {rank}
            </span>
            <h3 className="w-full truncate text-center text-xs font-semibold text-white sm:text-sm md:text-base">
               {artist.name}
            </h3>
            {artist.genres.length > 0 && (
               <p className="mt-0.5 w-full truncate text-center text-[9px] capitalize text-white/60 sm:text-[10px] md:text-xs">
                  {artist.genres.slice(0, 2).join(" · ")}
               </p>
            )}
         </div>
      </a>
   );
};

export default ArtistCard;
