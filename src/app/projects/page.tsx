import { Suspense } from "react";
import type { Metadata } from "next";

import projects from "~/data/projects";

import { GitHubGraphServer } from "~/components/github-graph-server";
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
         <h1 className="-mb-4 pb-2 text-center text-5xl font-bold text-brand sm:-mb-6 sm:text-6xl">
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
            <h2 className="pb-2 text-center text-4xl font-bold text-brand sm:text-5xl">
               Repositories
            </h2>
            <p className="mb-6 text-center text-sm text-muted-foreground">
               All my public repositories on GitHub
            </p>
            <Suspense fallback={<LoadingSpinner />}>
               <ClientProjectGitHub />
            </Suspense>
         </div>

         <section className="mx-auto mt-16 mb-8 w-full max-w-[110rem] px-4 sm:mt-20 sm:px-8 lg:px-16">
            <div className="mb-8 text-center">
               <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">
                  And one{" "}
                  <span className="text-brand">green square</span> per
                  push
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  The repo list is the what. This is the cadence.
               </p>
            </div>
            <GitHubGraphServer />
         </section>
      </HydrateClient>
   );
};

export default Page;
