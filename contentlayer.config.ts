import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
   slug: {
      type: "string",
      resolve: (doc: any) => `${doc._raw.flattenedPath}`,
   },
   slugAsParams: {
      type: "string",
      resolve: (doc: any) =>
         doc._raw.flattenedPath.split("/").slice(1).join("/"),
   },
   structuredData: {
      type: "json",
      resolve: (doc: any) => ({
         "@context": "https://schema.org",
         "@type": "BlogPosting",
         headline: doc.title,
         datePublished: doc.publishedAt,
         dateModified: doc.publishedAt,
         description: doc.summary,
         image: doc.image ? `${doc.image}` : `/og?title=${doc.title}`,
         url: `https://davidilie.com/blog/${doc._raw.flattenedPath}`,
         author: {
            "@type": "Person",
            name: "David Ilie",
         },
      }),
   },
};

export const Blog = defineDocumentType(() => ({
   name: "Blog",
   filePathPattern: `**/*.mdx`,
   contentType: "mdx",
   fields: {
      title: {
         type: "string",
         required: true,
      },
      publishedAt: {
         type: "string",
         required: true,
      },
      summary: {
         type: "string",
         required: true,
      },
      image: {
         type: "string",
      },
      tags: {
         type: "list",
         of: { type: "string" },
         required: true,
      },
      published: {
         type: "boolean",
         required: true,
         default: true,
      },
   },
   //@ts-ignore
   computedFields,
}));

export default makeSource({
   contentDirPath: "./content",
   documentTypes: [Blog],
   mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
         rehypeSlug,
         [
            rehypePrettyCode,
            {
               theme: "one-dark-pro",
               onVisitLine(node: any) {
                  if (node.children.length === 0) {
                     node.children = [{ type: "text", value: " " }];
                  }
               },
               onVisitHighlightedLine(node: any) {
                  node.properties.className.push("line--highlighted");
               },
               onVisitHighlightedWord(node: any) {
                  node.properties.className = ["word--highlighted"];
               },
            },
         ],
         [
            rehypeAutolinkHeadings,
            {
               properties: {
                  className: ["anchor"],
               },
            },
         ],
      ],
   },
});
