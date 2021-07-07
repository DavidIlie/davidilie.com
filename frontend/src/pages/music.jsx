import { useQuery } from "react-query";

import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import TopArtists from "@modules/music/TopArtists";
import CurrentPlaying from "@modules/music/CurrentlyPlaying";
import TopSongs from "@modules/music/TopSongs";
import RecentSongs from "@modules/music/RecentSongs";

function Music({ data, error }) {
    const { error: currentError, data: currentlyPlaying } = useQuery(
        `currentlyPlaying`,
        () => fetch(`/api/spotify/get-now-playing`).then((res) => res.json()),
        { refetchOnMount: true }
    );
    if (error || currentError) {
        return (
            <Fade direction="down">
                <div className="flex flex-col justify-center items-center h-screen w-full">
                    <h1 className="header-gradient font-semibold 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl text-4xl text-center max-w-5xl">
                        There was an error fetching the data from Spotify.
                    </h1>
                    <p className="text-gray-500 text-2xl">Come back later!</p>
                </div>
            </Fade>
        );
    }

    return (
        <>
            <NextSeo title="Music" />
            <div className="text-white pt-32 pb-32">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-6xl xl:text-6xl md:text-5xl lg:text-4xl sm:text-4xl text-4xl text-center font-bold header-gradient">
                        Here is the music I listen.
                    </h1>
                </Fade>
                <Fade delay={500} direction="up" triggerOnce cascade>
                    <h1 className="text-center text-section mb-16">
                        I'm a little{" "}
                        <span className="font-semibold text-green-600">
                            classic
                        </span>{" "}
                        when it comes to{" "}
                        <span className="font-semibold text-green-600">
                            music
                        </span>
                        .
                    </h1>
                </Fade>
                <div
                    className={`flex justify-center 2xl:space-x-28 xl:space-x-28 md:space-x-28 lg:space-x-28 flex-wrap mb-16 ${
                        currentlyPlaying?.isPlaying !== false
                            ? "ml-12"
                            : "mr-12"
                    }`}
                >
                    <Fade delay={600} triggerOnce cascade>
                        <div className="2xl:mb-0 xl:mb-0 md:mb-0 lg:mb-0 mb-12">
                            <h1 className="text-4xl font-semibold text-center mb-10">
                                Top Artists
                            </h1>
                            <TopArtists artists={data.artists} />
                        </div>
                    </Fade>
                    <Fade delay={1100} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-5">
                                Currently Listening
                            </h1>
                            <CurrentPlaying song={currentlyPlaying} />
                        </div>
                    </Fade>
                </div>
                <div className="flex justify-center items-center mt-10 ml-10 2xl:space-x-6 xl:space-x-6 md:space-x-6 lg:space-x-6 flex-wrap">
                    <Fade delay={1200} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-3">
                                Top Played Songs
                            </h1>
                            <TopSongs songs={data.songs.items} />
                        </div>
                    </Fade>

                    <Fade delay={1700} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-3">
                                Recently Played
                            </h1>
                            <RecentSongs songs={data.recentlyPlayed.items} />
                        </div>
                    </Fade>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`https://davidilie.com/api/spotify/get-data`);
    let error = null;
    if (response.status !== 200) {
        error = `There was an error ${response.status}`;
    }
    const data = await response.json();
    return { props: { data, error, revalidate: 60 } };
}

export default Music;
