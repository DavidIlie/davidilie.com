"use client";

import React from "react";
import { formatDistance } from "date-fns";
import { GitFork, Star } from "lucide-react";
import { GitHubProject } from "@prisma/client";

const langColors: Record<string, string> = {
   TypeScript: "#3178c6",
   JavaScript: "#f1e05a",
   Python: "#3572a5",
   Shell: "#89e051",
   Rust: "#dea584",
   Go: "#00add8",
   Java: "#b07219",
   CSS: "#563d7c",
   HTML: "#e34c26",
   Dockerfile: "#384d54",
   Lua: "#000080",
   C: "#555555",
   "C++": "#f34b7d",
};

const SmallProject: React.FC<{ project: GitHubProject }> = ({ project }) => {
   return (
      <a
         href={project.url}
         target="_blank"
         rel="noreferrer"
         className="group flex flex-col rounded-xl border border-border/60 bg-card/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:bg-card/80 hover:shadow-lg hover:shadow-foreground/5"
      >
         <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="truncate text-[0.95rem] font-semibold text-foreground group-hover:text-brand">
               {project.name}
            </h3>
            {project.stars > 0 && (
               <span className="flex flex-shrink-0 items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-current" />
                  {project.stars}
               </span>
            )}
         </div>

         <p className="mb-3 line-clamp-2 flex-1 text-left text-[0.8rem] leading-relaxed text-muted-foreground">
            {project.description || "No description"}
         </p>

         <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {project.language && (
               <span className="flex items-center gap-1.5">
                  <span
                     className="h-2.5 w-2.5 rounded-full"
                     style={{
                        backgroundColor:
                           langColors[project.language] ?? "#8b8b8b",
                     }}
                  />
                  {project.language}
               </span>
            )}
            <span className="ml-auto" suppressHydrationWarning>
               {formatDistance(new Date(project.lastPush), new Date(), {
                  addSuffix: true,
               })}
            </span>
         </div>
      </a>
   );
};

export default SmallProject;
