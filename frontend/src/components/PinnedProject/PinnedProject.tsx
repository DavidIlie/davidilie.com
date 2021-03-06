import { useEffect, useState } from "react";
import { formatDistance, format } from "date-fns";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import LinkButton from "@components/LinkButton";
import { PinnedRepoType } from "@data/pinnedRepos";
import { repoType } from "@interfaces/repoType";
import { shimmer } from "@lib/shimmer";

interface PinnedProjectProps {
    repo: repoType;
    left: boolean;
    projectData: PinnedRepoType;
}

export const PinnedProject = ({
    repo,
    left,
    projectData,
}: PinnedProjectProps): JSX.Element => {
    const [pageWidth, setPageWidth] = useState<number>(0);

    useEffect(() => {
        setPageWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth);
        });
    }, [pageWidth]);

    return pageWidth >= 900 ? (
        <div className="max-w-5xl mx-auto overflow-hidden duration-200 bg-gray-100 border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-xl mb-7 hoverItem">
            <div className="flex">
                {!left && <ProjectImage link={projectData.image} />}
                <div className="p-8">
                    <h1 className="text-2xl font-semibold">
                        {projectData.name}
                        <span className="ml-2 text-gray-500 text-section">
                            {format(new Date(repo.date.created_at), `dd/MM/yy`)}
                        </span>
                    </h1>
                    <h1 className="flex justify-center mb-2 text-black dark:text-gray-400">
                        Last updated{" "}
                        {formatDistance(
                            new Date(repo.date.last_push),
                            Date.now(),
                            {
                                addSuffix: true,
                            }
                        )}{" "}
                        •
                        {repo.language ? (
                            <span className="inline-flex items-center justify-center px-2 py-1 ml-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
                                {repo.language}
                            </span>
                        ) : null}
                    </h1>
                    <div className="px-3 py-3">
                        <div>
                            <h1 className="mb-5">{projectData.description}</h1>
                            <LinkButton
                                link={repo.url}
                                Icon={FaGithub}
                                text="View on GitHub"
                            />
                        </div>
                    </div>
                </div>
                {left && <ProjectImage link={projectData.image} />}
            </div>
        </div>
    ) : (
        <div className="max-w-md py-2 mx-auto">
            <div className="h-full p-2 overflow-hidden bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-2xl font-semibold">
                    {projectData.name}
                    <span className="ml-2 text-gray-500 text-section">
                        {format(new Date(repo.date.created_at), `dd/MM/yy`)}
                    </span>
                </h1>
                <h1 className="flex justify-center mb-2 text-gray-400">
                    Last updated{" "}
                    {formatDistance(new Date(repo.date.last_push), Date.now(), {
                        addSuffix: true,
                    })}{" "}
                    •
                    {repo.language ? (
                        <span className="inline-flex items-center justify-center px-2 py-1 ml-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
                            {repo.language}
                        </span>
                    ) : null}
                </h1>
                <Image
                    className="object-cover object-center"
                    src={projectData.image}
                    width="720px"
                    height="400px"
                    blurDataURL={shimmer(1920, 1080)}
                    placeholder="blur"
                    alt={projectData.name}
                />
                <div className="px-3 py-3">
                    <div>
                        <h1 className="mb-5">{projectData.description}</h1>
                        <LinkButton
                            link={repo.url}
                            Icon={FaGithub}
                            text="View on GitHub"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectImage = ({ link }: { link: string }) => {
    return (
        <Image
            className="object-cover w-full md:h-full md:w-96"
            height="400px"
            width="1500px"
            blurDataURL={shimmer(1920, 1080)}
            placeholder="blur"
            src={link}
            alt="project image"
        />
    );
};
