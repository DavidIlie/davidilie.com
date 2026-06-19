import "./src/env.mjs";

// Build velite content (works with Turbopack).
// Next 16 no longer puts the "dev" verb in `process.argv` for the long-lived
// dev server, so the old `process.argv.includes("dev")` check was always false
// and the watcher never started — content edits never regenerated `.velite`.
// The reliable signal in Next 16 is `NODE_ENV` (development on `next dev`,
// production on `next build`/`next start`). `build` stays argv-based so a plain
// `next start` doesn't trigger an unnecessary rebuild of already-built content.
const isDev = process.env.NODE_ENV === "development";
const isBuild = process.argv.includes("build");
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
   process.env.VELITE_STARTED = "1";
   const { build } = await import("velite");
   await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
      return [
         {
            source: "/js/script.js",
            destination: `https://plausible.davidapps.dev/js/script.outbound-links.js`,
         },
      ];
   },
   images: {
      localPatterns: [
         {
            pathname: "/**",
         },
      ],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "user-images.githubusercontent.com",
         },
         {
            protocol: "https",
            hostname: "github.com",
         },
         {
            protocol: "https",
            hostname: "i.scdn.co",
         },
         {
            protocol: "https",
            hostname: "cdn.discordapp.com",
         },
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
         },
      ],
   },
   output: "standalone",
};

export default nextConfig;
