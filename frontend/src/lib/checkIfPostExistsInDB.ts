import { getAllFilesFrontMatter, MDXProps } from "@lib/mdx";
import db from "@lib/mongo";
const posts = db.get("posts");

const checkIfSlugRelatesToPost = async (slug: string, posts: MDXProps[]) => {
    let found = false;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].slug === slug) found = true;
    }
    return found;
};

export const createPostsInDB = async (slug: string) => {
    const staticPosts = await getAllFilesFrontMatter();
    const exists = await checkIfSlugRelatesToPost(slug, staticPosts);

    if (!exists) return false;

    const post = await posts.findOne({ slug: slug });

    if (post) {
        return true;
    } else {
        await posts.insert({
            slug: slug,
            views: 0,
            comments: [],
        });
        return true;
    }
};
