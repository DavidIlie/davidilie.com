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
   | "editing-in"
   | "authored"
   | "shipping";

export type Affiliation = {
   kind: AffiliationKind;
   label: string;
   href?: string;
};

export const AFFILIATION_LABELS: Record<AffiliationKind, string> = {
   "running-on": "Running on",
   "built-with": "Built with",
   "editing-in": "Editing in",
   authored: "Authored",
   shipping: "Currently shipping",
};

export const affiliations: Affiliation[] = [
   // Running on — the homelab stack
   {
      kind: "running-on",
      label: "Kubernetes",
      href: "https://github.com/davidilie/davidapps-cluster",
   },
   { kind: "running-on", label: "Talos Linux" },
   { kind: "running-on", label: "Cilium" },
   { kind: "running-on", label: "Postgres" },
   { kind: "running-on", label: "Prometheus" },

   // Built with — primary code stack
   { kind: "built-with", label: "Next.js" },
   { kind: "built-with", label: "TypeScript" },
   { kind: "built-with", label: "Tailwind" },
   { kind: "built-with", label: "tRPC" },
   { kind: "built-with", label: "Prisma" },

   // Editing in — yes the same person edits the videos
   { kind: "editing-in", label: "Premiere Pro" },
   { kind: "editing-in", label: "After Effects" },
   { kind: "editing-in", label: "Photoshop" },
   { kind: "editing-in", label: "Illustrator" },

   // Authored — original work
   {
      kind: "authored",
      label: "ZeroCut",
      href: "https://www.zerocut.gg",
   },
   {
      kind: "authored",
      label: "Plexo",
      href: "https://plexo.davidhome.ro",
   },
   { kind: "authored", label: "Caveman Code Review skill" },
   { kind: "authored", label: "davidapps-cluster" },

   // Currently shipping — what's getting commits this week
   {
      kind: "shipping",
      label: "davidilie.com 2026",
   },
];
