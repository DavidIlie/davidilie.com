/* eslint-disable react/no-unescaped-entities */
import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";
import { AiOutlineSearch } from "react-icons/ai";
import { MdClear } from "react-icons/md";

import { generateRssFeed } from "@/lib/generateRssFeed";
import { getAllFilesFrontMatter, MDXProps } from "@/lib/mdx";
import Tooltip from "@/components/Tooltip";
import PostCard from "@/components/BlogComponents/PostCard";

const Blog: NextPage<{ posts: MDXProps[] }> = ({ posts }) => {
   const [filter, setFilter] = useState("");

   const filteredBlogPosts = posts
      .filter(
         (frontMatter: any) =>
            frontMatter.title.toLowerCase().includes(filter) &&
            (frontMatter.published || process.env.NODE_ENV === "development")
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
         <div className="flex items-center justify-center flex-grow py-12 space-y-8 sm:px-6 lg:px-8 lg:space-y-12">
            <div className="container max-w-4xl mx-auto mt-32">
               <Fade direction="up" triggerOnce>
                  <h1 className="text-4xl font-bold text-center 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl header-gradient">
                     The David Ones
                  </h1>
                  <p className="px-6 mt-4 text-center md:text-section md:px-12">
                     I've been writing blog posts since 2020, mostly about my
                     random technologic encounters during my day-to-day life.
                     Currently there are {posts.length} blog post
                     {posts.length > 1 && "s"}.
                  </p>
                  <div className="px-3 mt-4 mb-6">
                     <div>
                        {filter === "" ? (
                           <span className="absolute z-10 h-full py-3 pl-3 mt-1 text-base font-normal leading-snug bg-transparent">
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
                           className="relative w-full px-10 py-3 pr-10 text-sm placeholder-gray-600 bg-gray-100 border-2 border-gray-200 shadow outline-none dark:placeholder-gray-100 dark:bg-gray-800 rounded-xl dark:border-gray-700 focus:outline-none focus:ring"
                        />
                     </div>
                  </div>
               </Fade>
               <div className="mt-16" />
               {filteredBlogPosts.length === 0 && (
                  <Fade>
                     <h1 className="text-3xl font-semibold text-center">
                        No Results :(
                     </h1>
                  </Fade>
               )}
               {filteredBlogPosts[0] && (
                  <Fade direction="up" triggerOnce>
                     <PostCard {...filteredBlogPosts[0]} featured />
                  </Fade>
               )}
               <Fade direction="up" triggerOnce cascade>
                  <div className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2 md:px-4">
                     {filteredBlogPosts.map(
                        (frontMatter: any, index: number) => {
                           const featured = index === 0;
                           if (!featured) {
                              return (
                                 <PostCard
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
         </div>
      </>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   await generateRssFeed();
   const posts = await getAllFilesFrontMatter();
   return { props: { posts } };
};

export default Blog;
