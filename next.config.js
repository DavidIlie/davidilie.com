const { withPlausibleProxy } = require("next-plausible");

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
   output: "standalone",
};

module.exports = withPlausibleProxy({
   customDomain: "https://plausible.davidapps.dev",
})(nextConfig);
