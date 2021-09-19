import React, { useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import BlogLayout from "@components/BlogLayout";
import MDXComponents from "@components/MDXComponents";
import { getFileBySlug, getFiles } from "@lib/mdx";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Blog({ mdxSource, frontMatter }): React.ReactElement {
    const router = useRouter();

    useEffect(() => {
        if (!frontMatter.published && process.env.NODE_ENV !== "development") {
            toast.error("This post is not done yet!", {
                id: "NotDoneYetBlog",
                icon: "🧑‍💻",
            });
            router.push("/blog");
        }
    });

    if (frontMatter.published || process.env.NODE_ENV === "development") {
        return (
            <BlogLayout frontMatter={frontMatter}>
                <MDXRemote {...mdxSource} components={{ ...MDXComponents }} />
            </BlogLayout>
        );
    }
    return null;
}

export async function getStaticPaths() {
    const posts = await getFiles(`blog`);

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, ``),
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const post = await getFileBySlug(`blog`, params.slug);

    return { props: { ...post } };
}
