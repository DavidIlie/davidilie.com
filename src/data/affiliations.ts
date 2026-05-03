/**
 * The Affiliations grid on the home page is sourced here.
 *
 * Pattern borrowed from antfu.me — a 4-row format that compresses an
 * entire OSS / infra career into four labelled rows of logo+name pills.
 * Edit the rows freely; the component renders them in the order below.
 */

export type AffiliationKind =
   | "running-on"
   | "built-with"
   | "authored"
   | "shipping";

export type Affiliation = {
   kind: AffiliationKind;
   label: string;
   href?: string;
   /** Optional emoji or single-character glyph — used when no logo is wired. */
   glyph?: string;
};

export const AFFILIATION_LABELS: Record<AffiliationKind, string> = {
   "running-on": "Running on",
   "built-with": "Built with",
   authored: "Authored",
   shipping: "Currently shipping",
};

export const affiliations: Affiliation[] = [
   // Running on — the homelab stack
   {
      kind: "running-on",
      label: "Kubernetes",
      href: "https://github.com/davidilie/davidapps-cluster",
      glyph: "k8s",
   },
   { kind: "running-on", label: "Talos Linux", glyph: "talos" },
   { kind: "running-on", label: "Cilium", glyph: "cilium" },
   { kind: "running-on", label: "Postgres", glyph: "pg" },
   { kind: "running-on", label: "Prometheus", glyph: "prom" },

   // Built with — primary day-to-day stack
   { kind: "built-with", label: "Next.js", glyph: "next" },
   { kind: "built-with", label: "TypeScript", glyph: "ts" },
   { kind: "built-with", label: "Tailwind", glyph: "tw" },
   { kind: "built-with", label: "tRPC", glyph: "trpc" },
   { kind: "built-with", label: "Prisma", glyph: "prisma" },

   // Authored — original work
   {
      kind: "authored",
      label: "ZeroCut",
      href: "https://www.zerocut.gg",
      glyph: "zc",
   },
   {
      kind: "authored",
      label: "Plexo",
      href: "https://plexo.davidhome.ro",
      glyph: "plx",
   },
   { kind: "authored", label: "Caveman Code Review skill", glyph: "skill" },
   { kind: "authored", label: "davidapps-cluster", glyph: "cluster" },

   // Currently shipping — what's getting commits this week
   {
      kind: "shipping",
      label: "davidilie.com 2026",
      glyph: "site",
   },
];
