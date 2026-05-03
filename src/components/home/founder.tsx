import Image from "next/image";

import { shimmer } from "~/lib/shimmer";

import MePhoto from "../../../public/static/me.jpeg";
import { SectionLabel } from "./section-label";

/**
 * The "Hey, I'm David" beat — marclou's BELONGING moment. Bigger photo,
 * year-anchored origin story, breadth named in plain prose. Replaces the
 * juvenile "I am an ambitious 19-year-old" copy from the legacy /about.
 */
export const Founder: React.FC = () => {
   return (
      <section
         aria-labelledby="founder-heading"
         className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-16"
      >
         <SectionLabel className="mb-8" number="03">
            <span id="founder-heading">Hey, I&rsquo;m David</span>
         </SectionLabel>

         <div className="grid gap-8 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-10">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl ring-1 ring-border/60 sm:h-40 sm:w-40">
               <Image
                  src={MePhoto}
                  alt="David Ilie"
                  fill
                  sizes="160px"
                  className="object-cover"
                  blurDataURL={shimmer(160, 160)}
                  placeholder="blur"
               />
            </div>

            <div className="space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
               <p>
                  I&rsquo;ve been curious about how computers work since I was a
                  kid.
               </p>
               <p className="text-muted-foreground">
                  Took it seriously around fifteen and somewhere along the way
                  ended up doing a bit of everything: apps, video, a homelab,
                  agents that help me ship. The breadth wasn&rsquo;t a plan, it
                  just kept happening. This site is the open notebook, and
                  whatever I&rsquo;m experimenting with usually lands here
                  first.
               </p>
            </div>
         </div>
      </section>
   );
};
