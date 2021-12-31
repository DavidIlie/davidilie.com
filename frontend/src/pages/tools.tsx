import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AiFillApple, AiFillChrome, AiFillWindows } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import ToolGrid from "@components/ToolGrid";

function Stats(): JSX.Element {
    const [tabIndex, setTabIndex] = useState<number>(0);

    return (
        <>
            <NextSeo title="Tools" />
            <div className="flex flex-col items-center w-full min-h-screen text-black pt-28 dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="text-4xl font-bold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                        Tools
                    </h1>
                    <p className="px-5 mb-5 text-center text-section">
                        Some tools I use/find useful.
                    </p>
                    <Tabs
                        forceRenderTabPanel={true}
                        selectedIndex={tabIndex}
                        onSelect={(index) => setTabIndex(index)}
                    >
                        <TabList className="flex flex-wrap justify-center gap-6 mx-3 mt-5 mb-10 align-center">
                            <Tab className="flex items-center gap-1 p-2 duration-200 cursor-default tool rounded-2xl">
                                <AiFillWindows className="text-section" />
                                <p className="font-semibold text-section">
                                    Windows
                                </p>
                            </Tab>
                            <Tab className="flex items-center gap-1 p-2 duration-200 cursor-default tool rounded-2xl">
                                <FaLinux className="text-section" />
                                <p className="font-semibold text-section">
                                    Linux
                                </p>
                            </Tab>
                            <Tab className="flex items-center gap-1 p-2 duration-200 cursor-default tool rounded-2xl">
                                <AiFillApple className="text-section" />
                                <p className="font-semibold text-section">
                                    Mac
                                </p>
                            </Tab>
                            <Tab className="flex items-center gap-1 p-2 duration-200 cursor-default tool rounded-2xl">
                                <BsPhone className="text-section" />
                                <p className="font-semibold text-section">
                                    Android
                                </p>
                            </Tab>
                            <Tab className="flex items-center gap-1 p-2 duration-200 cursor-default tool rounded-2xl">
                                <AiFillChrome className="text-section" />
                                <p className="font-semibold text-section">
                                    Chrome
                                </p>
                            </Tab>
                        </TabList>
                        <div className="mb-10">
                            <TabPanel>
                                <ToolGrid
                                    filter="windows"
                                    hidden={!(tabIndex === 0)}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ToolGrid
                                    filter="linux"
                                    hidden={!(tabIndex === 1)}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ToolGrid
                                    filter="mac"
                                    hidden={!(tabIndex === 2)}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ToolGrid
                                    filter="android"
                                    hidden={!(tabIndex === 3)}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ToolGrid
                                    filter="chrome"
                                    hidden={!(tabIndex === 4)}
                                />
                            </TabPanel>
                        </div>
                    </Tabs>
                </Fade>
            </div>
        </>
    );
}

export default Stats;
