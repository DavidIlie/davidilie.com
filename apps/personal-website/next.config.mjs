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
            hostname: "github-readme-stats.vercel.app",
         },
      ],
   },
   experimental: {
      serverActions: true,
   },
   transpilePackages: ["ui", "tailwind"],
   output: "standalone",
   webpack: (config) => {
      config.infrastructureLogging = {
         level: "error",
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return config;
   },
};

export default withContentlayer(nextConfig);
