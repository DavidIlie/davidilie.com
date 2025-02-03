import { Suspense } from "react";
import type { Metadata } from "next";

import projects from "~/data/projects";

import ExternalLink from "~/components/external-link";
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
         <h1 className="gradient-text -mt-2 pb-2 text-center text-5xl font-bold sm:mt-5 sm:text-6xl">
            Repositories
         </h1>
         <p className="mb-4 text-lg">
            A list of all my public repositories on{" "}
            <ExternalLink url="https://github.com/davidilie">
               GitHub.
            </ExternalLink>
         </p>
         <Suspense fallback={<LoadingSpinner />}>
            <ClientProjectGitHub />
         </Suspense>
      </HydrateClient>
   );
};

export default Page;
