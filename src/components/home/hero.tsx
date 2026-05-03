import Image from "next/image";
import Link from "next/link";

import { shimmer } from "~/lib/shimmer";

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
export const HomeHero: React.FC = () => {
   return (
      <section
         aria-labelledby="home-hero-name"
         className="relative mx-auto w-full max-w-3xl px-6 pt-24 pb-12 sm:pt-32 sm:pb-16"
      >
         <div className="flex items-center gap-4">
            <Image
               src={MePhoto}
               alt="David Ilie"
               width={56}
               height={56}
               priority
               className="h-14 w-14 rounded-full object-cover ring-1 ring-border/60"
               blurDataURL={shimmer(56, 56)}
               placeholder="blur"
            />
            <div className="flex flex-col">
               <h1
                  id="home-hero-name"
                  className="text-2xl leading-tight font-semibold sm:text-3xl"
               >
                  David Ilie
               </h1>
               <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  Backend &middot; Infra &middot; AI
               </p>
            </div>
         </div>

         <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground sm:text-xl">
            <p>
               <span className="font-semibold">I run my own cluster.</span> I
               built every line of this site. The same person replying to your
               email is the one pushing commits.
            </p>
            <p className="text-muted-foreground">
               Backend and infrastructure engineer based in Romania. Six years
               on this site, a Kubernetes homelab in production, and a daily
               habit of writing my own{" "}
               <Link
                  href="https://www.anthropic.com/news/claude-code"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline-offset-4 hover:text-brand hover:underline"
               >
                  Claude Code
               </Link>{" "}
               skills instead of using someone else&rsquo;s.
            </p>
         </div>

         <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
            <span>6 years on this site</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>Bucharest</span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span>k8s &middot; Next.js &middot; AI</span>
         </div>

         <div className="mt-8">
            <Socials font="1.25" className="!mt-0 justify-start gap-6" />
         </div>
      </section>
   );
};
