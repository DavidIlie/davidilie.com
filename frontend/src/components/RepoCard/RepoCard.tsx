import { repoType } from "@interfaces/repoType";

interface RepoCardProps {
    repo: repoType;
}

export const RepoCard = ({ repo }: RepoCardProps): JSX.Element => {
    return (
        <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="h-full w-full truncate overflow-visible p-1 max-w-md"
        >
            <div className="justify-start items-start flex p-3 truncate bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-md duration-200 hoverItem cursor-pointer text-left pl-5 flex-col">
                <h1 className="mb-3 font-semibold text-xl truncate">
                    {repo.name}

                    {repo.language ? (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
                            {repo.language}
                        </span>
                    ) : null}
                </h1>
                <h1
                    className="text-gray-400 max-w-full truncate"
                    style={{ justifySelf: "center" }}
                >
                    {repo.description}
                </h1>
            </div>
        </a>
    );
};
