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
      ],
   },
   experimental: {
      serverActions: true,
   },
   transpilePackages: ["ui", "tailwind"],
   output: "standalone",
};

export default nextConfig;
