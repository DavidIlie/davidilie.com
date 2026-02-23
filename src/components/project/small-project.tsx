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
         <div className="flex cursor-pointer flex-col items-start justify-start truncate rounded-xl border border-gray-200/80 bg-white/60 p-3 pl-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600">
            <h1 className="mb-3 truncate text-xl font-semibold">
               {project.name}

               {project.language ? (
                  <span className="ml-2 mr-2 inline-flex items-center justify-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium leading-none text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
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
