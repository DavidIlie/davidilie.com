import { NextSeo } from "next-seo";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

import Header from "@modules/landing/Header";
import About from "@modules/landing/About";
import PinnedProject from "@components/PinnedProject";

import { pinnedRepos } from "@data/pinnedRepos";

function Home({ repos }) {
    const repo = pinnedRepos
        .sort(
            (a, b) =>
                new Date(
                    repos.filter((x) => x.name === a.id)[0].created_at
                ).getTime() -
                new Date(
                    repos.filter((y) => y.name === b.id)[0].created_at
                ).getTime()
        )
        .reverse();
    return (
        <>
            <NextSeo title="Home" />
            <Header />
            <About />
            <div className="mx-auto text-center text-white mt-5">
                <Fade direction="up" triggerOnce cascade duration={500}>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Latest Project
                    </h1>
                    <p className="text-section mb-5">
                        The latest project that I have been working on:
                    </p>
                    <div className="mx-auto">
                        <PinnedProject
                            repo={repos.filter((x) => x.name === repo[0].id)[0]}
                            left={false}
                            projectData={repo[0]}
                        />
                    </div>
                    <p className="text-section -mt-3">
                        Want to see more projects? Go to the{" "}
                        <Link href="/projects">
                            <spanc className="text-blue-500 font-semibold cursor-pointer hover:underline">
                                projects page
                            </spanc>
                        </Link>
                    </p>
                </Fade>
            </div>
            <div className="h-96"></div>
        </>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/github`);

    const { stars, repos, followers } = await response.json();
    return { props: { stars, repos, followers, revalidate: 600 } };
}

export default Home;
