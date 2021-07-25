import Link from "next/link";
import { useQuery } from "react-query";
import formatDistance from "date-fns/formatDistance";
import BlogBadge from "@components/BlogBadge";

interface BlogPostProps {
    title: string;
    summary: string;
    slug: string;
    tags: [string];
    publishedAt: string;
}

export const BlogPost = ({
    title,
    summary,
    slug,
    tags,
    publishedAt,
}: BlogPostProps): JSX.Element => {
    const { data } = useQuery(`stats${slug}`, () => {
        return fetch(`/api/blog/get/${slug}`).then((res) => res.json());
    });
    const views = data?.views;
    const comments = data?.commentCount;

    return (
        <Link href={`/blog/${slug}`} passHref>
            <div
                className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex mb-8 px-5 py-4 flex-col hoverItem duration-200 rounded-2xl cursor-pointer"
                style={{
                    width: "calc(100% - 10px)",
                    marginLeft: "5px",
                    marginRight: "5px",
                }}
            >
                <div className="flex justify-between items-center flex-wrap">
                    <div>
                        {tags &&
                            tags.map((tag, i) => (
                                <BlogBadge tag={tag} key={i.toString()} />
                            ))}
                    </div>
                    <h1 className="2xl:mt-0 xl:mt-0 md:mt-0l lg:mt-0 ml-2 mt-2 right text-gray-800 dark:text-gray-400">
                        {formatDistance(new Date(publishedAt), new Date(), {
                            addSuffix: true,
                        })}{" "}
                        {" • "}{" "}
                        {`${views ? views : "0"} view${views !== 1 ? "s" : ""}`}
                        {" • "}
                        {`${comments ? comments : "0"} comment${
                            comments !== 1 ? "s" : ""
                        }`}
                    </h1>
                </div>
                <h1 className="text-2xl font-semibold mt-2 mb-2">{title}</h1>
                <p className="text-gray-600 dark:text-gray-200">{summary}</p>
            </div>
        </Link>
    );
};
