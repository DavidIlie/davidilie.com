# Project Rules

Steering notes for agents on `davidilie.com`. Friction points only — the
codebase describes itself. If a rule stops being true, delete it.

## Do / Don't

- **Do not start the dev server.** Always already running. Never run
  `pnpm dev` / `next dev`. Verify with `pnpm build` (SKIP_ENV_VALIDATION=1
  if env is missing) or `pnpm format --check`. No `lint` / `typecheck` /
  `test` script exists — don't invent one; run `pnpm exec tsc --noEmit` if
  you need types.
- **Package manager is `pnpm`, full stop.** No `npm`, no `yarn`, no
  `--legacy-peer-deps`. Dockerfile pins `pnpm@10.0.0` via corepack. If
  `package-lock.json` reappears, delete it.
- **Do not add narration comments.** Ship the code. No "Actually, …" /
  "Wait, …" / "User said …" blocks. Comments explain *why*.
- **Verify UI changes with Playwright, not grep.** Looking at classnames
  doesn't prove the pixel moved. Take a screenshot.
- **Do not delete user-facing UI when refactoring** unless asked. Featured
  blog card, socials, globe, music widget — leave them. Flag, don't cut.
- **No inline/dynamic imports** except the one legit case
  (`react-globe.gl` needs `next/dynamic` because of Three.js SSR). Every-
  thing else: top-level `import`.
- **No raw `console.log`.** Error handlers may keep `console.error`
  (`src/server/spotify.ts`, `src/app/api/trpc/[trpc]/route.ts`). Debug
  prints get removed in review.

## Stack gotchas

- **NOT on Vercel.** Deploys as Docker image (`ghcr.io/davidilie/...`) via
  `.github/workflows/deploy.yaml` on push to `version6`. Module-level
  singletons / long-lived work are fine — do not apply Functions limits
  (cold starts, 10s caps, edge runtime quirks).
- **Main branch is `version6`, not `main`.** Pushing to `version6`
  triggers the GHCR build + deploy.
- **Node 22 in the Dockerfile.** Don't downgrade. Prisma needs it.
- **Prisma stays on v6.** User rejected v7's API. Do not upgrade.
- **Middleware is `src/proxy.ts`** (Next 16 renamed `middleware.ts` →
  `proxy.ts`). Don't recreate `middleware.ts`.
- **Content pipeline is `velite`** (`velite.config.ts`), not contentlayer.
  Build hook lives in `next.config.mjs` — if you touch config, preserve
  the `VELITE_STARTED` guard or dev/build breaks.
- **`next.config.mjs`, not `.ts`.** Dockerfile copies `.mjs` explicitly.
- **Import alias is `~/*`** (see `tsconfig.json`). Never `@/*`.
- **Two data layers:** Postgres via Prisma (`prisma/schema.prisma` — Post
  views, GitHubProject, YouTubeStatistic, CachedSpotifyStats) and tRPC
  (`src/server/api/router/*`). When debugging state, check both.
- **`export const dynamic = "force-dynamic"` on the root layout.** Pages
  are not statically rendered by default. Don't add `generateStaticParams`
  without checking downstream.
- **`next.config` image hosts** already cover
  `user-images.githubusercontent.com`, `github.com`, `i.scdn.co`,
  `cdn.discordapp.com`, `lh3.googleusercontent.com`. New remote image
  sources must be added to `remotePatterns`.
- **Cron routes:** `src/app/api/cron/github/route.ts` and
  `src/app/api/cron/statistics/route.ts` are called by `.github/workflows/
  *_cron.yaml` with `GITHUB_JOB_SECRET` / `STATISTICS_JOB_SECRET` auth.
  Don't remove the auth check.

## Design tokens / UI

- **Tokens live in `src/app/globals.css`** (Tailwind v4 `@theme inline`).
  Use semantic classes: `bg-background`, `text-foreground`, `bg-muted`,
  `text-muted-foreground`, `text-brand`, `bg-brand`, `border-border`.
  **Never hardcode** `bg-blue-*` / `text-gray-*` / `bg-zinc-*` / `dark:`
  prefixes — dark mode is a token swap on `.dark`.
- **Exceptions** (intentional brand colors): `bg-black` for Next.js logo,
  `bg-indigo-600` for Prisma, `text-green-500` for checkmarks. Leave.
- **Do not change the `--brand` HSL values.** Blue is the brand.
- **`src/components/bad-tailwind.tsx` is a Tailwind v4 safelist.** Looks
  like dead code — it's not. MDX pulls those classes dynamically. Do not
  delete.
- **Fonts:** `--font-figtree` (sans, body) and `--font-bricolage` (display,
  `h1/h2/h3`). Don't add a third without asking.
- **Shadcn primitives live in `src/components/ui/`** (`button`,
  `dropdown-menu`, `tooltip`, `icons`). Reach for them first. If you need
  `Card` / `Skeleton` / `Badge`, install via `pnpm dlx shadcn@latest add`.
- **Code blocks** are rehype-pretty-code styled as a macOS window
  (`figure[data-rehype-pretty-code-figure]::before` in globals.css). Any
  code-block restyle goes through that selector.

## UI work — skill chain

- For non-trivial UI (hero, nav, landing, interactive demos), invoke the
  `impeccable` **and** `emil-design-eng` skills before shipping. Motion
  uses Emil's `[0.23, 1, 0.32, 1]` ease-out; don't invent bezier curves.
- For marketing / landing / pSEO copy, pipe through `marclou` then
  `humanizer` (in that order). Every user-facing sentence.
- **Design brief is `.impeccable.md`.** Boldness 6–7, dark-first,
  craft-over-convention. Read it before big redesigns.
- **Reference repo for structure / patterns:** `~/dev/zerocut` (same
  author, same deploy model, more mature token system).

## Git / pushing

- **When user says `push` / `pushh` / `Push`**: push EVERYTHING. Not just
  the current-session diff. Investigate untracked / unstaged files from
  prior sessions, group into separate logical commits with real messages,
  then push to `version6`.
- **Never commit** the `.playwright-mcp/` dir or root-level research PNGs
  (`leerob_*.png`, `theo_*.png`). `.gitignore` covers them — keep it that
  way.
- **Never force-push `version6`** without explicit ask. It's prod.

## Self-correction

If something surprises you, confuses you, or seems contradictory — **tell
the user before proceeding**, and (if it's a recurring trap) propose an
addition to this file. Goal: keep this file short. Each rule here exists
because the agent got it wrong before.
