import Link from "next/link";

import {
   AFFILIATION_LABELS,
   affiliations,
   type AffiliationKind,
} from "~/data/affiliations";

import { SectionLabel } from "./section-label";

const KIND_ORDER: AffiliationKind[] = [
   "running-on",
   "built-with",
   "authored",
   "shipping",
];

const Pill: React.FC<{
   label: string;
   glyph?: string;
   href?: string;
}> = ({ label, glyph, href }) => {
   const inner = (
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-sm text-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted/40 hover:text-brand">
         {glyph ? (
            <span
               aria-hidden
               className="font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase"
            >
               {glyph}
            </span>
         ) : null}
         {label}
      </span>
   );
   if (href) {
      return (
         <Link href={href} target="_blank" rel="noreferrer">
            {inner}
         </Link>
      );
   }
   return inner;
};

export const Affiliations: React.FC = () => {
   return (
      <section
         aria-labelledby="affiliations-heading"
         className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16"
      >
         <h2 id="affiliations-heading" className="sr-only">
            Affiliations
         </h2>
         <div className="space-y-6">
            {KIND_ORDER.map((kind) => {
               const items = affiliations.filter((a) => a.kind === kind);
               if (items.length === 0) return null;
               return (
                  <div
                     key={kind}
                     className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
                  >
                     <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {AFFILIATION_LABELS[kind]}
                     </span>
                     <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                           <Pill
                              key={`${kind}-${item.label}`}
                              label={item.label}
                              glyph={item.glyph}
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
