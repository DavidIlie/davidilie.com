import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import links, { LinkType } from "@data/links";

import LinkCard from "@components/LinkCard";

function Stats(): JSX.Element {
    return (
        <>
            <NextSeo title="Links" />
            <div className="flex flex-col items-center w-full min-h-screen text-black pt-28 dark:text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="text-4xl font-bold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                        Links
                    </h1>
                    <p className="px-5 mb-5 text-center text-section">
                        My favorite parts of the interweb.
                    </p>
                    <div className="grid grid-cols-1 gap-5 mb-10 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
                        {links
                            .sort(
                                (a: LinkType, b: LinkType) =>
                                    a.date.getTime() - b.date.getTime()
                            )
                            .reverse()
                            .map((link: LinkType, i: number) => (
                                <LinkCard key={i.toString()} {...link} />
                            ))}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default Stats;
