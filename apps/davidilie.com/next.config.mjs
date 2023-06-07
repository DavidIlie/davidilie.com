/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverActions: true,
   },
   transpilePackages: ["ui", "tailwind"],
   output: "standalone",
};

export default nextConfig;
