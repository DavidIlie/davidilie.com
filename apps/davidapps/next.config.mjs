/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "github.com",
         },
      ],
   },
   transpilePackages: ["ui", "tailwind"],
   output: "standalone",
};

export default nextConfig;
