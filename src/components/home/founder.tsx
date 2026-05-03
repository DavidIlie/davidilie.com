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
         className="mx-auto w-full max-w-3xl px-6 py-12"
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
                  I started shipping at twelve. My first paying client gave me{" "}
                  <span className="tabnum">$15</span> for a CS:GO frag movie.
                  The second was a teacher at school who needed a content
                  management system, so I built one. The pattern stuck.
               </p>
               <p className="text-muted-foreground">
                  I&rsquo;m twenty now. The cluster behind this site is the one
                  I administer. The editor cutting my videos is the same person
                  typing this. I&rsquo;d rather build the infrastructure than
                  pay a vendor for it &mdash; and I&rsquo;d rather edit my own
                  footage than hand it to someone who&rsquo;s never read a
                  retention graph.
               </p>

               <div className="flex flex-wrap gap-2 pt-2">
                  {[
                     "Started at 12",
                     "20 now",
                     "Bucharest",
                     "Edits & ships solo",
                  ].map((tag) => (
                     <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground"
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};
