import { FaSpotify } from "react-icons/fa";
import { useQuery } from "react-query";

import Socials from "@components/Socials";
import Tooltip from "@ui/Tooltip";

export const Footer = () => {
    const { error, data: currentlyPlaying } = useQuery(
        `currentlyPlaying`,
        () =>
            fetch(`https://davidilie.com/api/spotify/get-now-playing`).then(
                (res) => res.json()
            ),
        { refetchOnMount: true }
    );

    return (
        <footer className="bg-gray-900 text-white pt-5 pb-5 w-full">
            <div className="px-24 flex flex-wrap items-center 2xl:justify-between xl:justify-between md:justify-between lg:justify-between justify-center">
                <div className="flex justify-evenly items-center">
                    {currentlyPlaying?.songUrl ? (
                        <>
                            <div className="text-2xl text-green-500 mr-1">
                                {currentlyPlaying.isPlaying ? (
                                    <Tooltip content="Currently Playing">
                                        <span>
                                            <FaSpotify />
                                        </span>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Currently paused">
                                        <span>
                                            <FaSpotify />
                                        </span>
                                    </Tooltip>
                                )}
                            </div>
                            <span className="mx-0.5" />
                            <Tooltip content={currentlyPlaying.artist}>
                                <a href={currentlyPlaying.songUrl}>
                                    <h1>{currentlyPlaying.name}</h1>
                                </a>
                            </Tooltip>
                            <span className="mx-1"> - </span>
                            <a
                                href="https://open.spotify.com/user/uh4szel3uuoei5h6308u3suic"
                                className="text-green-800 font-bold"
                            >
                                Spotify
                            </a>
                        </>
                    ) : (
                        <p className="flex">
                            <FaSpotify className="text-2xl text-green-500 mr-1" />
                            {error
                                ? "- There was an error - "
                                : "- Not Playing Anything - "}
                            <a
                                href="https://open.spotify.com/user/uh4szel3uuoei5h6308u3suic"
                                className="ml-1 text-green-800 font-bold"
                            >
                                Spotify
                            </a>
                        </p>
                    )}
                </div>

                <h1 className="text-xl mb-1 mt-1">
                    Copyright © David Ilie Platform.
                </h1>
                <div>
                    <Socials font="1.5" invisible={false} />
                </div>
            </div>
        </footer>
    );
};