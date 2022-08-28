const { withPlausibleProxy } = require("next-plausible");
const withMDX = require("@next/mdx")({
   extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: [
         "lh3.googleusercontent.com",
         "avatars.githubusercontent.com",
         "cdn.discordapp.com",
         "user-images.githubusercontent.com",
         "i.scdn.co",
      ],
   },
   experimental: {
      outputStandalone: true,
      concurrentFeatures: true,
   },
};

module.exports = withPlausibleProxy(withMDX)(nextConfig);
