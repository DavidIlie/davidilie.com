const db = require("../database/mongo");
const users = db.get("users");

const { verify } = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("./auth");

async function verifyToken(req, res, next) {
    const token = req.cookies.access;

    if (!token) return res.sendStatus(401);

    let payload = null;
    try {
        payload = verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.sendStatus(401);
    }

    const user = await users.findOne({ _id: payload.userId });

    if (!user) {
        return res.sendStatus(500);
    } else {
        delete user.password;
        delete user._id;
        req.user = user;
        next();
    }
}

module.exports = { verifyToken };
