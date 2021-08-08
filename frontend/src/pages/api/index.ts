import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.json({
        message: "api list",
        apis: [
            {
                name: "agenda",
                description: "Background processing",
                url: "https://davidilie.com/api/agenda",
            },
            {
                name: "identity",
                description: "API authentication server",
                url: "https://davidilie.com/api/identity",
            },
            {
                name: "spotify",
                description: "Spotify statistics API",
                url: "https://davidilie.com/api/spotify",
            },
        ],
    });
}
