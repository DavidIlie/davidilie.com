"use client";

import React from "react";
import Image from "next/image";
import { GitHubProject } from "../../../generated/prisma/client";
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
      <div className="my-8 w-full flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white/60 dark:border-gray-700/50 dark:bg-gray-800/40">
         <div className="relative aspect-[16/9]">
            <Image
               src={project.image}
               alt={`${project.name}'s photo`}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               className="rounded-t-xl object-cover"
               fill={true}
               sizes="100vw"
            />
         </div>
         <div className="border-t border-gray-200/80 px-4 py-3 text-left dark:border-gray-700/50">
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
               <p className="mt-0.5 italic text-gray-700 dark:text-gray-400" suppressHydrationWarning>
                  Last updated{" "}
                  {formatDistance(new Date(repo.lastPush), new Date(), {
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
