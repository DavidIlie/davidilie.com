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
            <div className="flex flex-col items-center pt-28 w-full min-h-screen text-black dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Tools
                    </h1>
                    <p className="text-section mb-5 px-5 text-center">
                        Some tools I use/find useful.
                    </p>
                    <Tabs
                        forceRenderTabPanel={true}
                        selectedIndex={tabIndex}
                        onSelect={(index) => setTabIndex(index)}
                    >
                        <TabList className="mt-5 mb-10 align-center flex flex-wrap gap-6 justify-center mx-3">
                            <Tab className="tool flex items-center gap-1 rounded-2xl duration-200 cursor-default p-2">
                                <AiFillWindows className="text-section" />
                                <p className="text-section font-semibold">
                                    Windows
                                </p>
                            </Tab>
                            <Tab className="tool flex items-center gap-1 rounded-2xl duration-200 cursor-default p-2">
                                <FaLinux className="text-section" />
                                <p className="text-section font-semibold">
                                    Linux
                                </p>
                            </Tab>
                            <Tab className="tool flex items-center gap-1 rounded-2xl duration-200 cursor-default p-2">
                                <AiFillApple className="text-section" />
                                <p className="text-section font-semibold">
                                    Mac
                                </p>
                            </Tab>
                            <Tab className="tool flex items-center gap-1 rounded-2xl duration-200 cursor-default p-2">
                                <BsPhone className="text-section" />
                                <p className="text-section font-semibold">
                                    Android
                                </p>
                            </Tab>
                            <Tab className="tool flex items-center gap-1 rounded-2xl duration-200 cursor-default p-2">
                                <AiFillChrome className="text-section" />
                                <p className="text-section font-semibold">
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
