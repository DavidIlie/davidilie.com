import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { ageWord } from "~/lib/age";
import { shimmer } from "~/lib/shimmer";

import { AgeBadge } from "~/components/home/birthday";
import { Socials } from "~/components/socials";
import MePhoto from "../../../public/static/me.jpeg";

/**
 * The home hero. Three beats:
 *   1. Identity — small avatar + name + role
 *   2. Positioning — three-sentence claim that does the work
 *   3. Stats row — credentials bar in lieu of a fluffy "about me"
 *
 * Pattern is a composite of: Lee Robinson's prose-first, Samuel Kraft's
 * inline-logo bio, Max Schmitt's stats row. No scroll-cue arrow.
 */
// Age changes once a year but the static shell lives until the next deploy —
// 'use cache' + daily revalidation keeps it fresh without going dynamic.
async function CachedAgeBadge() {
   "use cache";
   cacheLife("days");
   return <AgeBadge age={ageWord()} />;
}

export const HomeHero: React.FC = () => {
   return (
      <section
         aria-labelledby="home-hero-name"
         className="relative mx-auto w-full max-w-3xl px-6 pt-28 pb-20 sm:pt-36 sm:pb-28"
      >
         <div
            className="animate-fade-in-up flex items-center gap-4"
            style={{ animationDelay: "0ms" }}
         >
            <Image
               src={MePhoto}
               alt="David Ilie"
               width={64}
               height={64}
               priority
               className="h-16 w-16 rounded-full object-cover ring-1 ring-border/60"
               blurDataURL={shimmer(64, 64)}
               placeholder="blur"
            />
            <div className="flex flex-col">
               <h1
                  id="home-hero-name"
                  className="relative inline-block font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
               >
                  David Ilie
                  <svg
                     aria-hidden
                     className="pointer-events-none absolute -bottom-2 left-0 stroke-current text-brand sm:-bottom-3"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 265 43"
                     fill="none"
                     strokeWidth="7"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeMiterlimit="10"
                     preserveAspectRatio="none"
                     style={{ height: "12px", width: "55%" }}
                  >
                     <path
                        className="animated-underline"
                        d="M16.7 20.2c76.5 4.4 153.6-9.7 229.8-4.1 5.4.4 12.4 2.1 11.7 5.6-67.3 1.7-134.5 5.5-201.2 11.5l87.7-.9c35.2-.4 70.8-.7 104.9 4.6"
                     />
                  </svg>
               </h1>
               <p className="mt-4 font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  Programmer &middot; Editor &middot; Sysadmin
               </p>
            </div>
         </div>

         <div
            className="animate-fade-in-up mt-12 space-y-5 text-lg leading-relaxed text-foreground sm:text-xl"
            style={{ animationDelay: "120ms" }}
         >
            <p>
               I&rsquo;m an ambitious <CachedAgeBadge /> software developer and
               full-time student. Curious about computers since I was a kid, but
               only started shipping properly a few years ago.
            </p>
            <p className="text-muted-foreground">
               This site is the open notebook: a place to share my{" "}
               <span className="font-medium text-foreground">experiments</span>,
               from the Kubernetes cluster running it to the videos I edit and
               the <span className="text-foreground">AI Skills</span> I write to
               help me ship faster.
            </p>
         </div>

         <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground"
            style={{ animationDelay: "240ms" }}
         >
            <Link
               href="/developer-portfolio"
               className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-muted/40 px-3 py-1 font-medium text-brand transition-colors hover:bg-brand-muted/70"
            >
               <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
               </span>
               Available for hire
            </Link>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>UK &middot; Spain &middot; Romania</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>shipping since 2018</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span className="font-mono text-xs">k8s + next.js + ai</span>
         </div>

         <div
            className="animate-fade-in-up mt-10"
            style={{ animationDelay: "360ms" }}
         >
            <Socials font="1.25" className="!mt-0 justify-start gap-6" />
         </div>
      </section>
   );
};
