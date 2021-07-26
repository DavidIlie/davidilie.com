import React from "react";

import ToolCard from "@components/ToolCard";
import tools, { categories, ToolType } from "@data/tools";

const ToolGrid = ({
    filter,
    hidden,
}: {
    filter: categories;
    hidden: boolean;
}): JSX.Element => {
    return (
        <div
            className={`grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 ${
                hidden && "hidden"
            }`}
        >
            {tools
                .filter((x) => x.category.includes(filter))
                .sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                })
                .map((tool: ToolType, index: number) => (
                    <ToolCard {...tool} key={index.toString()} />
                ))}
        </div>
    );
};

export default ToolGrid;
