import { Fade } from "react-awesome-reveal";
import { GetServerSideProps } from "next";

import { pinnedRepos } from "@data/pinnedRepos";
import PinnedProject from "@components/PinnedProject";

import LinkButton from "@components/LinkButton";
import { FaGithub } from "react-icons/fa";

import RepoCard from "@components/RepoCard";

import { repoType } from "@interfaces/repoType";

import { PinnedRepoType } from "@data/pinnedRepos";

import { NextSeo } from "next-seo";

function Projects({ repos }) {
    return (
        <>
            <NextSeo title="Projects" />
            <div className="px-3 pt-32 pb-12 text-center text-black dark:text-white">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="text-4xl font-bold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                        My projects
                    </h1>
                </Fade>
                <Fade direction="up" triggerOnce cascade delay={250}>
                    <p className="mt-2 mb-5 text-section">
                        A quick collection of my projects.
                    </p>
                </Fade>
                <div className="flex flex-wrap items-center justify-center">
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
                                    (a: PinnedRepoType, b: PinnedRepoType) =>
                                        new Date(
                                            repos.filter(
                                                (x: repoType) => x.name === a.id
                                            )[0]?.date.last_push
                                        ).getTime() -
                                        new Date(
                                            repos.filter(
                                                (y: repoType) => y.name === b.id
                                            )[0]?.date.last_push
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

                <h1 className="text-4xl font-bold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                    Repositories
                </h1>
                <p className="mt-2 mb-4 text-section">
                    A list of all my public repositories on GitHub.
                </p>
                <LinkButton
                    link="/api/redir/github"
                    Icon={FaGithub}
                    text="View my profile"
                    className="mb-5"
                />

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-2 2xl:grid-cols-3 responsiveGrid xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
                        {repos
                            .sort(
                                (a: repoType, b: repoType) =>
                                    new Date(a.date.last_push).getTime() -
                                    new Date(b.date.last_push).getTime()
                            )
                            .reverse()
                            .map((repo: repoType, index: number) => (
                                <RepoCard key={index} repo={repo} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(`https://davidilie.com/api/agenda/job/github`);

    const repos = await response.json();
    return { props: { repos, revalidate: 600 } };
};

export default Projects;
