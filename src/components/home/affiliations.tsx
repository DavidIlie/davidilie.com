import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
   AFFILIATION_LABELS,
   affiliations,
   type AffiliationKind,
} from "~/data/affiliations";

import { SectionLabel } from "./section-label";

const KIND_ORDER: AffiliationKind[] = [
   "running-on",
   "built-with",
   "editing-in",
   "authored",
   "shipping",
];

const Pill: React.FC<{ label: string; href?: string }> = ({ label, href }) => {
   if (href) {
      return (
         <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-sm text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/40 hover:text-brand"
         >
            {label}
            <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-brand" />
         </Link>
      );
   }
   return (
      <span className="inline-flex items-center rounded-full border border-border/60 bg-card/30 px-3 py-1 text-sm text-foreground/85">
         {label}
      </span>
   );
};

export const Affiliations: React.FC = () => {
   return (
      <section
         aria-labelledby="affiliations-heading"
         className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-14"
      >
         <SectionLabel className="mb-8" number="02">
            <span id="affiliations-heading">Stack &amp; receipts</span>
         </SectionLabel>

         <div className="space-y-7">
            {KIND_ORDER.map((kind) => {
               const items = affiliations.filter((a) => a.kind === kind);
               if (items.length === 0) return null;
               return (
                  <div
                     key={kind}
                     className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6"
                  >
                     <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {AFFILIATION_LABELS[kind]}
                     </span>
                     <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                           <Pill
                              key={`${kind}-${item.label}`}
                              label={item.label}
                              href={item.href}
                           />
                        ))}
                     </div>
                  </div>
               );
            })}
         </div>
      </section>
   );
};
