import { NextApiRequest, NextApiResponse } from "next";

import { createGzip } from "zlib";
import { SitemapStream } from "sitemap";

import { getAllFilesFrontMatter, MDXProps } from "@lib/mdx";

const STATIC_URLS = [
    "https://davidilie.com",
    "https://davidilie.com/blog",
    "https://davidilie.com/gear",
    "https://davidilie.com/music",
    "https://davidilie.com/tools",
    "https://davidilie.com/links",
];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Content-Encoding", "gzip");

    const userGenPageUrls = await getAllFilesFrontMatter();

    const sitemapStream = new SitemapStream();
    const pipeline = sitemapStream.pipe(createGzip());

    STATIC_URLS.forEach((url) => {
        sitemapStream.write({ url });
    });

    userGenPageUrls.forEach((page: MDXProps) => {
        sitemapStream.write({ url: `https://davidilie.com/blog/${page.slug}` });
    });

    sitemapStream.end();

    pipeline.pipe(res).on("error", (err) => {
        throw err;
    });
}
