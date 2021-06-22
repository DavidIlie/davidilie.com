import { Fade } from "react-awesome-reveal";

import { pinnedRepos } from "../../data/pinnedRepos";
import PinnedProject from "@components/PinnedProject";

import LinkButton from "@components/LinkButton";
import { FaGithub } from "react-icons/fa";

import RepoCard from "@components/RepoCard";

import { NextSeo } from "next-seo";

function Projects({ repos }) {
    return (
        <>
            <NextSeo title="Projects" />
            <div className="text-white text-center pt-32 pb-12 px-3">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        My projects
                    </h1>
                </Fade>
                <Fade direction="up" triggerOnce cascade>
                    <p className="text-section mt-2 mb-5">
                        A quick collection of my projects.
                    </p>
                </Fade>
                <div className="flex justify-center items-center flex-wrap">
                    <div>
                        <Fade
                            delay={500}
                            duration={750}
                            direction="up"
                            triggerOnce
                            cascade
                        >
                            {pinnedRepos
                                .sort(
                                    (a, b) =>
                                        new Date(
                                            repos.filter(
                                                (x) => x.name === a.id
                                            )[0].created_at
                                        ).getTime() -
                                        new Date(
                                            repos.filter(
                                                (y) => y.name === b.id
                                            )[0].created_at
                                        ).getTime()
                                )
                                .reverse()
                                .map((data, index) => (
                                    <PinnedProject
                                        key={index}
                                        repo={
                                            repos.filter(
                                                (x) => x.name === data.id
                                            )[0]
                                        }
                                        left={index % 2 === 0}
                                        projectData={data}
                                    />
                                ))}
                        </Fade>
                    </div>
                </div>

                <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                    Repositories
                </h1>
                <p className="text-section mt-2 mb-4">
                    A list of all my public repositories on GitHub.
                </p>
                <LinkButton
                    link={`${process.env.NEXT_PUBLIC_HOST}/api/redir/github`}
                    Icon={FaGithub}
                    text="View my profile"
                    className="mb-10"
                />

                <div className="flex flex-wrap justify-center gap-2 2xl:mx-10 xl:mx-10 md:mx-10 lg:mx-10 mx-0">
                    {repos
                        .sort(
                            (a, b) =>
                                new Date(a.pushed_at).getTime() -
                                new Date(b.pushed_at).getTime()
                        )
                        .reverse()
                        .map((repo, index) => (
                            <RepoCard
                                key={index.toString()}
                                repo={repo}
                                i={index}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/github`);

    const { stars, repos, followers } = await response.json();
    return { props: { stars, repos, followers, revalidate: 600 } };
}

export default Projects;
