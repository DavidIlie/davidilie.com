const { sign } = require("jsonwebtoken");

let ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;

const createAccessToken = (user) => {
    return sign(
        { userId: user._id, creation: new Date() },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );
};
module.exports = { createAccessToken, ACCESS_TOKEN_SECRET };
