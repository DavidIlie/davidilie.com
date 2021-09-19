import { getAllFilesFrontMatter, MDXProps } from "@lib/mdx";
import fs from "fs";
import { Feed } from "feed";

export const generateRssFeed = async () => {
    const posts = (await getAllFilesFrontMatter()) as MDXProps[];
    const siteURL = "https://davidilie.com";
    const date = new Date();
    const author = {
        name: "David Ilie",
        email: "david@davidilie.com",
        link: "https://davidilie.com",
    };

    const filteredBlogPosts = posts
        .sort((a: any, b: any) => {
            return (
                new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime()
            );
        })
        .reverse();

    const feed = new Feed({
        title: "The David Ones",
        description:
            "A 15 year old aspiring web developer experimenting with programming by publishing my work on the web.",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/images/png/me.png`,
        favicon: `${siteURL}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, David Ilie Apps Platform`,
        updated: new Date(posts[0].publishedAt),
        generator: "https://github.com/davidilie/davidilie.com",
        feedLinks: {
            rss2: `${siteURL}/rss.xml`,
            json: `${siteURL}/rss.json`,
            atom: `${siteURL}/atom.xml`,
        },
        author,
    });

    filteredBlogPosts.forEach((post) => {
        const url = `${siteURL}/blog/${post.slug}`;

        let tags = post.tags.join(", ");

        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.summary,
            content: tags,
            image: post.image,
            author: [author],
            contributor: [author],
            date: new Date(post.publishedAt),
        });
    });

    fs.mkdirSync("./public", { recursive: true });
    fs.writeFileSync("./public/rss.xml", feed.rss2());
    fs.writeFileSync("./public/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss.json", feed.json1());
};
