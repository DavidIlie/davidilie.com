import { Fade } from "react-awesome-reveal";

import { FrontendDeveloper } from "./skills/Frontend";
import { BackendDeveloper } from "./skills/Backend";
import { ContentCreator } from "./skills/ContentCreator";

export const About = () => {
    return (
        <>
            <div className="px-10 pt-12 pb-32 text-left text-white bg-blue-600 dark:bg-blue-800 dark:text-gray-100 2xl:text-center xl:text-center md:text-center">
                <Fade direction="left" triggerOnce cascade>
                    <h1
                        className={`text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-4xl text-4xl font-semibold mb-5`}
                    >
                        First of all, who am I?
                    </h1>
                    <h1
                        className={`text-section 2xl:px-96 xl:px-32 lg:px-24 md:px-24 sm:px-5 mb-32`}
                    >
                        I&apos;m a 15 year old software developer and full-time
                        student. I&apos;ve been interested into computer science
                        ever since I was younger but never got into proper
                        development until about 2 years ago, it's always kept me
                        going and motivated throughout the years which is why I
                        want to pursue it in the future. For a while i&apos;ve
                        found myself looking into how a website functions, but I
                        never tried doing it myself until recently. The goal of
                        this website is to express my{" "}
                        <span className="font-bold">
                            &quot;experiments&quot;
                        </span>{" "}
                        to the public, while getting feedback in the process.
                    </h1>
                </Fade>
            </div>
            <Fade direction="up" triggerOnce cascade>
                <div
                    className={`-mt-48 max-w-sm mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl shadow-xl md:max-w-6xl flex md:flex-nowrap justify-evenly flex-wrap`}
                >
                    <FrontendDeveloper />
                    <BackendDeveloper />
                    <ContentCreator />
                </div>
            </Fade>
        </>
    );
};
