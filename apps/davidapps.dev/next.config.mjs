/** @type {import('next').NextConfig} */
const nextConfig = {
   transpilePackages: ["ui", "tailwind"],
   output: "standalone",
};

export default nextConfig;
