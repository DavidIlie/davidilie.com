import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";

import { buildMetadata } from "~/lib/metadata";

import { Affiliations } from "~/components/home/affiliations";
import { BranchDecor } from "~/components/home/branch-decor";
import { Cadence } from "~/components/home/cadence";
import { CurrentlyShipping } from "~/components/home/currently-shipping";
import { DottedSeparator } from "~/components/home/dotted-separator";
import { FeaturedWriting } from "~/components/home/featured-writing";
import { Founder } from "~/components/home/founder";
import { HomeHero } from "~/components/home/hero";
import { FadeUpInView } from "~/components/home/motion-in-view";
import { NowPanel, NowPanelFallback } from "~/components/home/now-panel";
import { Skeleton } from "~/components/ui/skeleton";
import { fetchContributions } from "~/server/github-contributions";
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export const metadata: Metadata = buildMetadata({
   title: "David Ilie",
   absoluteTitle: true,
   description:
      "Programmer, editor, and sysadmin. My open notebook for shipping experiments — from the Kubernetes cluster running this site to the videos I edit and the AI skills I write to ship faster.",
   path: "/",
   image: "/static/me.jpeg",
});

const titleWidths = ["w-3/5", "w-2/5", "w-1/2", "w-2/3"];

const FeaturedWritingFallback = () => (
   <section className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-16">
      <Skeleton className="mb-6 h-4 w-44" />
      <ul className="space-y-2">
         {titleWidths.map((width, i) => (
            <li key={width} className="flex items-baseline gap-3 px-1 py-2">
               <Skeleton
                  className={`h-5 ${width}`}
                  style={{ animationDelay: `${i * 60}ms` }}
               />
               <span
                  aria-hidden
                  className="mb-1.5 flex-1 self-end border-b border-dotted border-border/60"
               />
               <Skeleton
                  className="h-4 w-12"
                  style={{ animationDelay: `${i * 60}ms` }}
               />
            </li>
         ))}
      </ul>
      <div className="mt-5 flex items-center justify-between">
         <Skeleton className="h-4 w-40" style={{ animationDelay: "240ms" }} />
         <Skeleton className="h-4 w-20" style={{ animationDelay: "300ms" }} />
      </div>
   </section>
);

const NowPanelSection = async () => {
   await connection();

   prefetch(trpc.spotify.playingStateAndSong.queryOptions());
   prefetch(trpc.cron.statistics.queryOptions());

   const contributions = await fetchContributions();
   const currentStreak = contributions?.currentStreak;

   // Real, minute-precise push timestamp. Falls back to the latest non-zero
   // contribution day (midnight) only if the repo timestamp is unavailable.
   const lastPushAt =
      contributions?.lastPushAt ??
      contributions?.weeks
         .flatMap((w) => w.days)
         .filter((d) => d.count > 0)
         .at(-1)?.date;

   // HydrateClient must render after the prefetches start — it dehydrates the
   // query client at render time, so it lives here rather than at page level.
   return (
      <HydrateClient>
         <NowPanel currentStreak={currentStreak} lastPushAt={lastPushAt} />
      </HydrateClient>
   );
};

const Home = () => {
   return (
      <div className="relative isolate">
         <BranchDecor corner="top-right" />

         <HomeHero />

         <Suspense fallback={<NowPanelFallback />}>
            <NowPanelSection />
         </Suspense>

         <DottedSeparator />

         <FadeUpInView>
            <Affiliations />
         </FadeUpInView>

         <DottedSeparator />

         <FadeUpInView>
            <Founder />
         </FadeUpInView>

         <DottedSeparator />

         <FadeUpInView>
            <CurrentlyShipping />
         </FadeUpInView>

         <DottedSeparator />

         <FadeUpInView>
            <Cadence />
         </FadeUpInView>

         <DottedSeparator />

         <FadeUpInView>
            <Suspense fallback={<FeaturedWritingFallback />}>
               <FeaturedWriting />
            </Suspense>
         </FadeUpInView>
      </div>
   );
};

export default Home;
