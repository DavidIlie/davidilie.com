const db = require("../database/mongo");
const identity = db.get("identity");

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

    const user = await identity.findOne({ _id: payload.userId });

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
