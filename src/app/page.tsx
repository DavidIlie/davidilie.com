import { Suspense } from "react";

import { Affiliations } from "~/components/home/affiliations";
import { BranchDecor } from "~/components/home/branch-decor";
import { Cadence } from "~/components/home/cadence";
import { CurrentlyShipping } from "~/components/home/currently-shipping";
import { DottedSeparator } from "~/components/home/dotted-separator";
import { FeaturedWriting } from "~/components/home/featured-writing";
import { Founder } from "~/components/home/founder";
import { HomeHero } from "~/components/home/hero";
import { FadeUpInView } from "~/components/home/motion-in-view";
import { NowPanel } from "~/components/home/now-panel";
import { fetchContributions } from "~/server/github-contributions";
import { api, HydrateClient } from "~/trpc/server";

const FeaturedWritingFallback = () => (
   <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      <ul className="mt-6 space-y-3">
         {[0, 1, 2, 3].map((i) => (
            <li
               key={i}
               className="h-7 animate-pulse rounded bg-muted/60"
               style={{ animationDelay: `${i * 80}ms` }}
            />
         ))}
      </ul>
   </section>
);

const Home = async () => {
   void api.spotify.playingStateAndSong.prefetch();
   void api.cron.statistics.prefetch();

   const contributions = await fetchContributions();
   const currentStreak = contributions?.currentStreak;

   // Latest non-zero contribution day = effective "last push" date.
   const lastPushAt = contributions?.weeks
      .flatMap((w) => w.days)
      .filter((d) => d.count > 0)
      .at(-1)?.date;

   return (
      <HydrateClient>
         <div className="relative isolate">
            <BranchDecor corner="top-right" />

            <HomeHero />

            <NowPanel currentStreak={currentStreak} lastPushAt={lastPushAt} />

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
      </HydrateClient>
   );
};

export default Home;
