import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig, s } from "velite";

export default defineConfig({
   root: "content",
   output: {
      data: ".velite",
      assets: "public/static/blog",
      base: "/static/blog/",
      name: "[name]-[hash:6].[ext]",
      clean: true,
   },
   collections: {
      blogs: {
         name: "Blog",
         pattern: "**/*.mdx",
         schema: s.object({
            title: s.string().max(99),
            publishedAt: s.string(),
            summary: s.string().max(999),
            image: s.string().optional(),
            tags: s.array(s.string()),
            published: s.boolean().default(true),
            slug: s.path(),
            body: s.mdx(),
         }),
      },
   },
   mdx: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
         rehypeSlug,
         [
            rehypePrettyCode as any,
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
