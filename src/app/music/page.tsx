import React from "react";
import { Metadata } from "next";

import { api } from "~/trpc/server";
import ArtistCard from "./components/artist-card";
import CurrentlyPlaying from "./components/currently-playing";
import SongCard from "./components/song-card";

export const metadata: Metadata = {
   title: "Music",
};

const Page = async () => {
   const data = await api.spotify.data();

   return (
      <div className="space-y-6">
         <h1 className="gradient-text pb-2 text-center text-5xl font-bold sm:-mb-6 sm:text-6xl">
            Music
         </h1>
         <div className="grid w-full grid-cols-1 justify-evenly gap-4 sm:grid-cols-2">
            <Section title="Top Artists">
               <div className="grid grid-cols-3 gap-4">
                  {data.artists.items.map((s) => (
                     <ArtistCard artist={s} key={s.id} />
                  ))}
               </div>
            </Section>
            <Section title="Currently Playing">
               <CurrentlyPlaying />
            </Section>
            <Section title="Top Played Songs">
               <div className="space-y-6">
                  {data.songs.items.map((s) => (
                     <SongCard
                        key={s.id}
                        song={{
                           name: s.name,
                           album: {
                              image: s.album.images[0].url,
                              name: s.album.name,
                           },
                           artist: {
                              name: s.artists[0].name,
                           },
                           url: s.external_urls.spotify,
                        }}
                     />
                  ))}
               </div>
            </Section>
            <Section title="Recently Played">
               <div className="space-y-6">
                  {data.recentlyPlayed.items.map((s) => (
                     <SongCard
                        key={s.track.id}
                        song={{
                           name: s.track.name,
                           album: {
                              image: s.track.album.images[0].url,
                              name: s.track.album.name,
                           },
                           artist: {
                              name: s.track.artists[0].name,
                           },
                           url: s.track.external_urls.spotify,
                        }}
                     />
                  ))}
               </div>
            </Section>
         </div>
      </div>
   );
};

const Section = ({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode | React.ReactNode[];
}) => {
   return (
      <div className="space-y-4">
         <h2 className="gradient-text pb-2 text-4xl font-semibold">{title}</h2>
         {children}
      </div>
   );
};

export default Page;
