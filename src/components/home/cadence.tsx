import Link from "next/link";

import { GitHubGraphServer } from "~/components/github-graph-server";
import { SectionLabel } from "./section-label";

/**
 * Cadence — the contribution calendar lives on the home now. Real public
 * proof of consistency. Wraps the existing GitHubGraph server component
 * with a section label so it slots into the home rhythm.
 */
export const Cadence: React.FC = () => {
   return (
      <section
         aria-labelledby="cadence-heading"
         className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-16"
      >
         <SectionLabel className="mb-6" number="05">
            <span id="cadence-heading">Cadence</span>
         </SectionLabel>
         <p className="mb-6 max-w-xl text-sm text-muted-foreground">
            One blue square per push. The only stat that really matters, updated
            hourly from{" "}
            <Link
               href="https://github.com/davidilie"
               target="_blank"
               rel="noreferrer"
               className="text-foreground transition-colors hover:text-brand"
            >
               GitHub
            </Link>
            .
         </p>
         <GitHubGraphServer />
      </section>
   );
};
