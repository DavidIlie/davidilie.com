import { sign } from "jsonwebtoken";
export let ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
export const createAccessToken = (user) => {
    return sign({ userId: user._id, creation: new Date() }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
//# sourceMappingURL=auth.js.map