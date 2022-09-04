import * as React from "react";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { GitHubProject } from "@prisma/client";
import { FiExternalLink } from "react-icons/fi";
import { formatDistance } from "date-fns";

import { trpc } from "@/lib/trpc";
import { shimmer } from "@/lib/shimmer";
import BlogTags from "../BlogComponents/Tags";
import type { Project, ProjectGitHub } from "@/data/projects";

const PinnedProject: React.FC<{ project: Project; left: boolean }> = ({
   project: uncastedProject,
   left,
}) => {
   const matches = useMediaQuery("(min-width: 900px)", true);

   if (typeof (uncastedProject as any).repo_id === "string") {
      let project = uncastedProject as ProjectGitHub;
      const { data } = trpc.useQuery([
         "getProjectByName",
         { name: project.repo_id },
      ]);
      if (matches) {
         return (
            <ImageProject
               isGitHub={true}
               project={project}
               left={left}
               repo={data}
            />
         );
      } else {
         return (
            <ResponsiveProject
               isGitHub={true}
               project={project}
               left={left}
               repo={data}
            />
         );
      }
   } else {
      let project = uncastedProject as ProjectGitHub;
      if (matches) {
         return <ImageProject isGitHub={false} project={project} left={left} />;
      } else {
         return (
            <ResponsiveProject isGitHub={false} project={project} left={left} />
         );
      }
   }
};

const ImageProject: React.FC<{
   project: Project;
   left: boolean;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}> = ({ project, left, isGitHub, repo }) => {
   return (
      <div className="relative my-12">
         <div
            className={`relative max-w-[83%] border-2 border-gray-700 rounded-xl ${
               left ? "ml-auto" : "ml-0"
            }`}
         >
            <div className="container w-full">
               <div className="aspect-[16/9]">
                  <Image
                     src={project.image}
                     alt={`${project.name}'s photo`}
                     placeholder="blur"
                     blurDataURL={shimmer(1920, 1080)}
                     layout="fill"
                     className="rounded-xl"
                  />
               </div>
            </div>
         </div>
         <div
            className={`absolute ${
               left
                  ? "xl:left-[-7%] left-0 text-left"
                  : "xl:right-[-7%] right-0 text-right"
            } top-[50%] bg-gray-100 border-2 dark:border-gray-700 border-gray-200 dark:bg-gray-800 w-[45%] max-w-[450px] p-5 rounded-xl`}
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
                  <FiExternalLink className="font-semibold text-blue-500" />
               </a>
            </div>
            <div className={`my-1 ${!left && "-mr-2"}`}>
               {project.tags.map((tag, index) => (
                  <BlogTags key={index} tag={tag} />
               ))}
            </div>
            <p>{project.description}</p>
            {isGitHub && repo && (
               <p className="mt-0.5 -mb-2 italic text-gray-700 dark:text-gray-400">
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

const ResponsiveProject: React.FC<{
   project: Project;
   left: boolean;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}> = ({ project, left, isGitHub, repo }) => {
   return (
      <div className="flex-col w-full my-8 bg-gray-100 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark: rounded-xl">
         <div className="relative aspect-[16/9]">
            <Image
               src={project.image}
               alt={`${project.name}'s photo`}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               layout="fill"
               className="rounded-t-xl"
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
                  <BlogTags key={index} tag={tag} />
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

export default PinnedProject;
