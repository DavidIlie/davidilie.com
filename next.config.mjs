import "./src/env.mjs";

// Build velite content (works with Turbopack)
const isDev = process.argv.includes("dev");
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
