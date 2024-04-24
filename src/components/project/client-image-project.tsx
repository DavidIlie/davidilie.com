"use client";

import React from "react";
import Image from "next/image";
import { GitHubProject } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Link } from "lucide-react";

import { shimmer } from "~/lib/shimmer";
import { ProjectGitHub } from "~/data/projects";

import { Tags } from "~/components/tag";

const ImageProject = ({
   project,
   left,
   isGitHub,
   repo,
}: {
   project: ProjectGitHub;
   left: boolean;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}) => {
   return (
      <div className="relative my-12">
         <div
            className={`relative max-w-[83%] rounded-xl border-2 border-gray-700 ${
               left ? "ml-auto" : "ml-0"
            }`}
         >
            <div className="container w-full">
               <div className="aspect-video">
                  <Image
                     src={project.image}
                     alt={`${project.name}'s photo`}
                     placeholder="blur"
                     blurDataURL={shimmer(1920, 1080)}
                     className="rounded-xl object-cover"
                     fill={true}
                  />
               </div>
            </div>
         </div>
         <div
            className={`absolute ${
               left
                  ? "left-0 text-left xl:left-[-7%]"
                  : "right-0 text-right xl:right-[-7%]"
            } top-[50%] w-[45%] max-w-[450px] rounded-xl border-2 border-gray-200 bg-gray-100 p-5 dark:border-gray-700 dark:bg-gray-800`}
            style={{ transform: "translate(0, -50%)" }}
         >
            <div
               className={`flex ${
                  !left && "flex-row-reverse"
               } items-center justify-between text-3xl`}
            >
               <h1 className="font-bold">{project.name}</h1>
               <a
                  href={isGitHub && !project.url ? repo?.url : project.url}
                  target="_blank"
                  rel="noreferrer"
               >
                  <Link className="font-semibold text-blue-500" />
               </a>
            </div>
            <div className={`my-1 ${!left && "-mr-2"}`}>
               {project.tags.map((tag, index) => (
                  <Tags key={index} tag={tag} />
               ))}
            </div>
            <p>{project.description}</p>
            {isGitHub && repo && (
               <p className="-mb-2 mt-0.5 italic text-gray-700 dark:text-gray-400">
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

export default ImageProject;
