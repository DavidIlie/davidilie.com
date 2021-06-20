import { useState, useEffect } from "react";
import axios from "axios";

import Tooltip from "@ui/Tooltip";

export const ContentCreator = () => {
    const [statistics, setStatistics] = useState(false);

    useEffect(async () => {
        const request = await axios.get(
            "https://davidilie.com/api/agenda/job/statistics"
        );
        if (request.status === 200) setStatistics(request.data);
    }, []);

    return (
        <div className="xl:w-1/3 xs:w-full pt-10 px-5">
            <img
                src="/images/svg/contentcreator.svg"
                className="h-24 w-24 mx-auto animate-bounce-up mb-4"
            />
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold mb-5">Content Creator</h1>
                <p className="text-section px-16">
                    {statistics !== false ? (
                        <span>
                            <span className="text-blue-700 font-bold">
                                {statistics.subscribers}
                            </span>{" "}
                            Subscribers,{" "}
                            <span className="text-blue-700 font-bold">
                                {statistics.views}
                            </span>{" "}
                            Views, and{" "}
                            <span className="text-blue-700 font-bold">
                                {statistics.videos}
                            </span>{" "}
                            Videos
                        </span>
                    ) : (
                        <span>Loading...</span>
                    )}
                </p>
            </div>
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold text-blue-700">
                    Software I use:
                </h1>
                <p className="text-section">Adobe Premiere & Photoshop</p>
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-blue-700">
                    Content I produce:
                </h1>
                <p className="text-section hover:text-blue-700 duration-200">
                    <a href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA">
                        Albastru
                    </a>
                </p>
                <p className="text-section hover:text-blue-700 duration-200">
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
                    <p className="text-section text-gray-800 cursor-pointer">
                        And much more...
                    </p>
                </Tooltip>
            </div>
        </div>
    );
};