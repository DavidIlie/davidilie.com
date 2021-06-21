import { useQuery } from "react-query";

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
        return <div>There was an error fetching data from spotify</div>;
    }

    return (
        <>
            <div className="text-white pt-32 pb-32">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-6xl xl:text-6xl md:text-5xl lg:text-4xl sm:text-4xl text-4xl text-center font-semibold">
                        Here's what I'm listening to at the moment
                    </h1>
                </Fade>
                <Fade delay={500} direction="up" triggerOnce cascade>
                    <h1 className="text-center text-section mb-16">
                        I'm a little "classic" when it comes to music
                    </h1>
                </Fade>
                <div
                    className={`flex justify-center 2xl:space-x-28 xl:space-x-28 md:space-x-28 lg:space-x-28 flex-wrap mb-16 ${
                        currentlyPlaying?.isPlaying !== false
                            ? "ml-12"
                            : "mr-12"
                    }`}
                >
                    <Fade delay={500} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-10">
                                Favorite Artists
                            </h1>
                            <TopArtists artists={data.artists} />
                        </div>
                    </Fade>
                    <Fade delay={1500} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-5">
                                Currently Listening
                            </h1>
                            <CurrentPlaying song={currentlyPlaying} />
                        </div>
                    </Fade>
                </div>
                <div className="flex justify-center items-center mt-10 ml-10 flex-wrap">
                    <Fade delay={1700} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-3">
                                Top Played Songs
                            </h1>
                            <TopSongs songs={data.songs.items} />
                        </div>
                    </Fade>

                    <Fade delay={2100} triggerOnce cascade>
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
    const response = await fetch(
        `${
            process.env.NEXT_PUBLIC_HOST ||
            `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        }/api/spotify/get-data`
    );
    let error = null;
    if (response.status !== 200) {
        error = `There was an error ${response.status}`;
    }
    const data = await response.json();
    return { props: { data, error, revalidate: 60 } };
}

export default Music;
