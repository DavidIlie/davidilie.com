import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { shimmer } from "@lib/shimmer";
import { useQuery } from "react-query";
import formatDistance from "date-fns/formatDistance";
import BlogBadge from "@components/BlogBadge";

interface BlogPostProps {
    title: string;
    summary: string;
    slug: string;
    tags: [string];
    publishedAt: string;
    image: string;
    by: {
        avatar: string;
        name: string;
    };
    featured: boolean;
}

export const BlogPost = ({
    title,
    summary,
    slug,
    tags,
    publishedAt,
    image,
    by,
    featured,
}: BlogPostProps): JSX.Element => {
    const { data } = useQuery(`stats${slug}`, () => {
        return fetch(`/api/blog/get/${slug}`).then((res) => res.json());
    });
    const views = data?.views;
    const comments = data?.commentCount;

    const [pageWidth, setPageWidth] = useState<number>(0);

    useEffect(() => {
        setPageWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth);
        });
    }, [pageWidth]);

    if ((featured && pageWidth >= 550) || (featured && pageWidth >= 550)) {
        return (
            <Link href={`/blog/${slug}`} passHref>
                <div className="hoverItem duration-200">
                    <article
                        className={`${
                            featured && "mt-11 rounded-tl-sm"
                        } mx-3 cursor-pointer bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl flex justify-center gap-4 transform flex-wrap md:flex-nowrap mb-4 md:px-3 md:py-2`}
                    >
                        <h1
                            className="z-10 absolute -top-9 -left-0.5 bg-blue-300 dark:bg-blue-600 text-blue-900 dark:text-blue-100 dark:bg-opacity-50 py-1 px-4 rounded-t font-semibold"
                            style={{
                                border: "2px solid rgba(29, 78, 216, var(--tw-border-opacity)",
                            }}
                        >
                            Featured Post
                        </h1>
                        <Image
                            alt="Post picture"
                            className="shadow-xl rounded"
                            src={image}
                            width={1905 / 2}
                            height={957 / 2}
                            blurDataURL={shimmer(1920, 1080)}
                            placeholder="blur"
                            objectFit="cover"
                        />
                        <div className="md:max-w-sm md:px-0 py-1">
                            {tags &&
                                tags.map((tag, i) => (
                                    <BlogBadge tag={tag} key={i.toString()} />
                                ))}
                            <h1 className="xl:text-2xl md:text-2xl text-section font-semibold mt-1 mb-1">
                                {title}
                            </h1>
                            <p className="text-gray-800 dark:text-gray-300">
                                {summary}
                            </p>
                            <div className="flex items-center">
                                <span className="flex items-center justify-center py-2 text-xs leading-none rounded-md">
                                    <Image
                                        className="rounded-full"
                                        src={by.avatar}
                                        width="30px"
                                        height="30px"
                                        blurDataURL={shimmer(1920, 1080)}
                                        alt={`${by}'s profile image`}
                                    />
                                    <div className="ml-2">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {by.name}
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
                                            {`${views ? views : "0"} view${
                                                views !== 1 ? "s" : ""
                                            }`}
                                        </h1>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </Link>
        );
    } else {
        return (
            <Link href={`/blog/${slug}`} passHref>
                <a className="hoverItem duration-200">
                    <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-2xl rounded-lg mb-6">
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
                            <h2 className="font-semibold text-2xl tracking-normal">
                                {title}
                            </h2>
                            <p className="text-md mt-2 mb-3 text-gray-800 dark:text-gray-200 truncate-2-lines">
                                {summary}
                            </p>
                            {tags &&
                                tags.map((tag, i) => (
                                    <BlogBadge tag={tag} key={i.toString()} />
                                ))}
                            <div className="flex items-center mr-1 mt-1 mb-1">
                                <span className="text-md text-gray-800 dark:text-gray-200">
                                    {formatDistance(
                                        new Date(publishedAt),
                                        new Date(),
                                        {
                                            addSuffix: true,
                                        }
                                    )}{" "}
                                    {" • "}{" "}
                                    {`${views ? views : "0"} view${
                                        views !== 1 ? "s" : ""
                                    }`}
                                    {" • "}
                                    {`${comments ? comments : "0"} comment${
                                        comments !== 1 ? "s" : ""
                                    }`}
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
};
