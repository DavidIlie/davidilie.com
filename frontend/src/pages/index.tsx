import { GetServerSideProps } from "next";

import { NextSeo } from "next-seo";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

import { repoType } from "@interfaces/repoType";

import Header from "@modules/landing/Header";
import About from "@modules/landing/About";
import PinnedProject from "@components/PinnedProject";
import ContactFormModule from "@modules/landing/ContactForm";

import { pinnedRepos } from "@data/pinnedRepos";

function Home({ repos }): JSX.Element {
    const repo = pinnedRepos
        .sort(
            (a, b) =>
                new Date(
                    repos.filter((x: any) => x.name === a.id)[0].date.last_push
                ).getTime() -
                new Date(
                    repos.filter((y: any) => y.name === b.id)[0].date.last_push
                ).getTime()
        )
        .reverse();

    return (
        <>
            <NextSeo title="Home" />
            <Header />
            <About />
            <div className="pt-12 pb-2 mt-12 text-left text-white bg-indigo-600 dark:bg-indigo-900 dark:text-gray-100 2xl:text-center xl:text-center md:text-center">
                <Fade direction="up" triggerOnce cascade>
                    <h1
                        className={`px-10 text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-4xl text-4xl font-semibold mb-5`}
                    >
                        Secondly, what am I doing here?
                    </h1>
                    <h1
                        className={`px-10 text-section 2xl:px-96 xl:px-32 lg:px-24 md:px-24 sm:px-5`}
                    >
                        I like to have most of my code (
                        <a
                            href="https://github.com/davidilie/davidilie.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-200 duration-200 cursor-pointer hover:text-blue-300 hover:underline"
                        >
                            including this website
                        </a>
                        ) open source on my{" "}
                        <a
                            href="https://github.com/davidilie"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-200 duration-200 cursor-pointer hover:text-blue-300 hover:underline"
                        >
                            GitHub
                        </a>{" "}
                        for others to see, rate, and give me their opinion. In
                        addition, keeping my code open source gives me the
                        benefit of having a good-looking GitHub profile, which
                        is <strong>key</strong> for the future of my career.
                        Furthermore, I also like to write posts over on my{" "}
                        <Link href="/blog">
                            <a
                                target="_blank"
                                className="text-blue-200 duration-200 cursor-pointer hover:text-blue-300 hover:underline"
                            >
                                blog
                            </a>
                        </Link>{" "}
                        regarding things that I encounter these days while
                        working on projects. Below, you can see an example of a
                        project:
                    </h1>
                    <div className="mx-auto mt-5 text-center text-black dark:text-white">
                        <PinnedProject
                            repo={
                                repos.filter(
                                    (x: repoType) => x.name === repo[0].id
                                )[0]
                            }
                            left={false}
                            projectData={repo[0]}
                        />
                        <p className="px-3 text-white text-section">
                            Want to see more projects? Go to the{" "}
                            <Link href="/projects" passHref={true}>
                                <span className="font-semibold text-gray-200 cursor-pointer hover:underline">
                                    projects page
                                </span>
                            </Link>
                        </p>
                    </div>
                </Fade>
            </div>
            <div className="pt-8 pb-2 text-left text-black dark:text-gray-100 2xl:text-center xl:text-center md:text-center">
                <Fade direction="up" triggerOnce cascade>
                    <div
                        className={`px-10 text-center sm:text-5xl text-4xl font-semibold mb-5`}
                    >
                        <h1>Finally, how can you contact me?</h1>
                        <p className="-mt-1 text-xl font-normal">
                            Using this form below, you can send me a message.
                        </p>
                    </div>
                    <div className="text-left">
                        <ContactFormModule />
                    </div>
                </Fade>
            </div>
            <div className="py-6" />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(`https://davidilie.com/api/agenda/job/github`);

    const repos = await response.json();
    return { props: { repos, revalidate: 600 } };
};

export default Home;
