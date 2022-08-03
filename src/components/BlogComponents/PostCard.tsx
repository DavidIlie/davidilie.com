import React from "react";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";
import formatDistance from "date-fns/formatDistance";

import { MDXProps } from "@/lib/mdx";
import { trpc } from "@/lib/trpc";
import { shimmer } from "@/lib/shimmer";
import Tags from "./Tags";

const PostCard: React.FC<MDXProps & { featured: boolean }> = ({
   title,
   summary,
   slug,
   tags,
   publishedAt,
   image,
   featured,
}) => {
   const { data } = trpc.useQuery(["blog.getStats", { slug }]);
   const { width } = useViewportSize();

   return (featured && width >= 530) || (featured && width >= 500) ? (
      <Link href={`/blog/${slug}`} passHref>
         <div className="duration-200 hoverItem">
            <article
               className={`${
                  featured && "mt-11 rounded-tl-sm"
               } mx-3 cursor-pointer bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl flex justify-center gap-4 transform flex-wrap md:flex-nowrap mb-4 md:px-3 md:py-2`}
            >
               <h1 className="z-10 absolute -top-9 -left-0.5 bg-blue-300 dark:bg-blue-600 text-blue-900 dark:text-blue-100 dark:bg-opacity-50 py-1 px-4 rounded-t font-semibold border-2 border-blue-200 dark:border-blue-700 ">
                  Featured Post
               </h1>
               <Image
                  alt="Post picture"
                  className="rounded shadow-xl"
                  src={image}
                  width={1905 / 2}
                  height={957 / 2}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  objectFit="cover"
               />
               <div className="py-1 md:max-w-sm md:px-0">
                  {tags &&
                     tags.map((tag, i) => (
                        <Tags tag={tag} key={i.toString()} />
                     ))}
                  <h1 className="mt-1 mb-1 font-semibold xl:text-2xl md:text-2xl text-section">
                     {title}
                  </h1>
                  <p className="text-gray-800 dark:text-gray-300">{summary}</p>
                  <div className="flex items-center">
                     <span className="flex items-center justify-center py-2 text-xs leading-none rounded-md">
                        <Image
                           className="rounded-full"
                           src="/static/me.png"
                           width="30px"
                           height="30px"
                           blurDataURL={shimmer(1920, 1080)}
                           alt={`David's profile image`}
                        />
                        <div className="ml-2">
                           <span className="text-sm text-gray-700 dark:text-gray-300">
                              David Ilie
                           </span>
                           <h1 className="text-gray-800 dark:text-gray-400 mt-0.5">
                              {formatDistance(
                                 new Date(publishedAt),
                                 new Date(),
                                 {
                                    addSuffix: true,
                                 }
                              )}{" "}
                              {" • "}{" "}
                              {`${data?.views ? data?.views : "0"} view${
                                 data?.views !== 1 ? "s" : ""
                              }`}
                           </h1>
                        </div>
                     </span>
                  </div>
               </div>
            </article>
         </div>
      </Link>
   ) : (
      <Link href={`/blog/${slug}`} passHref>
         <a className="duration-200 hoverItem">
            <div className="mb-3 duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 hoverItem">
               <div className="md:flex-shrink-0">
                  <Image
                     src={image}
                     alt="Post picture"
                     width="500px"
                     height="300px"
                     blurDataURL={shimmer(1920, 1080)}
                     placeholder="blur"
                     className="object-cover rounded-lg rounded-b-none"
                  />
               </div>
               <div className="px-4 py-2 -mt-1.5 border-t-2 border-gray-700">
                  <h2 className="text-2xl font-semibold tracking-normal line-clamp-2 h-16">
                     {title}
                  </h2>
                  <p className="mt-2 mb-3 text-gray-800 text-md dark:text-gray-200 line-clamp-4">
                     {summary}
                  </p>
                  {tags &&
                     tags.map((tag, i) => (
                        <Tags tag={tag} key={i.toString()} />
                     ))}
                  <div className="flex items-center mt-1 mb-1 mr-1">
                     <span className="text-gray-800 text-md dark:text-gray-200">
                        {formatDistance(new Date(publishedAt), new Date(), {
                           addSuffix: true,
                        })}{" "}
                        {" • "}{" "}
                        {`${data?.views ? data?.views : "0"} view${
                           data?.views !== 1 ? "s" : ""
                        }`}
                        {" • "}
                        {`${data?.comments ? data?.comments : "0"} comment${
                           data?.comments !== 1 ? "s" : ""
                        }`}
                     </span>
                  </div>
               </div>
            </div>
         </a>
      </Link>
   );
};

export default PostCard;
