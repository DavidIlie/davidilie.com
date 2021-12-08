import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import db from "@lib/mongo";
import { createPostsInDB } from "@lib/checkIfPostExistsInDB";
const posts = db.get("posts");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const slug = req.query.slug;

    await createPostsInDB(slug as string);

    const session = await getSession({ req });
    const body = JSON.parse(req.body);

    if (session) {
        if (req.method === "POST") {
            const post = await posts.findOne({
                slug: slug,
            });
            if (post) {
                const update = await posts.update(post, {
                    $push: {
                        comments: {
                            id: uuidv4(),
                            name: session.user.name,
                            image: session.user.image,
                            email: session.user.email,
                            date: new Date(),
                            comment: body.comment,
                        },
                    },
                });
                if (update.ok === 1) {
                    res.json({ message: "Success!" });
                } else {
                    res.json({
                        message: "There has been an error, try again later!",
                    });
                }
            } else {
                res.status(404).json({
                    message: "not found",
                });
            }
        } else if (req.method === "DELETE") {
            const post = await posts.findOne({
                slug: slug,
            });
            if (post) {
                let comments = post.comments;
                for (let [i, comment] of comments.entries()) {
                    if (
                        comment.id == body.id &&
                        comment.email === session.user.email
                    ) {
                        comments.splice(i, 1);
                    }
                }
                const request = await posts.update(
                    { slug: slug },
                    {
                        $set: {
                            comments: comments,
                        },
                    }
                );
                if (request.nModified === 1) {
                    res.json({
                        message: "Success!",
                    });
                } else {
                    res.status(500).json({
                        message: "error",
                    });
                }
            } else {
                res.status(404).json({
                    message: "not found",
                });
            }
        } else {
            res.status(404).json({
                message: "not found",
            });
        }
    } else {
        res.status(401).json({
            message: "not authorized",
        });
    }
}
