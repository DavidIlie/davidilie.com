import { useEffect, useState } from "react";
import { formatDistance, format } from "date-fns";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import LinkButton from "@components/LinkButton";
import { PinnedRepoType } from "@data/pinnedRepos";
import { repoType } from "@interfaces/repoType";

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
    const [pageWidth, setPageWidth] = useState(0);

    useEffect(() => {
        setPageWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth);
        });
    });

    return pageWidth >= 900 ? (
        <div className="mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden max-w-5xl mb-7 hoverItem duration-200">
            <div className="flex">
                {!left && <ProjectImage link={projectData.image} />}
                <div className="p-8">
                    <h1 className="text-2xl font-semibold">
                        {projectData.name}
                        <span className="ml-2 text-gray-500 text-section">
                            {format(new Date(repo.date.created_at), `dd/MM/yy`)}
                        </span>
                    </h1>
                    <h1 className="flex justify-center text-black dark:text-gray-400 mb-2">
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
                            <span className="ml-1 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
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
        <div className="mx-auto py-2 max-w-md">
            <div className="p-2 h-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <h1 className="text-2xl font-semibold">
                    {projectData.name}
                    <span className="ml-2 text-gray-500 text-section">
                        {format(new Date(repo.date.created_at), `dd/MM/yy`)}
                    </span>
                </h1>
                <h1 className="flex justify-center text-gray-400 mb-2">
                    Last updated{" "}
                    {formatDistance(new Date(repo.date.last_push), Date.now(), {
                        addSuffix: true,
                    })}{" "}
                    •
                    {repo.language ? (
                        <span className="ml-1 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
                            {repo.language}
                        </span>
                    ) : null}
                </h1>
                <Image
                    className="object-cover object-center"
                    src={projectData.image}
                    width="720px"
                    height="400px"
                    blurDataURL={
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                    }
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
            className="w-full object-cover md:h-full md:w-96"
            height="400px"
            width="1250px"
            blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
            }
            placeholder="blur"
            src={link}
            alt="project image"
        />
    );
};
