import { useQuery } from "react-query";
import Image from "next/image";

import Tooltip from "@ui/Tooltip";
import { shimmer } from "@lib/shimmer";

export const ContentCreator = () => {
    const { isLoading, data } = useQuery(
        `getYoutubeStatistics`,
        () =>
            fetch(`https://davidilie.com/api/agenda/job/statistics`).then(
                (res) => res.json()
            ),
        { refetchOnMount: true }
    );

    return (
        <div className="px-5 pt-10 xl:w-1/3 xs:w-full">
            <div className="flex justify-center mb-3">
                <Image
                    src="/images/svg/contentcreator.svg"
                    alt="Content Creator"
                    className="w-24 h-24 animate-bounce-up"
                    blurDataURL={shimmer(1920, 1080)}
                    placeholder="blur"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="mb-10 text-center">
                <h1 className="mb-5 text-2xl font-semibold">Content Creator</h1>
                <p className="px-16 text-section">
                    {!isLoading ? (
                        <span>
                            <span className="font-bold text-blue-700 dark:text-blue-500">
                                {data.subscribers}
                            </span>{" "}
                            Subscribers,{" "}
                            <span className="font-bold text-blue-700 dark:text-blue-500">
                                {data.views}
                            </span>{" "}
                            Views, and{" "}
                            <span className="font-bold text-blue-700 dark:text-blue-500">
                                {data.videos}
                            </span>{" "}
                            Videos
                        </span>
                    ) : (
                        <span>Loading...</span>
                    )}
                </p>
            </div>
            <div className="mb-10 text-center">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Software I use:
                </h1>
                <p className="text-section">Adobe Premiere & Photoshop</p>
            </div>
            <div className="mb-4 text-center sm:mb-0">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Content I produce:
                </h1>
                <p className="duration-200 text-section hover:text-blue-700 dark:hover:text-blue-500">
                    <a href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA">
                        Albastru
                    </a>
                </p>
                <p className="duration-200 text-section hover:text-blue-700 dark:hover:text-blue-500">
                    <a href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA">
                        David Ilie
                    </a>
                </p>
                <Tooltip
                    content="School projects, Personal Projects, etc."
                    placement="bottom"
                >
                    <p className="text-gray-800 cursor-pointer text-section dark:text-gray-200">
                        And much more...
                    </p>
                </Tooltip>
            </div>
        </div>
    );
};
