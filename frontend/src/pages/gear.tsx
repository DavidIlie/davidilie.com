import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import Device from "@components/DeviceCard";

import { devices, infastructure, DeviceProps } from "@data/gear";

function Stats(): JSX.Element {
    return (
        <>
            <NextSeo title="Gear" />
            <div className="flex flex-col items-center w-full max-w-3xl min-h-screen mx-auto text-black pt-28 dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="text-4xl font-bold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                        My Gear/Setup
                    </h1>
                    <p className="px-5 mb-5 text-center text-section">
                        The expensive things...
                    </p>
                    <div className="flex flex-wrap gap-5">
                        {devices.map((device: DeviceProps, index: number) => {
                            return <Device device={device} key={index} />;
                        })}
                    </div>
                    <h1 className="mt-10 text-4xl font-bold text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                        My Hosting Infastructure
                    </h1>
                    <p className="px-5 mb-5 text-center text-section">
                        <a
                            href="https://davidapps.dev"
                            target="_blank"
                            rel="noreferrer"
                        >
                            David Ilie Apps Platform
                        </a>
                        , see{" "}
                        <a
                            className="text-blue-500 duration-200 cursor-pointer hover:text-blue-600"
                            href="https://status.davidapps.dev"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Status
                        </a>
                    </p>
                    <div className="flex flex-wrap gap-5 mb-5">
                        {infastructure.map(
                            (device: DeviceProps, index: number) => {
                                return <Device device={device} key={index} />;
                            }
                        )}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default Stats;
