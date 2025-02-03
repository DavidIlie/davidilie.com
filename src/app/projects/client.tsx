"use client";

import SmallProject from "~/components/project/small-project";
import { api } from "~/trpc/react";

export const ClientProjectGitHub = () => {
   const [githubProjects] = api.cron.github.useSuspenseQuery();

   return (
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 px-2 sm:px-0 md:grid-cols-2 xl:grid-cols-3">
         {githubProjects
            ?.sort(
               (a, b) =>
                  new Date(a.lastPush).getTime() -
                  new Date(b.lastPush).getTime(),
            )
            .reverse()
            .map((project) => (
               <SmallProject project={project} key={project.name} />
            ))}
      </div>
   );
};
