import { AiOutlinePause, AiOutlinePlayCircle } from "react-icons/ai";
import { useQuery } from "react-query";

import Socials from "@components/Socials";
import Tooltip from "@ui/Tooltip";

export const Footer = () => {
    const { error, data: currentlyPlaying } = useQuery(
        `currentlyPlaying`,
        () => fetch(`/api/spotify/get-now-playing`).then((res) => res.json()),
        { refetchOnMount: true }
    );

    return (
        <footer className="bg-gray-900 text-white pt-5 pb-5 w-full">
            <div className="animate-fade-in-down flex justify-center items-center justify-between">
                <div className="w-1/3 flex justify-center items-center">
                    {currentlyPlaying?.songUrl ? (
                        <>
                            <div className="text-2xl text-green-500 mr-1">
                                {currentlyPlaying.isPlaying ? (
                                    <Tooltip content="Currently Playing">
                                        <span>
                                            <AiOutlinePlayCircle />
                                        </span>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Currently paused">
                                        <span>
                                            <AiOutlinePause />
                                        </span>
                                    </Tooltip>
                                )}
                            </div>
                            <Tooltip content={currentlyPlaying.artist}>
                                <a href={currentlyPlaying.songUrl}>
                                    <h1 className="mr-1">
                                        {currentlyPlaying.name} -
                                    </h1>
                                </a>
                            </Tooltip>

                            <Tooltip content="Playing on spotify">
                                <a
                                    href="https://open.spotify.com/user/uh4szel3uuoei5h6308u3suic"
                                    className="text-green-800 font-bold"
                                >
                                    Spotify
                                </a>
                            </Tooltip>
                        </>
                    ) : (
                        <p className="flex">
                            <AiOutlinePause className="text-2xl text-green-500 mr-1" />
                            {error
                                ? "There was an error - "
                                : "Not Playing Anything - "}
                            <a
                                href="https://open.spotify.com/user/uh4szel3uuoei5h6308u3suic"
                                className="ml-1 text-green-800 font-bold"
                            >
                                Spotify
                            </a>
                        </p>
                    )}
                </div>

                <h1 className="w-1/3 text-center text-xl">
                    Copyright © David Ilie Platform.
                </h1>
                <div className="w-1/3">
                    <Socials font={2} />
                </div>
            </div>
        </footer>
    );
};
