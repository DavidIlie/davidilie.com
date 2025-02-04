import { withContentlayer } from "next-contentlayer";
import { withPlausibleProxy } from "next-plausible";

import "./src/env.mjs";

const PLAUSIBLE_DOMAIN = "https://plausible.davidhome.ro";

/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
      return [
         {
            source: "/js/script.js",
            destination: `${PLAUSIBLE_DOMAIN}/js/script.outbound-links.js`,
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

export default withContentlayer(
   withPlausibleProxy({
      customDomain: `${PLAUSIBLE_DOMAIN}`,
   })(nextConfig),
);
