"use client";

import { useMemo, useState } from "react";
import { formatDistance } from "date-fns";
import {
   ArrowDownWideNarrow,
   ArrowUpDown,
   Clock,
   ExternalLink,
   GitFork,
   Search,
   Star,
   X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GitHubProject } from "@prisma/client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

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

type SortKey = "stars" | "lastPush" | "name";

export const ClientProjectGitHub = () => {
   const [githubProjects] = api.cron.github.useSuspenseQuery();
   const [search, setSearch] = useState("");
   const [sortBy, setSortBy] = useState<SortKey>("stars");
   const [langFilter, setLangFilter] = useState<string | null>(null);
   const [selectedProject, setSelectedProject] =
      useState<GitHubProject | null>(null);
   const [readmeContent, setReadmeContent] = useState<string | null>(null);
   const [readmeLoading, setReadmeLoading] = useState(false);

   const languages = useMemo(() => {
      const counts: Record<string, number> = {};
      for (const p of githubProjects) {
         if (p.language) counts[p.language] = (counts[p.language] || 0) + 1;
      }
      return Object.entries(counts)
         .sort((a, b) => b[1] - a[1])
         .map(([lang]) => lang);
   }, [githubProjects]);

   const filtered = useMemo(() => {
      let result = [...githubProjects];

      if (search) {
         const q = search.toLowerCase();
         result = result.filter(
            (p) =>
               p.name.toLowerCase().includes(q) ||
               p.description?.toLowerCase().includes(q),
         );
      }

      if (langFilter) {
         result = result.filter((p) => p.language === langFilter);
      }

      result.sort((a, b) => {
         if (sortBy === "stars") return b.stars - a.stars;
         if (sortBy === "lastPush")
            return (
               new Date(b.lastPush).getTime() -
               new Date(a.lastPush).getTime()
            );
         return a.name.localeCompare(b.name);
      });

      return result;
   }, [githubProjects, search, sortBy, langFilter]);

   const totalStars = useMemo(
      () => githubProjects.reduce((sum, p) => sum + p.stars, 0),
      [githubProjects],
   );

   const openProject = async (project: GitHubProject) => {
      setSelectedProject(project);
      setReadmeContent(null);
      setReadmeLoading(true);

      try {
         const res = await fetch(
            `https://api.github.com/repos/DavidIlie/${project.name}/readme`,
            { headers: { Accept: "application/vnd.github.v3.html" } },
         );
         if (res.ok) {
            setReadmeContent(await res.text());
         } else {
            setReadmeContent(null);
         }
      } catch {
         setReadmeContent(null);
      } finally {
         setReadmeLoading(false);
      }
   };

   const sortOptions: {
      key: SortKey;
      label: string;
      icon: React.ReactNode;
   }[] = [
      {
         key: "stars",
         label: "Stars",
         icon: <Star className="h-3.5 w-3.5" />,
      },
      {
         key: "lastPush",
         label: "Recent",
         icon: <Clock className="h-3.5 w-3.5" />,
      },
      {
         key: "name",
         label: "Name",
         icon: <ArrowDownWideNarrow className="h-3.5 w-3.5" />,
      },
   ];

   return (
      <>
         {/* Stats + Search row */}
         <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
               <span className="flex items-center gap-1.5">
                  <GitFork className="h-3.5 w-3.5" />
                  {githubProjects.length} repos
               </span>
               <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {totalStars} stars
               </span>
            </div>
            <div className="flex items-center gap-2">
               <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                     type="text"
                     placeholder="Search..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-40 rounded-lg border border-border bg-card/60 py-1.5 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none sm:w-48"
                  />
               </div>
               <div className="flex gap-0.5 rounded-lg border border-border bg-card/60 p-0.5">
                  {sortOptions.map((opt) => (
                     <button
                        key={opt.key}
                        onClick={() => setSortBy(opt.key)}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                           sortBy === opt.key
                              ? "bg-brand text-brand-foreground"
                              : "text-muted-foreground hover:text-foreground"
                        }`}
                     >
                        {opt.icon}
                        <span className="hidden sm:inline">{opt.label}</span>
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Language filter pills */}
         <div className="mb-5 flex flex-wrap gap-1.5">
            <button
               onClick={() => setLangFilter(null)}
               className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  !langFilter
                     ? "bg-brand text-brand-foreground"
                     : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
               }`}
            >
               All
            </button>
            {languages.map((lang) => (
               <button
                  key={lang}
                  onClick={() =>
                     setLangFilter(langFilter === lang ? null : lang)
                  }
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                     langFilter === lang
                        ? "bg-brand text-brand-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
               >
                  <span
                     className="h-2 w-2 rounded-full"
                     style={{
                        backgroundColor: langColors[lang] ?? "#8b8b8b",
                     }}
                  />
                  {lang}
               </button>
            ))}
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
               <button
                  key={project.name}
                  onClick={() => openProject(project)}
                  className="group flex cursor-pointer flex-col rounded-xl border border-border/60 bg-card/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:bg-card/80 hover:shadow-lg hover:shadow-foreground/5"
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
                  <p className="mb-3 line-clamp-2 flex-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                     {project.description || "No description"}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                     {project.language && (
                        <span className="flex items-center gap-1.5">
                           <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                 backgroundColor:
                                    langColors[project.language] ??
                                    "#8b8b8b",
                              }}
                           />
                           {project.language}
                        </span>
                     )}
                     <span className="ml-auto" suppressHydrationWarning>
                        {formatDistance(
                           new Date(project.lastPush),
                           new Date(),
                           { addSuffix: true },
                        )}
                     </span>
                  </div>
               </button>
            ))}
         </div>

         {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
               No repositories found.
            </p>
         )}

         {/* Project Dialog */}
         <AnimatePresence>
            {selectedProject && (
               <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  <motion.div
                     className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                     onClick={() => setSelectedProject(null)}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                  />
                  <motion.div
                     className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                     }}
                  >
                     {/* Header */}
                     <div className="flex items-start justify-between border-b border-border px-5 py-4">
                        <div className="min-w-0 flex-1">
                           <div className="flex items-center gap-2">
                              <h2 className="text-lg font-bold">
                                 {selectedProject.name}
                              </h2>
                              {selectedProject.stars > 0 && (
                                 <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                                    <Star className="h-3 w-3 fill-current" />
                                    {selectedProject.stars}
                                 </span>
                              )}
                           </div>
                           <p className="mt-0.5 text-sm text-muted-foreground">
                              {selectedProject.description ||
                                 "No description"}
                           </p>
                           <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                              {selectedProject.language && (
                                 <span className="flex items-center gap-1.5">
                                    <span
                                       className="h-2 w-2 rounded-full"
                                       style={{
                                          backgroundColor:
                                             langColors[
                                                selectedProject.language
                                             ] ?? "#8b8b8b",
                                       }}
                                    />
                                    {selectedProject.language}
                                 </span>
                              )}
                              <span suppressHydrationWarning>
                                 Updated{" "}
                                 {formatDistance(
                                    new Date(selectedProject.lastPush),
                                    new Date(),
                                    { addSuffix: true },
                                 )}
                              </span>
                              {selectedProject.issues > 0 && (
                                 <span>
                                    {selectedProject.issues} issue
                                    {selectedProject.issues !== 1 && "s"}
                                 </span>
                              )}
                           </div>
                        </div>
                        <button
                           onClick={() => setSelectedProject(null)}
                           className="ml-4 flex-shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                           <X className="h-4 w-4" />
                        </button>
                     </div>

                     {/* README content — sourced from GitHub API (trusted) */}
                     <div className="flex-1 overflow-y-auto p-6">
                        {readmeLoading && (
                           <div className="flex items-center justify-center py-12">
                              <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-brand" />
                           </div>
                        )}
                        {!readmeLoading && readmeContent && (
                           <div
                              className="github-readme prose prose-sm max-w-full dark:prose-invert prose-headings:font-display prose-a:text-brand prose-img:max-w-full prose-img:rounded-lg"
                              dangerouslySetInnerHTML={{
                                 __html: readmeContent,
                              }}
                           />
                        )}
                        {!readmeLoading && !readmeContent && (
                           <p className="py-12 text-center text-sm text-muted-foreground">
                              No README available for this repository.
                           </p>
                        )}
                     </div>

                     {/* Footer */}
                     <div className="border-t border-border p-4">
                        <Button asChild className="w-full">
                           <a
                              href={selectedProject.url}
                              target="_blank"
                              rel="noreferrer"
                           >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View on GitHub
                           </a>
                        </Button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
};
