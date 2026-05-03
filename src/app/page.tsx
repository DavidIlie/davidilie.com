import { Suspense } from "react";

import { Affiliations } from "~/components/home/affiliations";
import { BranchDecor } from "~/components/home/branch-decor";
import { Closing } from "~/components/home/closing";
import { CurrentlyShipping } from "~/components/home/currently-shipping";
import { DottedSeparator } from "~/components/home/dotted-separator";
import { FeaturedWriting } from "~/components/home/featured-writing";
import { HomeHero } from "~/components/home/hero";
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

   const contributions = await fetchContributions();
   const currentStreak = contributions?.currentStreak;

   return (
      <HydrateClient>
         <div className="relative isolate">
            <BranchDecor corner="top-right" />
            <BranchDecor corner="bottom-left" />

            <HomeHero />

            <NowPanel currentStreak={currentStreak} />

            <DottedSeparator />

            <Affiliations />

            <DottedSeparator />

            <CurrentlyShipping />

            <DottedSeparator />

            <Suspense fallback={<FeaturedWritingFallback />}>
               <FeaturedWriting />
            </Suspense>

            <DottedSeparator />

            <Closing />
         </div>
      </HydrateClient>
   );
};

export default Home;
