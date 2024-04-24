"use client";

import Image from "next/image";

import { Artist } from "~/server/spotify";

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
   return (
      <a
         className="hoverItem relative duration-150"
         href={artist.external_urls.spotify}
      >
         <div className="absolute inset-0 bg-black/50">
            <h1 className="flex h-full items-center justify-center text-xl font-medium">
               {artist.name}
            </h1>
         </div>
         <Image
            src={artist.images[0].url}
            width={artist.images[0].width / 4}
            height={artist.images[0].height / 4}
            alt={artist.name}
            className="rounded-md"
         />
      </a>
   );
};

export default ArtistCard;
