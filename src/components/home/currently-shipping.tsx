import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionLabel } from "./section-label";

/**
 * Single tile — the most recent shipped product (currently ZeroCut).
 * Builds the home's "show, don't tell" beat without dragging the user
 * into the full /projects grid.
 */
export const CurrentlyShipping: React.FC = () => {
   return (
      <section
         aria-labelledby="currently-shipping-heading"
         className="mx-auto w-full max-w-3xl px-6 py-12"
      >
         <SectionLabel className="mb-6" number="03">
            <span id="currently-shipping-heading">Most recent ship</span>
         </SectionLabel>

         <Link
            href="https://www.zerocut.gg"
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-2xl border border-border/70 bg-card/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10"
         >
            <div className="grid gap-0 sm:grid-cols-[1.05fr_1fr]">
               <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                  <Image
                     src="/static/zerocut.png"
                     alt="ZeroCut — donation platform for streamers"
                     fill
                     className="object-cover"
                     sizes="(max-width: 640px) 100vw, 50vw"
                  />
               </div>
               <div className="flex flex-col justify-center gap-3 p-6 sm:p-7">
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] text-brand uppercase">
                     <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                     </span>
                     Live in production
                  </div>
                  <h3 className="text-xl leading-tight font-semibold sm:text-2xl">
                     ZeroCut
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                     Donation platform for streamers. Stripe checkout, auth,
                     creator dashboard, ClickHouse event analytics. End-to-end
                     in seven days from empty repo.
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {["Next.js", "Stripe", "ClickHouse"].map((tag) => (
                        <span
                           key={tag}
                           className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                           {tag}
                        </span>
                     ))}
                  </div>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                     zerocut.gg
                     <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
               </div>
            </div>
         </Link>

         <div className="mt-4 flex justify-end">
            <Link
               href="/projects"
               className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
               See all projects &rarr;
            </Link>
         </div>
      </section>
   );
};
