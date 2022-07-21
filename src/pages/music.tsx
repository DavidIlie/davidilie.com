import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { trpc } from "@/lib/trpc";
import { shimmer } from "@/lib/shimmer";

const Music: NextPage = () => {
   const spotifyData = trpc.useQuery(["spotify.getData"]);
   const spotifyPlaying = trpc.useQuery(["spotify.isPlaying"]);

   if (spotifyData.isError || spotifyPlaying.isError)
      return (
         <div className="flex items-center justify-center flex-grow sm:px-6 lg:px-8">
            <Fade direction="down">
               <div>
                  <h1 className="max-w-3xl text-4xl font-medium text-center header-gradient lg:text-6xl pb-2">
                     There was an error fetching the data from Spotify.
                  </h1>
                  <p className="text-2xl text-gray-500 text-center">
                     Come back later!
                  </p>
               </div>
            </Fade>
         </div>
      );

   return (
      <>
         <NextSeo title="Music" />
         <div className="flex justify-center flex-grow sm:px-6 lg:px-8 mt-32">
            <div className="container max-w-5xl mx-auto">
               <Fade direction="up" triggerOnce cascade>
                  <h1 className="text-3xl font-bold text-center sm:text-6xl header-gradient">
                     Here is the music I listen to.
                  </h1>
                  <h1 className="mb-4 text-center sm:text-lg mt-2">
                     I&apos;m a little{" "}
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
                     <h1 className="text-4xl font-semibold text-center header-gradient pb-2">
                        Currently Listening
                     </h1>
                     <div className="max-w-screen-sm sm:px-0 px-2 mx-auto">
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
                  <div className="sm:flex items-center justify-evenly">
                     <div>
                        <h1 className="mb-3 sm:text-5xl text-3xl font-medium text-center header-gradient">
                           Recently Played Songs
                        </h1>
                        <div className="flex justify-center">
                           <div className="grid grid-cols-1 gap-4 p-2 mx-auto xl:grid-cols-2 md:grid-cols-2">
                              {spotifyData.data?.recentlyPlayed.items.map(
                                 (song: any, index: number) => (
                                    // <SongCard
                                    //    song={song.track}
                                    //    key={index}
                                    //    titleCard={false}
                                    //    isPlaying={false}
                                    // />
                                    <></>
                                 )
                              )}
                           </div>
                        </div>
                     </div>
                     <div>
                        <h1 className="mb-3 sm:text-5xl text-3xl font-medium text-center header-gradient">
                           Top Played Songs
                        </h1>
                        <div className="flex justify-center">
                           <div className="grid grid-cols-1 gap-4 p-2 mx-auto xl:grid-cols-2 md:grid-cols-2">
                              {spotifyData.data?.songs.items.map(
                                 (song: any, index: number) => (
                                    // <SongCard
                                    //    song={song.track}
                                    //    key={index}
                                    //    titleCard={false}
                                    //    isPlaying={false}
                                    // />
                                    <></>
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

const SongCard: React.FC<{
   song: any;
   titleCard: boolean;
   isPlaying: boolean;
}> = ({ song, titleCard, isPlaying }) => (
   <a
      target="_blank"
      rel="noreferrer"
      href={song.songUrl}
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
                  song.albumImageUrl ||
                  song.album.images
                     .filter((image: any) => image.height > 109)
                     .slice(-1)[0].url
               }
            />
         </div>
         <div className="flex flex-col max-w-full ml-5">
            <p className="max-w-full text-2xl font-semibold line-clamp-2">
               {`${song?.title || song?.name}${
                  titleCard && !isPlaying ? ` - Paused` : ``
               }`}
            </p>
            <div className="flex flex-col w-full mt-2 text-gray-400">
               <h1 className="line-clamp-1">Album • {song.album}</h1>
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

export default Music;
