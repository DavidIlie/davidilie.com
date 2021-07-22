import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getAllFilesFrontMatter } from "@lib/mdx";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

import BlogPost from "@components/BlogPost";

function Blog({ posts }: { posts: any }): JSX.Element {
    const [filter, setFilter] = useState("");

    const filteredBlogPosts = posts.filter((frontMatter: any) =>
        frontMatter.title.toLowerCase().includes(filter)
    );

    return (
        <>
            <NextSeo title="Blog" />
            <div className="flex flex-col items-center pt-28 w-full min-h-screen mx-auto max-w-3xl text-white">
                <Fade duration={750} direction="up" triggerOnce cascade>
                    <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        Blog Posts
                    </h1>
                    <p className="text-section mt-2 mb-5 px-5 text-center">
                        Here are a collection of my blog posts, with{" "}
                        {posts.length} post
                        {posts.length > 1 && "s"}.
                    </p>
                    <div className="mb-5 w-72">
                        <span className="z-10 mt-1 h-full leading-snug font-normal absolute bg-transparent text-base pl-3 py-3">
                            <AiOutlineSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) =>
                                setFilter(e.target.value.toLowerCase())
                            }
                            className="px-10 py-3 placeholder-gray-300 relative bg-gray-800 border-gray-700 rounded-xl text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                        />
                    </div>
                </Fade>
                {filteredBlogPosts.length === 0 && (
                    <Fade>
                        <h1 className="text-center text-3xl font-semibold">
                            No Results
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
