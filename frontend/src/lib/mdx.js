import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import mdxPrism from "@mapbox/rehype-prism";

export const getFiles = (type) =>
  fs.readdirSync(path.join(process.cwd(), `src`, `data`, type));

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(
        path.join(process.cwd(), `src`, `data`, type, `${slug}.mdx`),
        `utf8`
      )
    : fs.readFileSync(
        path.join(process.cwd(), `src`, `data`, `${type}.mdx`),
        `utf8`
      );

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        [require("remark-autolink-headings")],
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter() {
  const files = fs.readdirSync(path.join(process.cwd(), `src`, `data`, `blog`));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), `src`, `data`, `blog`, postSlug),
      `utf8`
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(`.mdx`, ``),
      },
      ...allPosts,
    ];
  }, []);
}
