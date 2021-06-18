import { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from "@ui/Tooltip";

export default function About() {
    const [statistics, setStatistics] = useState(false);
    useEffect(async () => {
        const request = await axios.get(
            "https://davidilie.com/api/agenda/job/statistics"
        );
        if (request.status === 200) setStatistics(request.data);
    }, []);
    return (
        <div className="mb-32">
            <div className="bg-blue-600 text-white text-center px-10 pt-32 pb-32">
                <h1 className="text-4xl font-semibold mb-5">
                    First of all, Who am i?
                </h1>
                <h1 className="text-section 2xl:px-96 xl:px-32 lg:px-24 md:px-24 sm:px-5 mb-32">
                    I'm a 14 year old software developer, focusing my learning
                    into web development. I've been interested into computer
                    science ever since I was younger but never got into proper
                    development until about 2 years ago. I don't know what
                    brought me into it, it could have been my father's career or
                    my discovery of the huge world the internet has to offer.
                    For a while i've found myself looking into how a website
                    functions, but I never tried doing it myself until recently.
                    The goal of this website is to express my{" "}
                    <span className="font-bold">"experiements"</span> to the
                    public, while getting feedback in the process.
                </h1>
            </div>
            <div className="p-10 pt-16 -mt-48 max-w-md mx-auto bg-white rounded-2xl shadow-xl md:max-w-6xl flex md:flex-nowrap flex-wrap">
                <div className="xl:w-1/3 xs:w-full">
                    <img
                        src="/images/svg/frontend.svg"
                        className="h-24 w-24 mx-auto 2xl:animate-bounce xl:animate-bounce md:animate-bounce lg:animate-bounce animate-pulse mb-4"
                    />
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold mb-5">
                            Frontend Developer
                        </h1>
                        <p className="text-section">
                            I like bringing my ideas to{" "}
                            <span className="text-blue-700 font-bold">
                                reality
                            </span>
                            , by producing simple but powerful{" "}
                            <span className="text-blue-700 font-bold">
                                code
                            </span>
                            .
                        </p>
                    </div>
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Frameworks I use:
                        </h1>
                        <p className="text-section">
                            HTML, Next.js, Tailwind CSS
                        </p>
                    </div>
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Tools I use:
                        </h1>
                        <p className="text-section">Visual Studio Code</p>
                        <p className="text-section">Figma</p>
                        <p className="text-section">Adobe Illustrator</p>
                        <p className="text-section">Pen & Paper</p>
                    </div>
                </div>
                <div className="xl:w-1/3 xs:w-full">
                    <img
                        src="/images/svg/backend.svg"
                        className="h-24 w-24 mx-auto 2xl:animate-bounce xl:animate-bounce md:animate-bounce lg:animate-bounce animate-pulse mb-4"
                    />
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold mb-5">
                            Backend Developer
                        </h1>
                        <p className="text-section px-16">
                            I value{" "}
                            <span className="text-blue-700 font-bold">
                                fast
                            </span>{" "}
                            API calls and{" "}
                            <span className="text-blue-700 font-bold">
                                efficent
                            </span>{" "}
                            code.
                        </p>
                    </div>
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Stack I use:
                        </h1>
                        <p className="text-section">MongoDB, Express, NodeJS</p>
                    </div>
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Tools I use:
                        </h1>
                        <p className="text-section">Visual Studio Code</p>
                        <p className="text-section">MongoDB Compass</p>
                        <p className="text-section">Postman</p>
                        <p className="text-section">Github</p>
                        <p className="text-section">Linux</p>
                        <p className="text-section">Terminal</p>
                    </div>
                </div>
                <div className="xl:w-1/3 xs:w-full">
                    <img
                        src="/images/svg/contentcreator.svg"
                        className="h-24 w-24 mx-auto 2xl:animate-bounce xl:animate-bounce md:animate-bounce lg:animate-bounce animate-pulse mb-4"
                    />
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold mb-5">
                            Content Creator
                        </h1>
                        <p className="text-section px-16">
                            {statistics !== false ? (
                                <span>
                                    <span className="text-blue-700 font-bold">
                                        {statistics.subscribers}
                                    </span>{" "}
                                    Subscribers,{" "}
                                    <span className="text-blue-700 font-bold">
                                        {statistics.views}
                                    </span>{" "}
                                    Views, and{" "}
                                    <span className="text-blue-700 font-bold">
                                        {statistics.videos}
                                    </span>{" "}
                                    Videos
                                </span>
                            ) : (
                                <span>Loading...</span>
                            )}
                        </p>
                    </div>
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Software I use:
                        </h1>
                        <p className="text-section">
                            Adobe Premiere & Photoshop, OBS Studio
                        </p>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-blue-700">
                            Content I produce:
                        </h1>
                        <p className="text-section hover:text-blue-700 duration-200">
                            <a href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA">
                                Albastru
                            </a>
                        </p>
                        <p className="text-section hover:text-blue-700 duration-200">
                            <a href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA">
                                David Ilie
                            </a>
                        </p>
                        <p className="text-section">Short Movies</p>
                        <p className="text-section">Comercials</p>
                        <Tooltip
                            content="School projects, Personal Projects, etc."
                            placement="bottom"
                        >
                            <p className="text-section text-gray-800 cursor-pointer">
                                And much more...
                            </p>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}
