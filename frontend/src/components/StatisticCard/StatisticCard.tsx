import React from "react";

interface StatisticCardProps {
    title: string;
    statistic: string | number;
    percentage?: number;
    percentageType?: "increase" | "decrease";
}

const StatisticCard = ({
    title,
    statistic,
}: StatisticCardProps): JSX.Element => {
    return (
        <div className="border-2 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-900 rounded-xl px-4 py-2 hoverItem duration-200">
            <h1 className="flex items-center text-gray-800 dark:text-gray-400 font-semibold">
                {title}
            </h1>
            <h1 className="mt-1 text-3xl font-bold spacing-sm text-black dark:text-white">
                {statistic}
            </h1>
        </div>
    );
};

export default StatisticCard;
