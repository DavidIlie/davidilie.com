import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import projects from "~/data/projects";

import { SectionLabel } from "./section-label";

/**
 * Three-up gallery of recent ships. Replaces the legacy single-tile
 * "Top Project" + the single CurrentlyShipping tile. Mirrors the
 * Samuel Kraft pattern: tile = real product art (or screenshot), name,
 * 1-line desc, tag chips, external arrow on hover.
 */
export const ProjectsGallery: React.FC = () => {
   // First three from data/projects.ts (ZeroCut / Plexo / KCA News).
   const featured = projects.slice(0, 3);

   return (
      <section
         aria-labelledby="ships-heading"
         className="mx-auto w-full max-w-5xl px-6 py-4 sm:py-6"
      >
         <SectionLabel className="mb-8" number="04">
            <span id="ships-heading">Recent ships</span>
         </SectionLabel>

         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => {
               const href = project.url;
               const linkProps = href
                  ? {
                       href,
                       target: "_blank" as const,
                       rel: "noreferrer",
                    }
                  : { href: "/projects" as const };

               return (
                  <Link
                     key={project.name}
                     {...linkProps}
                     className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
                     style={{
                        ...(i === 0 ? { gridColumn: "span 1 / span 1" } : {}),
                     }}
                  >
                     <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                        <Image
                           src={project.image}
                           alt={project.name}
                           fill
                           className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                           unoptimized={project.image.startsWith("http")}
                        />
                     </div>
                     <div className="flex flex-1 flex-col gap-2 p-5">
                        <div className="flex items-baseline justify-between gap-2">
                           <h3 className="text-lg leading-tight font-semibold text-foreground transition-colors group-hover:text-brand">
                              {project.name}
                           </h3>
                           {href ? (
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                           ) : null}
                        </div>
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                           {project.description}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                           {project.tags.slice(0, 3).map((tag) => (
                              <span
                                 key={tag}
                                 className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 text-[0.7rem] font-medium text-secondary-foreground"
                              >
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>
                  </Link>
               );
            })}
         </div>

         <div className="mt-6 flex justify-end">
            <Link
               href="/projects"
               className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
               See all projects
               <ArrowRight className="h-3.5 w-3.5" />
            </Link>
         </div>
      </section>
   );
};
