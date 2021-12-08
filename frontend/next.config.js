const withPlugins = require("next-compose-plugins");

const { withPlausibleProxy } = require("next-plausible");
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
});

const nextConfig = {
    images: {
        domains: [
            "i.scdn.co",
            "user-images.githubusercontent.com",
            "camo.githubusercontent.com",
            "github.com",
            "lh3.googleusercontent.com",
            "cdn.discordapp.com",
            "rdl.ink",
            "s3.davidapps.dev",
        ],
    },
    rewrites: async () => [
        {
            source: "/sitemap.xml",
            destination: "/api/sitemap",
        },
    ],
    swcMinify: true,
};

module.exports = withPlugins([withPlausibleProxy, withMDX, nextConfig]);
