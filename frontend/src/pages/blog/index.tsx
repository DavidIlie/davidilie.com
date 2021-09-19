import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getAllFilesFrontMatter } from "@lib/mdx";
import {
    AiOutlineSearch,
    AiOutlineArrowUp,
    AiOutlineArrowDown,
} from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

import BlogPost from "@components/BlogPost";
import Tooltip from "@ui/Tooltip";

function Blog({ posts }: { posts: any }): JSX.Element {
    const [filter, setFilter] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [pageWidth, setPageWidth] = useState<number>(0);

    useEffect(() => {
        setPageWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth);
        });
    }, [pageWidth]);

    const filteredBlogPosts = posts.filter(
        (frontMatter: any) =>
            frontMatter.title.toLowerCase().includes(filter) &&
            (frontMatter.published || process.env.NODE_ENV === "development")
    );

    filteredBlogPosts.reverse();

    return (
        <>
            <NextSeo title="Blog" />
            {pageWidth >= 900 && (
                <div className="z-50 bottom-0 right-0 fixed mr-24">
                    <h1
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer inline-flex items-center gap-2 duration-200 text-section p-2 px-4 rounded-t-xl bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900 hover:bg-blue-400 text-blue-900 dark:text-blue-100"
                    >
                        Did you know
                        {open ? (
                            <AiOutlineArrowDown className="mt-1" />
                        ) : (
                            <AiOutlineArrowUp className="mt-1" />
                        )}
                    </h1>
                    {open && (
                        <div
                            className="bg-gray-800 p-2 py-4"
                            style={{ maxWidth: "11.5rem" }}
                        >
                            <h1 className="text-blue-200">
                                The blog page can also be accessed from{" "}
                                <a
                                    href="https://thedavidones.live"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="duration-200 text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                                >
                                    thedavidones.live
                                </a>
                                !
                            </h1>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col pt-28 pb-10 px-2 w-full min-h-screen mx-auto max-w-4xl text-black dark:text-white">
                <Fade direction="up" triggerOnce cascade>
                    <h1 className="text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-bold header-gradient">
                        The David Ones
                    </h1>
                    <p className="text-center text-section mb-5 px-12">
                        I&apos;ve been writing blog posts since 2020, mostly
                        about my random technologic encounters during my
                        day-to-day life. Currently there are {posts.length} blog
                        post
                        {posts.length > 1 && "s"}.
                    </p>
                </Fade>
                <Fade direction="up" delay={750} triggerOnce>
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
                {filteredBlogPosts.map((frontMatter: any, index: number) => {
                    const featured = index === 0;

                    if (featured) {
                        return (
                            <Fade
                                direction="up"
                                key={frontMatter.title}
                                triggerOnce
                            >
                                <BlogPost {...frontMatter} featured />
                            </Fade>
                        );
                    } else {
                        return (
                            <Fade
                                direction="up"
                                key={frontMatter.title}
                                triggerOnce
                            >
                                <div className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-2 md:px-4">
                                    <BlogPost
                                        {...frontMatter}
                                        feature={false}
                                    />
                                </div>
                            </Fade>
                        );
                    }
                })}
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter();
    return { props: { posts } };
};

export default Blog;
