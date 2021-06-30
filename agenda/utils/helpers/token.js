const fetch = require("node-fetch");

async function verifyToken(req, res, next) {
    if (req.originalUrl === "/api/agenda/dash/") {
        const token = req.cookies.access;

        if (!token) return res.sendStatus(401);

        const validateRequest = await fetch(
            `${process.env.IDENTITY_SERVER_URL}/user`,
            {
                method: "GET",
                headers: {
                    cookie: `access=${token}`,
                },
            }
        );

        if (validateRequest.status === 200) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        next();
    }
}

module.exports = { verifyToken };
