"use client";

import { useState } from "react";

import SmallProject from "~/components/project/small-project";
import { api } from "~/trpc/react";

export const ClientProjectGitHub = () => {
   const [githubProjects] = api.cron.github.useSuspenseQuery();
   const [showAll, setShowAll] = useState(false);

   const sorted = githubProjects
      ?.sort(
         (a, b) =>
            new Date(b.lastPush).getTime() - new Date(a.lastPush).getTime(),
      );

   const visible = showAll ? sorted : sorted?.slice(0, 12);
   const hasMore = (sorted?.length ?? 0) > 12;

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible?.map((project) => (
               <SmallProject project={project} key={project.name} />
            ))}
         </div>
         {hasMore && !showAll && (
            <button
               onClick={() => setShowAll(true)}
               className="mx-auto flex items-center gap-2 rounded-lg border border-gray-200/80 bg-white/60 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:text-gray-300 dark:hover:border-gray-600"
            >
               Show all {sorted?.length} repositories
            </button>
         )}
      </div>
   );
};
