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
import { shimmer } from "@lib/shimmer";

interface BlogLayoutProps {
    children: React.ReactElement;
    frontMatter: {
        by: {
            avatar: string;
            name: string;
        };
        image: string;
        imageDimensions: {
            height: number;
            width: number;
        };
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
        published: boolean;
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
                canonical={`https://davidilie.com/${router.asPath}`}
                twitter={{
                    cardType: "summary_large_image",
                    site: "@AlbastruYT",
                }}
                openGraph={{
                    title: frontMatter.title,
                    site_name: "David Ilie",
                    description: frontMatter.summary,
                    url: `https://davidilie.com/${router.asPath}`,
                    type: "article",
                    article: {
                        publishedTime: new Date(
                            frontMatter.publishedAt
                        ).toISOString(),
                    },
                    images: [
                        {
                            url: frontMatter.image,
                        },
                    ],
                }}
            />
            <article className="flex flex-col justify-start w-full max-w-3xl min-h-screen mx-auto text-black dark:text-white pt-28">
                {frontMatter.tags && (
                    <div className="flex flex-wrap justify-start w-full px-3 mb-4">
                        {frontMatter.tags.map((tag, i) => (
                            <BlogBadge tag={tag} key={i.toString()} />
                        ))}
                    </div>
                )}
                <h1 className="px-4 text-4xl font-semibold 2xl:text-5xl xl:text-5xl md:text-5xl lg:text-5xl">
                    {frontMatter.title}
                </h1>
                <div className="flex flex-wrap items-center justify-between w-full max-w-3xl px-3 mx-auto mt-5 mb-6">
                    <div className="flex items-center">
                        <span className="inline-flex items-center justify-center py-2 text-xs font-bold leading-none rounded-md">
                            <Image
                                className="rounded-full"
                                src={frontMatter.by.avatar}
                                width="25px"
                                height="25px"
                                blurDataURL={shimmer(1920, 1080)}
                                alt={`${frontMatter.by}'s profile image`}
                            />
                            <span className="ml-1 mr-1 text-lg header-gradient">
                                {frontMatter.by.name}
                            </span>
                        </span>
                        <h1 className="text-gray-800 dark:text-gray-300">
                            {" / "}
                            {format(
                                parseISO(frontMatter.publishedAt),
                                "MMMM dd, yyyy"
                            )}
                        </h1>
                    </div>
                    <h1>
                        {frontMatter.wordCount.toLocaleString() + " words"}
                        {` • `}
                        {frontMatter.readingTime?.text}
                        {` • `}
                        <BlogViewCounter slug={frontMatter.slug} />
                    </h1>
                </div>
                <div className="mx-auto">
                    <Image
                        alt="Post picture"
                        className="shadow-xl rounded-xl"
                        src={frontMatter.image}
                        width={frontMatter.imageDimensions.width / 2}
                        height={frontMatter.imageDimensions.height / 2}
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                    />
                </div>

                <div className="w-full max-w-5xl px-2 mt-3 mb-10 blog-content">
                    {children}
                </div>
                <div className="flex items-center justify-end gap-1 px-3 pb-3">
                    <RiEditBoxLine className="mt-0.5" />
                    <a
                        className="text-lg font-semibold text-blue-600 duration-200 hover:text-blue-700"
                        href={getGitHubEditURL(frontMatter.slug)}
                    >
                        Edit on GitHub
                    </a>
                </div>
                <div className="p-3">
                    <BlogInteractions
                        refetch={refetch}
                        slug={frontMatter.slug}
                    />
                    <BlogComments refetch={refetch} comments={comments} />
                    <div className="flex justify-center">
                        <BarLoader
                            color="#60A5FA"
                            width="42rem"
                            loading={isLoading}
                        />
                    </div>
                </div>
            </article>
        </>
    );
};
