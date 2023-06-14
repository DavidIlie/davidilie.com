"use client";

import React from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";

import { FiExternalLink } from "react-icons/fi";

import { Tags } from "@david/ui";
import { GitHubProject } from "@prisma/client";
import { ProjectGitHub } from "~/data/projects";
import { shimmer } from "~/lib/shimmer";

const ResponsiveProject = ({
   project,
   isGitHub,
   repo,
}: {
   project: ProjectGitHub;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}) => {
   return (
      <div className="flex-col w-full my-8 bg-gray-100 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark: rounded-xl">
         <div className="relative aspect-[16/9]">
            <Image
               src={project.image}
               alt={`${project.name}'s photo`}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               className="object-cover rounded-t-xl"
               fill={true}
            />
         </div>
         <div className="px-3 py-2 text-left border-t-4 dark:border-t-gray-700 border-t-gray-400">
            <div className="flex justify-between text-3xl">
               <h1 className="text-3xl font-bold">{project.name}</h1>
               <a
                  href={isGitHub && !project.url ? repo?.url : project.url}
                  target="_blank"
                  rel="noreferrer"
               >
                  <FiExternalLink className="font-semibold text-blue-500" />
               </a>
            </div>
            <div className="my-1">
               {project.tags.map((tag, index) => (
                  <Tags key={index} tag={tag} />
               ))}
            </div>
            <p>{project.description}</p>
            {isGitHub && repo && (
               <p className="mt-0.5 italic text-gray-700 dark:text-gray-400">
                  Last updated{" "}
                  {formatDistance(new Date(repo.lastPush), Date.now(), {
                     addSuffix: true,
                  })}
                  ,{" "}
                  <a
                     className="duration-150 hover:text-blue-500"
                     href={repo.url}
                     target="_blank"
                     rel="noreferrer"
                  >
                     {repo.stars} star{repo.stars !== 1 && "s"}
                  </a>
               </p>
            )}
         </div>
      </div>
   );
};

export default ResponsiveProject;
