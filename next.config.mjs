import { withContentlayer } from "next-contentlayer";

import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
