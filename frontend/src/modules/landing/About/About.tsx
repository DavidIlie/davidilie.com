import { Fade } from "react-awesome-reveal";

import { FrontendDeveloper } from "./skills/Frontend";
import { BackendDeveloper } from "./skills/Backend";
import { ContentCreator } from "./skills/ContentCreator";

export const About = () => {
    return (
        <>
            <div className="bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-100 text-center px-10 pt-12 pb-32">
                <Fade direction="left" triggerOnce cascade>
                    <h1
                        className={`2xl:text-5xl xl:text-5xl md:text-5xl lg:text-4xl text-4xl font-semibold mb-5`}
                    >
                        First of all, Who am i?
                    </h1>
                    <h1
                        className={`text-section 2xl:px-96 xl:px-32 lg:px-24 md:px-24 sm:px-5 mb-32`}
                    >
                        I'm a 14 year old software developer, focusing my
                        learning into web development. I've been interested into
                        computer science ever since I was younger but never got
                        into proper development until about 2 years ago. I don't
                        know what brought me into it, it could have been my
                        father's career or my discovery of the huge world the
                        internet has to offer. For a while i've found myself
                        looking into how a website functions, but I never tried
                        doing it myself until recently. The goal of this website
                        is to express my{" "}
                        <span className="font-bold">"experiements"</span> to the
                        public, while getting feedback in the process.
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
