import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { AiFillApple, AiFillChrome, AiFillWindows } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import ToolGrid from "@components/ToolGrid";

function Stats(): JSX.Element {
    const [current, setCurrent] = useState("windows");

    return (
        <>
            <NextSeo title="Tools" />
            <div className="flex flex-col items-center pt-28 w-full min-h-screen text-black dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Tools
                    </h1>
                    <p className="text-section mb-5 px-5 text-center">
                        Some tools I use/find useful.
                    </p>
                    <div className="block mt-5 mb-10 align-center">
                        <div className="flex flex-wrap gap-6 justify-center">
                            <button
                                className={`flex items-center gap-1 rounded-2xl duration-200 p-2 ${
                                    current === "windows" &&
                                    "bg-blue-500 text-gray-100 dark:text-white dark:bg-blue-900 "
                                }`}
                                onClick={() => setCurrent("windows")}
                            >
                                <AiFillWindows className="text-section" />
                                <p className="text-section font-semibold">
                                    Windows
                                </p>
                            </button>
                            <button
                                className={`flex items-center gap-1 rounded-2xl duration-200 p-2 ${
                                    current === "linux" &&
                                    "bg-blue-500 text-gray-100 dark:text-white dark:bg-blue-900 "
                                }`}
                                onClick={() => setCurrent("linux")}
                            >
                                <FaLinux className="text-section" />
                                <p className="text-section font-semibold">
                                    Linux
                                </p>
                            </button>
                            <button
                                className={`flex items-center gap-1 rounded-2xl duration-200 p-2 ${
                                    current === "mac" &&
                                    "bg-blue-500 text-gray-100 dark:text-white dark:bg-blue-900 "
                                }`}
                                onClick={() => setCurrent("mac")}
                            >
                                <AiFillApple className="text-section" />
                                <p className="text-section font-semibold">
                                    Mac
                                </p>
                            </button>
                            <button
                                className={`flex items-center gap-1 rounded-2xl duration-200 p-2 ${
                                    current === "android" &&
                                    "bg-blue-500 text-gray-100 dark:text-white dark:bg-blue-900 "
                                }`}
                                onClick={() => setCurrent("android")}
                            >
                                <BsPhone className="text-section" />
                                <p className="text-section font-semibold">
                                    Android
                                </p>
                            </button>
                            <button
                                className={`flex items-center gap-1 rounded-2xl duration-200 p-2 ${
                                    current === "chrome" &&
                                    "bg-blue-500 text-gray-100 dark:text-white dark:bg-blue-900 "
                                }`}
                                onClick={() => setCurrent("chrome")}
                            >
                                <AiFillChrome className="text-section" />
                                <p className="text-section font-semibold">
                                    Chrome
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className="mb-10">
                        <ToolGrid
                            filter="windows"
                            hidden={current !== "windows"}
                        />
                        <ToolGrid filter="linux" hidden={current !== "linux"} />
                        <ToolGrid filter="mac" hidden={current !== "mac"} />
                        <ToolGrid
                            filter="android"
                            hidden={current !== "android"}
                        />
                        <ToolGrid
                            filter="chrome"
                            hidden={current !== "chrome"}
                        />
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default Stats;
