import { sign } from "jsonwebtoken";

export let ACCESS_TOKEN_SECRET = <string>process.env.JWT_SECRET;

import User from "../../types/User";

export const createAccessToken = (user: User) => {
    return sign(
        { userId: user._id, creation: new Date() },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );
};
