import Link from "next/link";
import { Mail } from "lucide-react";

import { SectionLabel } from "./section-label";

/**
 * One closing CTA — replaces the global `<CallToAction />` block on the home.
 *
 * Voice mirrors the developer-portfolio page: specific, constraint-named,
 * promise-bound. No "let's chat", no "let's connect".
 */
export const Closing: React.FC = () => {
   return (
      <section
         aria-labelledby="closing-heading"
         className="mx-auto w-full max-w-3xl px-6 py-4 pb-24 sm:py-6 sm:pb-32"
      >
         <SectionLabel className="mb-6" number="07">
            <span id="closing-heading">Get in touch</span>
         </SectionLabel>

         <div className="space-y-5">
            <p className="text-2xl leading-snug font-semibold text-foreground sm:text-3xl">
               Email me. Two sentences is enough. I&rsquo;ll send back a price
               and a start date by tomorrow.
            </p>
            <p className="text-muted-foreground">
               If you want the full freelance pitch &mdash;{" "}
               <Link
                  href="/developer-portfolio"
                  className="text-foreground underline-offset-4 hover:text-brand hover:underline"
               >
                  the developer portfolio is here
               </Link>{" "}
               and{" "}
               <Link
                  href="/editing-portfolio"
                  className="text-foreground underline-offset-4 hover:text-brand hover:underline"
               >
                  the editing one is here
               </Link>
               . Otherwise:
            </p>
            <div className="flex flex-wrap items-center gap-3">
               <Link
                  href="mailto:david@davidilie.com?subject=Project"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
               >
                  <Mail className="h-4 w-4" />
                  david@davidilie.com
               </Link>
               <span className="text-xs text-muted-foreground">
                  usually reply same day
               </span>
            </div>
         </div>
      </section>
   );
};
