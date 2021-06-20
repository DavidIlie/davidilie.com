import { useQuery } from "react-query";

import { Fade } from "react-awesome-reveal";

import PageProvider from "@providers/PageProvider";

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
        <PageProvider title="Music">
            <div className="text-white pt-32 pb-32">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="text-6xl text-center font-semibold">
                        Here's what I'm listening to at the moment
                    </h1>
                </Fade>
                <Fade delay={500} direction="up" triggerOnce cascade>
                    <h1 className="text-center text-section mb-12">
                        I'm a little "classic" when it comes to music
                    </h1>
                </Fade>
                <div className="flex justify-center space-x-20 mr-12 flex-wrap">
                    <Fade delay={500} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-5">
                                Currently Listening
                            </h1>
                            <CurrentPlaying song={currentlyPlaying} />
                        </div>
                    </Fade>

                    <Fade delay={1000} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-10">
                                Favorite Artists
                            </h1>
                            <TopArtists artists={data.artists} />
                        </div>
                    </Fade>
                </div>
                <div className="flex justify-center items-center space-x-10 mt-10 flex-wrap">
                    <Fade delay={1500} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-6">
                                Top Played Songs
                            </h1>
                            <TopSongs songs={data.songs.items} />
                        </div>
                    </Fade>

                    <Fade delay={2000} triggerOnce cascade>
                        <div>
                            <h1 className="text-4xl font-semibold text-center mb-5">
                                Recently Played
                            </h1>
                            <RecentSongs songs={data.recentlyPlayed.items} />
                        </div>
                    </Fade>
                </div>
            </div>
        </PageProvider>
    );
}

export async function getStaticProps() {
    const response = await fetch("http://localhost:3000/api/spotify/get-data");
    let error = null;
    if (response.status !== 200) {
        error = `There was an error ${response.status}`;
    }
    const data = await response.json();
    return { props: { data, error, revalidate: 60 } };
}

export default Music;
