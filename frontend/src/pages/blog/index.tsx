import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getAllFilesFrontMatter } from "@lib/mdx";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

import BlogPost from "@components/BlogPost";
import Tooltip from "@ui/Tooltip";

function Blog({ posts }: { posts: any }): JSX.Element {
    const [filter, setFilter] = useState<string>("");

    const filteredBlogPosts = posts.filter((frontMatter: any) =>
        frontMatter.title.toLowerCase().includes(filter)
    );

    return (
        <>
            <NextSeo title="Blog" />
            <div className="flex flex-col pt-28 px-2 w-full min-h-screen mx-auto max-w-4xl text-black dark:text-white">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Blog Posts
                    </h1>
                    <p className="text-section mb-5 px-5 text-center">
                        Here are a collection of my blog posts, with{" "}
                        {posts.length} post
                        {posts.length > 1 && "s"}.
                    </p>
                </Fade>
                <Fade direction="up" delay={750}>
                    <div className="mb-3 xl:w-1/3 md:w-1/3 w-1/2 ml-2">
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
                {filteredBlogPosts.map((frontMatter: any) => (
                    <Fade direction="up" key={frontMatter.title}>
                        <BlogPost {...frontMatter} />
                    </Fade>
                ))}
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter();
    return { props: { posts } };
};

export default Blog;
