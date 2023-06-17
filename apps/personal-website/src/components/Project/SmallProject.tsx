import React from "react";
import { GitHubProject } from "@prisma/client";

const SmallProject: React.FC<{ project: GitHubProject }> = ({ project }) => {
   return (
      <a
         href={project.url}
         target="_blank"
         rel="noreferrer"
         className="h-full w-full overflow-visible truncate p-1"
      >
         <div className="hoverItem flex cursor-pointer flex-col items-start justify-start truncate rounded-lg border-2 border-gray-200 bg-gray-100 p-3 pl-5 text-left shadow-md duration-200 dark:border-gray-700 dark:bg-gray-800">
            <h1 className="mb-3 truncate text-xl font-semibold">
               {project.name}

               {project.language ? (
                  <span className="ml-2 mr-2 inline-flex items-center justify-center rounded-md bg-green-600 px-2 py-1 text-xs font-bold leading-none text-green-100">
                     {project.language}
                  </span>
               ) : null}
            </h1>
            <h1
               className="max-w-full truncate text-gray-400"
               style={{ justifySelf: "center" }}
            >
               {project.description}
            </h1>
         </div>
      </a>
   );
};

export default SmallProject;
