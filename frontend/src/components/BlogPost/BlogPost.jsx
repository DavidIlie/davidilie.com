import Link from "next/link";

import formatDistance from "date-fns/formatDistance";
import BlogBadge from "@components/BlogBadge";

export const BlogPost = ({ title, summary, slug, tags, publishedAt }) => {
    return (
        <Link href={`/blog/${slug}`} passHref>
            <div
                className="bg-gray-800 flex mb-8 px-5 py-4 flex-col hoverItem duration-200 rounded-2xl cursor-pointer"
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
                    <h1 className="2xl:mt-0 xl:mt-0 md:mt-0l lg:mt-0 ml-2 mt-2 right text-gray-400">
                        Posted{" "}
                        {formatDistance(new Date(publishedAt), new Date(), {
                            addSuffix: true,
                        })}
                        {" •"} 23 Views
                    </h1>
                </div>
                <h1 className="text-2xl font-semibold mt-2 mb-2">{title}</h1>
                <p className="text-gray-200">{summary}</p>
            </div>
        </Link>
    );
};
