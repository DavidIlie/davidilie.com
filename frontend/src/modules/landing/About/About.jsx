import { useState, useEffect } from "react";

import { FrontendDeveloper } from "./skills/Frontend";
import { BackendDeveloper } from "./skills/Backend";
import { ContentCreator } from "./skills/ContentCreator";

export const About = () => {
    const [AboutView, setAboutView] = useState(false);
    const [skillsView, setSkillsView] = useState(false);

    useEffect(async () => {
        setAboutView(window.scrollY);
        setSkillsView(window.scrollY);

        window.addEventListener("scroll", () => {
            if (!AboutView) {
                if (window.scrollY >= 400) setAboutView(true);
            }
            if (!skillsView) {
                if (window.scrollY >= 800) setSkillsView(true);
            }
        });
    }, []);

    return (
        <div className="mb-32">
            <div className="bg-blue-600 text-white text-center px-10 pt-32 pb-32">
                <h1
                    className={`${
                        AboutView ? "visible animate-fade-in-down" : "invisible"
                    } text-4xl font-semibold mb-5`}
                >
                    First of all, Who am i?
                </h1>
                <h1
                    className={`${
                        AboutView ? "visible animate-fade-in-down" : "invisible"
                    } text-section 2xl:px-96 xl:px-32 lg:px-24 md:px-24 sm:px-5 mb-32`}
                >
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
            <div
                className={`${
                    skillsView ? "visible animate-fade-in-down" : "invisible"
                } -mt-48 max-w-sm mx-auto bg-white rounded-2xl shadow-xl md:max-w-6xl flex md:flex-nowrap justify-evenly flex-wrap`}
            >
                <FrontendDeveloper />
                <BackendDeveloper />
                <ContentCreator />
            </div>
        </div>
    );
};
