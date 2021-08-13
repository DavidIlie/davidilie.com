const monk = require("monk");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const db = monk(
    `${process.env.MONGO_URI}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
);

const posts = db.get("posts");

const getAllFilesFrontMatter = async () => {
    const files = fs.readdirSync(
        path.join(process.cwd(), `src`, `data`, `blog`)
    );

    return files.reduce(async (allPosts, postSlug) => {
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
            ...(await allPosts),
        ];
    }, []);
};

const createPosts = async () => {
    const staticPosts = await getAllFilesFrontMatter();

    for (let i = 0; i < staticPosts.length; i++) {
        const slug = staticPosts[i].slug;
        const post = await posts.findOne({ slug: slug });
        if (!post) {
            await posts.insert({
                slug: slug,
                views: 0,
                comments: [],
            });
        }
    }

    process.exit();
};

createPosts();
