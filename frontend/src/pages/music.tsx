import { useQuery } from "react-query";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { FaSpotify } from "react-icons/fa";

import CurrrentlyPlaying from "@modules/music/CurrentlyPlaying";
import TopSongs from "@modules/music/TopSongs";
import RecentSongs from "@modules/music/RecentSongs";

import LinkButton from "@components/LinkButton";

import { MusicData } from "@interfaces/MusicData";

interface MusicProps {
    data: MusicData;
    error: any;
}

function Music({ data, error }: MusicProps) {
    const { error: currentError, data: currentlyPlaying } = useQuery(
        `currentlyPlaying`,
        () =>
            fetch(`https://davidilie.com/api/spotify/get-now-playing`).then(
                (res) => res.json()
            ),
        { refetchOnMount: true }
    );

    if (error || currentError) {
        return (
            <Fade direction="down">
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <h1 className="max-w-5xl text-4xl font-semibold text-center header-gradient 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl">
                        There was an error fetching the data from Spotify.
                    </h1>
                    <p className="text-2xl text-gray-500">Come back later!</p>
                </div>
            </Fade>
        );
    }

    return (
        <>
            <NextSeo title="Music" />
            <div className="pt-32 pb-12 text-black dark:text-white">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="text-4xl font-bold text-center 2xl:text-6xl xl:text-6xl md:text-5xl lg:text-4xl sm:text-4xl header-gradient">
                        Here is the music I listen to.
                    </h1>
                    <h1 className="mb-4 text-center text-section">
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
                    <div className="flex justify-center mb-6">
                        <LinkButton
                            link="https://open.spotify.com/user/e1lg6nepjzvt6rjhfey78hqan"
                            Icon={FaSpotify}
                            text="See my profile"
                        />
                    </div>
                </Fade>

                <Fade delay={1100} triggerOnce cascade>
                    <div className="mb-5">
                        <h1 className="text-4xl font-semibold text-center header-gradient">
                            Currently Listening
                        </h1>
                        <div className="max-w-screen-sm p-2 mx-auto">
                            <CurrrentlyPlaying song={currentlyPlaying} />
                        </div>
                    </div>
                </Fade>

                <Fade delay={1200} triggerOnce cascade>
                    <div className="mb-5">
                        <h1 className="mb-3 text-4xl font-semibold text-center header-gradient">
                            Recently Played Songs
                        </h1>
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 gap-4 p-2 mx-auto xl:grid-cols-2 md:grid-cols-2">
                                <RecentSongs
                                    songs={data.recentlyPlayed.items}
                                />
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade delay={1200} triggerOnce cascade>
                    <>
                        <h1 className="mb-3 text-4xl font-semibold text-center header-gradient">
                            Top Played Songs
                        </h1>
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 gap-4 p-2 mx-auto xl:grid-cols-2 md:grid-cols-2">
                                <TopSongs songs={data.songs.items} />
                            </div>
                        </div>
                    </>
                </Fade>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(`https://davidilie.com/api/spotify/get-data`);
    let error = null;
    if (response.status !== 200) {
        error = `There was an error ${response.status}`;
    }
    const data = await response.json();
    return { props: { data, error, revalidate: 60 } };
};

export default Music;
