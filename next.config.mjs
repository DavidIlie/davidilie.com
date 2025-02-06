import { withContentlayer } from "next-contentlayer";

import "./src/env.mjs";

const PLAUSIBLE_DOMAIN = "https://plausible.davidapps.dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
      return [
         {
            source: "/js/script.js",
            destination: `${PLAUSIBLE_DOMAIN}/js/script.js`,
         },
         {
            source: "/api/event",
            destination: `${PLAUSIBLE_DOMAIN}/api/event`,
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
   webpack: (config) => {
      config.infrastructureLogging = {
         level: "error",
      };
      return config;
   },
   output: "standalone",
};

export default withContentlayer(nextConfig);
