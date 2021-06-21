import { Fade } from "react-awesome-reveal";

import WIP from "@components/WIP";

import { NextSeo } from "next-seo";

export default function Home() {
    return (
        <>
            <NextSeo title="Projects" />
            <WIP />
            {/* <div className="text-white pt-32 pb-32 w-full h-full mx-auto px-3">
                <div className="text-center">
                    <Fade direction="up" triggerOnce cascade>
                        <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                            My projects
                        </h1>
                    </Fade>
                    <Fade delay={500} direction="up" triggerOnce cascade>
                        <p className="text-section mt-2">
                            A quick collection of my projects.
                        </p>
                    </Fade>
                </div> 
                <div className="text-center">
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Repositories
                    </h1>
                    <p className="text-section mt-2">
                        A list of all my public repositories on GitHub.
                    </p>
                </div>
            </div> */}
        </>
    );
}
