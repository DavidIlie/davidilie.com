"use client";

import React from "react";
import Image from "next/image";
import { GitHubProject } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Link } from "lucide-react";

import { shimmer } from "~/lib/shimmer";
import { ProjectGitHub } from "~/data/projects";

import { Tags } from "~/components/tag";

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
      <div className="dark: my-8 w-full flex-col rounded-xl border-2 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
         <div className="relative aspect-[16/9]">
            <Image
               src={project.image}
               alt={`${project.name}'s photo`}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               className="rounded-t-xl object-cover"
               fill={true}
            />
         </div>
         <div className="border-t-4 border-t-gray-400 px-3 py-2 text-left dark:border-t-gray-700">
            <div className="flex justify-between text-3xl">
               <h1 className="text-3xl font-bold">{project.name}</h1>
               <a
                  href={isGitHub && !project.url ? repo?.url : project.url}
                  target="_blank"
                  rel="noreferrer"
               >
                  <Link className="font-semibold text-blue-500" />
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
