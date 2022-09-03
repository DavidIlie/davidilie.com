/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import React from "react";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { trpc } from "@/lib/trpc";
import SongCard from "@/components/SongCard";

const Music: NextPage = () => {
   const spotifyData = trpc.useQuery(["spotify.getData"]);
   const spotifyPlaying = trpc.useQuery(["spotify.isPlaying"]);

   if (spotifyData.isError || spotifyPlaying.isError)
      return (
         <div className="flex items-center justify-center flex-grow sm:px-6 lg:px-8">
            <Fade direction="down">
               <div>
                  <h1 className="max-w-3xl pb-2 text-4xl font-medium text-center header-gradient lg:text-6xl">
                     There was an error fetching the data from Spotify.
                  </h1>
                  <p className="text-2xl text-center text-gray-500">
                     Come back later!
                  </p>
               </div>
            </Fade>
         </div>
      );

   return (
      <>
         <NextSeo title="Music" />
         <div className="flex justify-center flex-grow mt-32 mb-12 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-8xl">
               <Fade direction="up" triggerOnce cascade>
                  <h1 className="mb-4 text-5xl font-bold text-center sm:mb-0 sm:text-6xl header-gradient">
                     Here is the music I listen to.
                  </h1>
                  <h1 className="hidden mt-2 mb-4 text-lg text-center sm:block">
                     I'm a little{" "}
                     <span className="font-semibold header-gradient">
                        random
                     </span>{" "}
                     when it comes to{" "}
                     <span className="font-semibold header-gradient">
                        music
                     </span>
                     .
                  </h1>
               </Fade>
               <Fade delay={1100} triggerOnce cascade>
                  <div className="mb-5">
                     <h1 className="pb-2 mb-3 text-3xl font-medium text-center sm:text-5xl header-gradient">
                        Currently Listening
                     </h1>
                     <div className="max-w-screen-sm px-2 mx-auto sm:px-0">
                        {spotifyPlaying.data?.isPlaying ? (
                           <SongCard
                              song={spotifyPlaying.data}
                              titleCard
                              isPlaying={spotifyPlaying.data.isPlaying}
                           />
                        ) : (
                           <h1 className="text-center">Nothing playing</h1>
                        )}
                     </div>
                  </div>
               </Fade>
               <Fade delay={1200} triggerOnce cascade>
                  <div className="items-center justify-center gap-6 px-2 mt-10 sm:flex sm:px-0">
                     <div>
                        <h1 className="pb-2 mb-3 text-3xl font-medium text-center sm:text-5xl header-gradient">
                           Recently Played Songs
                        </h1>
                        <div className="flex justify-center">
                           <div className="grid gap-4 mx-auto">
                              {spotifyData.data?.recentlyPlayed.items.map(
                                 (song, index) => (
                                    <SongCard song={song.track} key={index} />
                                 )
                              )}
                           </div>
                        </div>
                     </div>
                     <div>
                        <h1 className="pb-2 mb-3 text-3xl font-medium text-center sm:text-5xl header-gradient">
                           Top Played Songs
                        </h1>
                        <div className="flex justify-center">
                           <div className="grid gap-4 mx-auto">
                              {spotifyData.data?.songs.items.map(
                                 (song, index) => (
                                    <SongCard song={song} key={index} />
                                 )
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </Fade>
            </div>
         </div>
      </>
   );
};

export default Music;
