import React from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import BarLoader from "react-spinners/BarLoader";
import { RiEditBoxLine } from "react-icons/ri";

import BlogBadge from "@components/BlogBadge";
import BlogViewCounter from "@components/BlogViewCounter";
import BlogInteractions from "@components/BlogInteractions";
import BlogComments from "@components/BlogComments";

import { getGitHubEditURL } from "@lib/getGitHubEditUrl";

interface BlogLayoutProps {
    children: React.ReactElement;
    frontMatter: {
        by: {
            avatar: string;
            name: string;
        };
        image: string;
        publishedAt: string;
        readingTime: {
            minutes: number;
            text: string;
            time: number;
        };
        slug: string;
        summary: string;
        tags: [string];
        title: string;
        wordCount: number;
    };
}

export const BlogLayout = ({
    children,
    frontMatter,
}: BlogLayoutProps): JSX.Element => {
    const router = useRouter();

    const { isLoading, data, refetch } = useQuery(
        `stats${frontMatter.slug}`,
        () => {
            return fetch(`/api/blog/get/${frontMatter.slug}`).then((res) =>
                res.json()
            );
        }
    );

    const comments = data?.comments;

    return (
        <>
            <NextSeo
                title={frontMatter.title}
                description={frontMatter.summary}
                canonical={`${process.env.NEXT_PUBLIC_HOST}${router.asPath}`}
                twitter={{
                    cardType: "summary_large_image",
                    site: "@AlbastruYT",
                }}
                openGraph={{
                    title: frontMatter.title,
                    site_name: "David Ilie",
                    description: frontMatter.summary,
                    url: `${process.env.NEXT_PUBLIC_HOST}${router.asPath}`,
                    type: "article",
                    article: {
                        publishedTime: new Date(
                            frontMatter.publishedAt
                        ).toISOString(),
                    },
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_HOST}${frontMatter.image}`,
                        },
                    ],
                }}
            />
            <article className="text-white flex flex-col justify-start pt-28 w-full min-h-screen mx-auto max-w-2xl">
                {frontMatter.tags && (
                    <div className="flex w-full px-3 mb-4 justify-start flex-wrap">
                        {frontMatter.tags.map((tag, i) => (
                            <BlogBadge tag={tag} key={i.toString()} />
                        ))}
                    </div>
                )}
                <h1 className="2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl text-4xl font-semibold px-4">
                    {frontMatter.title}
                </h1>
                <div className="flex flex-row justify-between items-center max-w-2xl mx-auto mb-12 px-3 mt-5 w-full">
                    <div className="flex items-center">
                        <span className="ml-2 inline-flex items-center justify-center py-2 text-xs font-bold leading-none rounded-md">
                            <Image
                                className="rounded-full"
                                src={frontMatter.by.avatar}
                                width="25px"
                                height="25px"
                            />
                            <span className="ml-1 header-gradient text-lg mr-1">
                                {frontMatter.by.name}
                            </span>
                        </span>
                        <h1 className="text-gray-300">
                            {" / "}
                            {format(
                                parseISO(frontMatter.publishedAt),
                                "MMMM dd, yyyy"
                            )}
                        </h1>
                    </div>
                    <h1>
                        {frontMatter.readingTime?.text}
                        {` • `}
                        <BlogViewCounter slug={frontMatter.slug} />
                    </h1>
                </div>
                <Image
                    alt="Post picture"
                    className="rounded-2xl"
                    src={frontMatter.image}
                    width={1905 / 2}
                    height={957 / 2}
                    blurDataURL={
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                    }
                    placeholder="blur"
                />
                <div className="mb-10 px-2 max-w-4xl w-full blog-content">
                    {children}
                </div>
                <a
                    className="px-3 pb-3 text-lg text-blue-600 duration-200 hover:text-blue-700 font-semibold"
                    href={getGitHubEditURL(frontMatter.slug)}
                >
                    Edit on GitHub
                </a>
                <div className="p-3">
                    <BlogInteractions
                        refetch={refetch}
                        slug={frontMatter.slug}
                    />
                    <div className="flex justify-center">
                        <BarLoader
                            color="#60A5FA"
                            width="42rem"
                            loading={isLoading}
                        />
                    </div>
                    <BlogComments refetch={refetch} comments={comments} />
                </div>
            </article>
        </>
    );
};
