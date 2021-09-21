import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getAllFilesFrontMatter } from "@lib/mdx";
import { AiOutlineSearch } from "react-icons/ai";
import { FiRss } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

import BlogPost from "@components/BlogPost";
import Tooltip from "@ui/Tooltip";
import LinkButton from "@components/LinkButton";

import { generateRssFeed } from "@lib/generateRssFeed";

function Blog({ posts }: { posts: any }): JSX.Element {
    const [filter, setFilter] = useState<string>("");

    const filteredBlogPosts = posts
        .filter(
            (frontMatter: any) =>
                frontMatter.title.toLowerCase().includes(filter) &&
                (frontMatter.published ||
                    process.env.NODE_ENV === "development")
        )
        .sort((a: any, b: any) => {
            return (
                new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime()
            );
        })
        .reverse();

    return (
        <>
            <NextSeo title="Blog" />
            <div className="flex flex-col pt-28 pb-10 px-2 w-full min-h-screen mx-auto max-w-4xl text-black dark:text-white">
                <Fade direction="up" triggerOnce>
                    <h1 className="text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        The David Ones
                    </h1>
                    <p className="text-center md:text-section md:px-12 px-6">
                        I&apos;ve been writing blog posts since 2020, mostly
                        about my random technologic encounters during my
                        day-to-day life. Currently there are {posts.length} blog
                        post
                        {posts.length > 1 && "s"}.
                    </p>
                    <div className="flex justify-center my-3 mb-4">
                        <LinkButton
                            link="/rss.xml"
                            Icon={FiRss}
                            text="Subscribe via RSS"
                        />
                    </div>
                    <div className="mb-6 px-3">
                        <div>
                            {filter === "" ? (
                                <span className="z-10 mt-1 h-full leading-snug font-normal absolute bg-transparent text-base pl-3 py-3">
                                    <AiOutlineSearch />
                                </span>
                            ) : (
                                <Tooltip content="Clear search">
                                    <span
                                        className="z-10 mt-1 h-full leading-snug font-normal absolute bg-transparent text-base pl-3 py-2.5"
                                        onClick={() => setFilter("")}
                                    >
                                        <MdClear className="text-xl" />
                                    </span>
                                </Tooltip>
                            )}
                            <input
                                type="text"
                                placeholder="Search"
                                value={filter}
                                onChange={(e) =>
                                    setFilter(e.target.value.toLowerCase())
                                }
                                className="px-10 py-3 placeholder-gray-600 dark:placeholder-gray-100 relative bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-2 border-gray-200 dark:border-gray-700 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                            />
                        </div>
                    </div>
                </Fade>
                {filteredBlogPosts.length === 0 && (
                    <Fade>
                        <h1 className="text-center text-3xl font-semibold">
                            No Results :(
                        </h1>
                    </Fade>
                )}

                {filteredBlogPosts[0] && (
                    <Fade direction="up" triggerOnce>
                        <BlogPost {...filteredBlogPosts[0]} featured />
                    </Fade>
                )}

                <Fade direction="up" triggerOnce cascade>
                    <div className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-2 md:px-4">
                        {filteredBlogPosts.map(
                            (frontMatter: any, index: number) => {
                                const featured = index === 0;
                                if (!featured) {
                                    return (
                                        <BlogPost
                                            key={index}
                                            {...frontMatter}
                                            feature={false}
                                        />
                                    );
                                }
                            }
                        )}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    await generateRssFeed();

    const posts = await getAllFilesFrontMatter();
    return { props: { posts } };
};

export default Blog;
