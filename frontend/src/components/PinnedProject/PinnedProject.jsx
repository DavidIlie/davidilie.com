import { formatDistance, format } from "date-fns";

import { FaGithub } from "react-icons/fa";

import Image from "next/image";

import LinkButton from "@components/LinkButton";

export const PinnedProject = ({ repo, left, projectData }) => {
    return (
        <div className="p-4" style={{ width: "450px" }}>
            <div className="p-2 h-full bg-gray-800 rounded-lg overflow-hidden">
                <h1 className="text-2xl font-semibold">
                    {projectData.name}
                    <span className="ml-2 text-gray-500 text-section">
                        {format(new Date(repo.created_at), `dd/MM/yy`)}
                    </span>
                </h1>
                <h1 className="flex justify-center text-gray-400 mb-2">
                    Last updated{" "}
                    {formatDistance(new Date(repo.pushed_at), Date.now(), {
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
                    className="lh-48 h-36 w-full object-cover object-center"
                    src={projectData.image}
                    width="720px"
                    height="400px"
                    alt={projectData.name}
                />
                <div className="px-3 py-3">
                    <div>
                        <h1 className="mb-5">{projectData.description}</h1>
                        <LinkButton
                            link={repo.html_url}
                            Icon={FaGithub}
                            text="View on GitHub"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
