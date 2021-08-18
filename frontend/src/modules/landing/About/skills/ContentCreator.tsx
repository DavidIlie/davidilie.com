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
        <div className="xl:w-1/3 xs:w-full pt-10 px-5">
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
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold mb-5">Content Creator</h1>
                <p className="text-section px-16">
                    {!isLoading ? (
                        <span>
                            <span className="text-blue-700 dark:text-blue-500 font-bold">
                                {data.subscribers}
                            </span>{" "}
                            Subscribers,{" "}
                            <span className="text-blue-700 dark:text-blue-500 font-bold">
                                {data.views}
                            </span>{" "}
                            Views, and{" "}
                            <span className="text-blue-700 dark:text-blue-500 font-bold">
                                {data.videos}
                            </span>{" "}
                            Videos
                        </span>
                    ) : (
                        <span>Loading...</span>
                    )}
                </p>
            </div>
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Software I use:
                </h1>
                <p className="text-section">Adobe Premiere & Photoshop</p>
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Content I produce:
                </h1>
                <p className="text-section hover:text-blue-700 dark:hover:text-blue-500 duration-200">
                    <a href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA">
                        Albastru
                    </a>
                </p>
                <p className="text-section hover:text-blue-700 dark:hover:text-blue-500 duration-200">
                    <a href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA">
                        David Ilie
                    </a>
                </p>
                <p className="text-section">Short Movies</p>
                <p className="text-section">Comercials</p>
                <Tooltip
                    content="School projects, Personal Projects, etc."
                    placement="bottom"
                >
                    <p className="text-section text-gray-800 dark:text-gray-200 cursor-pointer">
                        And much more...
                    </p>
                </Tooltip>
            </div>
        </div>
    );
};
