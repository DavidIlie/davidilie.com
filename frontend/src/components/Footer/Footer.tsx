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
        <footer className="text-black dark:text-white pt-5 pb-5 w-full footerBackground">
            <div className="flex flex-wrap items-center 2xl:justify-around xl:justify-around md:justify-around lg:justify-around justify-center mx-12">
                <div className="flex justify-evenly items-center">
                    {currentlyPlaying?.songUrl ? (
                        <>
                            <div className="text-2xl text-green-600 dark:text-green-500 mr-1">
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
                                <a
                                    href={currentlyPlaying.songUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-semibold"
                                >
                                    <h1>{currentlyPlaying.name}</h1>
                                </a>
                            </Tooltip>
                            <span className="mx-1"> - </span>
                            <a
                                href="https://open.spotify.com/user/6ugu6jpzmviq5wvp06gb73gds?si=9d56dc1fe4a14559"
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-500 dark:text-green-700 font-bold"
                            >
                                Spotify
                            </a>
                        </>
                    ) : (
                        <p className="flex">
                            <a
                                href="https://open.spotify.com/user/6ugu6jpzmviq5wvp06gb73gds?si=9d56dc1fe4a14559"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaSpotify className="text-2xl text-green-500 mr-1" />
                            </a>
                            {error
                                ? "- There was an error"
                                : "- Not Playing Anything"}
                        </p>
                    )}
                </div>

                <h1 className="text-xl mb-1 mt-1">
                    Copyright ©{" "}
                    <a
                        href="https://davidapps.dev"
                        target="_blank"
                        rel="noreferrer"
                    >
                        David Ilie Platform
                    </a>
                    .
                </h1>
                <div>
                    <Socials font="1.5" invisible={false} />
                </div>
            </div>
        </footer>
    );
};
