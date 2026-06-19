import { Suspense } from "react";
import type { Metadata } from "next";

import { buildMetadata } from "~/lib/metadata";
import projects from "~/data/projects";

import { GitHubGraphServer } from "~/components/github-graph-server";
import PinnedProject from "~/components/project/pinned-project";
import { api, HydrateClient } from "~/trpc/server";
import { ClientProjectGitHub } from "./client";
import LoadingSpinner from "./loading";

export const metadata: Metadata = buildMetadata({
   title: "Projects",
   description:
      "Open-source repos, full products, things that shipped and things still cooking — plus every public GitHub repo and a live contribution graph.",
   path: "/projects",
});

const Page = async () => {
   void api.cron.github.prefetch();
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <section className="mx-auto w-full max-w-3xl px-6 pt-24 pb-8 sm:pt-32">
            <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
               Everything I&rsquo;ve shipped
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
               Projects
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
               Open-source repos, full products, things-that-shipped, and
               things-still-cooking. The pinned ones below get the long
               write-up. Everything else is in the repo list.
            </p>
         </section>

         <div className="mx-auto w-full max-w-5xl px-6">
            <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
               Pinned
            </p>
         </div>
         {projects.map((project, index) => (
            <PinnedProject
               project={project}
               left={index % 2 === 0}
               key={index}
            />
         ))}

         <div className="mx-auto mt-16 w-full max-w-[110rem] px-4 sm:mt-20 sm:px-8 lg:px-16">
            <div className="mx-auto mb-6 max-w-3xl">
               <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                  All repositories
               </p>
               <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                  Public on GitHub
               </h2>
               <p className="mt-2 text-sm text-muted-foreground">
                  Filter by language, sort by stars or last push, click any card
                  to read the README inline.
               </p>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
               <ClientProjectGitHub />
            </Suspense>
         </div>

         <section className="mx-auto mt-20 mb-8 w-full max-w-5xl px-6 sm:mt-24">
            <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
               Cadence
            </p>
            <h2 className="mb-2 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
               One blue square per push
            </h2>
            <p className="mb-6 max-w-xl text-sm text-muted-foreground">
               The repo list is the what. This is the cadence, pulled live from
               GitHub, updated hourly.
            </p>
            <GitHubGraphServer />
         </section>
      </HydrateClient>
   );
};

export default Page;
