import db from "@lib/mongo";
const posts = db.get("posts");

export default async function handler(req, res) {
    const slug = req.query.slug;
    if (req.method === "POST") {
        const post = await posts.findOne({
            slug: slug,
        });
        if (post) {
            await posts.update(post, {
                $set: {
                    views: post.views + 1,
                },
            });
            res.json({ views: post.views + 1 });
        } else {
            res.status(404).json({
                message: "Not Found",
            });
        }
    } else {
        const post = await posts.findOne({
            slug: slug,
        });
        if (post) {
            res.json({ views: post.views });
        } else {
            res.status(404).json({
                message: "Not Found",
            });
        }
    }
}
