export const getGitHubEditURL = (slug: string) =>
    `https://github.com/DavidIlie/davidilie.com/edit/master/frontend/src/data/blog/${slug.slice(
        0
    )}.mdx`;
