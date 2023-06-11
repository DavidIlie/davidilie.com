import React from "react";

import { GitHubProject } from "@prisma/client";

const SmallProject: React.FC<{ project: GitHubProject }> = ({ project }) => {
   return (
      <a
         href={project.url}
         target="_blank"
         rel="noreferrer"
         className="w-full h-full p-1 overflow-visible truncate"
      >
         <div className="flex flex-col items-start justify-start p-3 pl-5 text-left truncate duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-md cursor-pointer dark:bg-gray-800 dark:border-gray-700 hoverItem">
            <h1 className="mb-3 text-xl font-semibold truncate">
               {project.name}

               {project.language ? (
                  <span className="inline-flex items-center justify-center px-2 py-1 ml-2 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-md">
                     {project.language}
                  </span>
               ) : null}
            </h1>
            <h1
               className="max-w-full text-gray-400 truncate"
               style={{ justifySelf: "center" }}
            >
               {project.description}
            </h1>
         </div>
      </a>
   );
};

export default SmallProject;
