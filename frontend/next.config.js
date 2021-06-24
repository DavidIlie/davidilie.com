const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    images: {
        domains: [
            "i.scdn.co",
            "user-images.githubusercontent.com",
            "camo.githubusercontent.com",
            "github.com",
        ],
    },
});
