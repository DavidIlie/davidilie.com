import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkAutoLinkHeadings from "remark-autolink-headings";
import remarkSlug from "remark-slug";

//@ts-ignore
import remarkCodeTitles from "remark-code-titles";

export interface MDXProps {
   title: string;
   publishedAt: string;
   summary: string;
   tags: string[];
   image: string;
   slug: string;
   published: boolean;
}

export const getFiles = (type: string) =>
   fs.readdirSync(path.join(process.cwd(), `src`, `data`, type));

export const doesPostExist = async (slug: string): Promise<boolean> => {
   const posts = await getAllFilesFrontMatter();
   return !!posts.filter((p) => p.slug === slug);
};

export const getFileBySlug = async (type: string, slug: string) => {
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
         remarkPlugins: [remarkAutoLinkHeadings, remarkSlug, remarkCodeTitles],
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
};

export const getAllFilesFrontMatter = (): Promise<MDXProps[]> => {
   const files = fs.readdirSync(
      path.join(process.cwd(), `src`, `data`, `blog`)
   );

   //@ts-ignore
   return files.reduce((allPosts, postSlug) => {
      const source = fs.readFileSync(
         path.join(process.cwd(), `src`, `data`, `blog`, postSlug),
         `utf8`
      );

      const slug = postSlug.replace(`.mdx`, ``);

      const { data } = matter(source);

      return [
         {
            ...data,
            slug: slug,
         },
         ...allPosts,
      ];
   }, []) as MDXProps[];
};
