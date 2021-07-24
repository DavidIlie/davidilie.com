import { NextApiResponse } from "next";

const redirects = {
    github: "https://github.com/DavidIlie",
    youtube: "https://youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA",
    twitch: "https://twitch.tv/AlbastruYT",
    twitter: "https://twitter.com/AlbastruYT",
};

// NextApiRequest gives an error for some reason with the slug
export default function handler(req, res: NextApiResponse) {
    const { slug } = req.query;
    if (redirects[slug] !== undefined) {
        res.redirect(redirects[slug]);
    } else {
        res.status(404).json({ message: "Redirect not found" });
    }
}
