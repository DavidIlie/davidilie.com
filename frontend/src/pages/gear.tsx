import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import Device from "@components/Device";

import { devices, infastructure } from "@data/gear";

function Stats(): JSX.Element {
    return (
        <>
            <NextSeo title="Gear" />
            <div className="flex flex-col items-center pt-28 w-full min-h-screen mx-auto max-w-3xl text-black dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        My Gear/Setup
                    </h1>
                    <p className="text-section mb-5 px-5 text-center">
                        The expensive things...
                    </p>
                    <div className="flex flex-wrap gap-5">
                        {devices.map((device, index) => {
                            return <Device device={device} key={index} />;
                        })}
                    </div>
                    <h1 className="mt-10 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient text-center">
                        My Hosting Infastructure
                    </h1>
                    <p className="text-section mb-5 px-5 text-center">
                        <a href="https://davidapps.dev" target="_blank">
                            David Ilie Apps Platform
                        </a>
                        , see{" "}
                        <a
                            className="text-blue-500 hover:text-blue-600 duration-200 cursor-pointer"
                            href="status.davidapps.dev"
                        >
                            Status
                        </a>
                    </p>
                    <div className="flex flex-wrap gap-5 mb-5">
                        {infastructure.map((device, index) => {
                            return <Device device={device} key={index} />;
                        })}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default Stats;
