import { Suspense } from "react";
import type { Metadata } from "next";

import projects from "~/data/projects";

import PinnedProject from "~/components/project/pinned-project";
import { api, HydrateClient } from "~/trpc/server";
import { ClientProjectGitHub } from "./client";
import LoadingSpinner from "./loading";

export const metadata: Metadata = {
   title: "Projects",
};

const Page = async () => {
   void api.cron.github.prefetch();
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <h1 className="gradient-text -mb-4 pb-2 text-center text-5xl font-bold sm:-mb-6 sm:text-6xl">
            Projects
         </h1>
         {projects.map((project, index) => (
            <PinnedProject
               project={project}
               left={index % 2 === 0}
               key={index}
            />
         ))}

         <div className="mt-8 sm:mt-12">
            <h2 className="gradient-text pb-2 text-center text-4xl font-bold sm:text-5xl">
               Repositories
            </h2>
            <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
               All my public repositories on GitHub
            </p>
            <Suspense fallback={<LoadingSpinner />}>
               <ClientProjectGitHub />
            </Suspense>
         </div>
      </HydrateClient>
   );
};

export default Page;
