"use client";

import { useMemo } from "react";
import { formatDistance } from "date-fns";
import { Clock, Headphones, Monitor, TrendingUp, Users } from "lucide-react";

import { SPOTIFY_ACCOUNT } from "~/components/footer";
import { api } from "~/trpc/react";
import ArtistCard from "./components/artist-card";
import CurrentlyPlaying from "./components/currently-playing";
import SongCard from "./components/song-card";

export const SpotifyClientPage = () => {
   const [data] = api.spotify.data.useSuspenseQuery();

   const topGenres = useMemo(() => {
      const genreCount: Record<string, number> = {};
      for (const artist of data.artists.items) {
         for (const genre of artist.genres) {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
         }
      }
      return Object.entries(genreCount)
         .sort((a, b) => b[1] - a[1])
         .slice(0, 8)
         .map(([genre]) => genre);
   }, [data.artists.items]);

   return (
      <div className="space-y-10 sm:space-y-14">
         {/* Hero */}
         <div className="animate-fade-in-up space-y-4 pt-2">
            <div className="flex items-center justify-center gap-2">
               <a
                  href={SPOTIFY_ACCOUNT}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 transition-colors hover:bg-green-500/20 sm:text-sm dark:text-green-400"
               >
                  <svg
                     className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                  >
                     <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Spotify
               </a>
            </div>
            <h1 className="pb-1 text-center text-4xl font-bold text-brand sm:text-5xl md:text-6xl">
               Music
            </h1>
            <p className="mx-auto max-w-md text-center text-sm text-muted-foreground sm:text-base">
               A look at what I&apos;ve been listening to lately
            </p>
            {data.rate && (
               <p className="text-center text-[11px] text-muted-foreground/60">
                  {data.just ? (
                     <>Updated just now</>
                  ) : (
                     <>
                        Updated{" "}
                        {formatDistance(data.rateDate!, new Date(), {
                           addSuffix: true,
                        })}
                        {data.crashed ? " · cached" : ""}
                     </>
                  )}
               </p>
            )}
         </div>

         {/* Currently Playing — full width */}
         <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <SectionHeader
               icon={<Headphones className="h-4 w-4" />}
               title="Currently Playing"
            />
            <CurrentlyPlaying />
         </div>

         {/* Top Genres */}
         {topGenres.length > 0 && (
            <div
               className="animate-fade-in-up"
               style={{ animationDelay: "0.15s" }}
            >
               <SectionHeader
                  icon={<TrendingUp className="h-4 w-4" />}
                  title="Top Genres"
               />
               <div className="flex flex-wrap gap-2">
                  {topGenres.map((genre) => (
                     <span
                        key={genre}
                        className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground capitalize transition-colors hover:border-brand/30 hover:bg-brand-muted sm:text-sm"
                     >
                        {genre}
                     </span>
                  ))}
               </div>
            </div>
         )}

         {/* Top Artists */}
         <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <SectionHeader
               icon={<Users className="h-4 w-4" />}
               title="Top Artists"
            />
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
               {data.artists.items.map((s, index) => (
                  <ArtistCard artist={s} rank={index + 1} key={index} />
               ))}
            </div>
         </div>

         {/* Songs grid */}
         <div
            className="animate-fade-in-up grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8"
            style={{ animationDelay: "0.3s" }}
         >
            <div>
               <SectionHeader
                  icon={<TrendingUp className="h-4 w-4" />}
                  title="Top Songs"
               />
               <div className="space-y-2.5">
                  {data.songs.items.map((s, index) => (
                     <SongCard
                        key={index}
                        rank={index + 1}
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
            </div>
            <div>
               <SectionHeader
                  icon={<Clock className="h-4 w-4" />}
                  title="Recently Played"
               />
               <div className="space-y-2.5">
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
            </div>
         </div>

         {/* Plexo teaser */}
         <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a
               href="https://plexo.davidhome.ro"
               target="_blank"
               rel="noreferrer"
               className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 p-5 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 sm:p-6"
            >
               <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500 transition-colors group-hover:bg-orange-500/25 sm:h-12 sm:w-12">
                     <Monitor className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-foreground sm:text-base">
                        Wanna see what I watch?
                     </p>
                     <p className="text-xs text-muted-foreground sm:text-sm">
                        Check out my Plex dashboard on Plexo
                     </p>
                  </div>
               </div>
               <span className="text-sm text-orange-500 transition-transform group-hover:translate-x-1 sm:text-base">
                  &rarr;
               </span>
            </a>
         </div>
      </div>
   );
};

const SectionHeader = ({
   icon,
   title,
}: {
   icon: React.ReactNode;
   title: string;
}) => {
   return (
      <div className="mb-4 flex items-baseline gap-3">
         <span className="text-muted-foreground">{icon}</span>
         <h2 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            {title}
         </h2>
         <span aria-hidden className="dotted-leader" />
      </div>
   );
};
