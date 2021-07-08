import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/mongo";
const posts = db.get("posts");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const slug = req.query.slug;
    const post = await posts.findOne({
        slug: slug,
    });
    if (post) {
        res.json({
            views: post.views,
            comments: post.comments,
            commentCount: post.comments.length,
        });
    } else {
        res.status(404).json({
            message: "Not Found",
        });
    }
}
