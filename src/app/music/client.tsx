"use client";

import { formatDistance } from "date-fns";

import { api } from "~/trpc/react";
import ArtistCard from "./components/artist-card";
import CurrentlyPlaying from "./components/currently-playing";
import SongCard from "./components/song-card";

export const SpotifyClientPage = () => {
   const [data] = api.spotify.data.useSuspenseQuery();
   return (
      <>
         <div>
            <h1 className="gradient-text pb-2 text-center text-5xl font-bold sm:text-6xl">
               Music
            </h1>
            <p>finally using my personal email, bye gamsgo</p>
            {data.rate && (
               <p className="gradient-text text-sm font-medium">
                  {data.just ? (
                     <>Last Updated: Just Now</>
                  ) : (
                     <>
                        Last Updated:{" "}
                        {formatDistance(data.rateDate!, new Date(), {
                           addSuffix: true,
                        })}
                        {data.crashed ? ` (crashed)` : ""}
                     </>
                  )}
               </p>
            )}
         </div>
         <div className="grid w-full grid-cols-1 justify-evenly gap-4 sm:grid-cols-2">
            <Section title="Top Artists">
               <div className="grid grid-cols-3 gap-4">
                  {data.artists.items.map((s, index) => (
                     <ArtistCard artist={s} key={index} />
                  ))}
               </div>
            </Section>
            <Section title="Currently Playing">
               <CurrentlyPlaying />
            </Section>
            <Section title="Top Played Songs">
               <div className="space-y-6">
                  {data.songs.items.map((s, index) => (
                     <SongCard
                        key={index}
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
                  {data.recentlyPlayed.items.map((s, index) => (
                     <SongCard
                        key={index}
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
                           date: s.played_at,
                        }}
                     />
                  ))}
               </div>
            </Section>
         </div>
      </>
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
