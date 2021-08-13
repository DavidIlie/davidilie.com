import db from "../../utils/database/mongo";
const identity = db.get("identity");
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../helpers/auth";
export async function verifyToken(req, res, next) {
    const token = req.cookies.access;
    if (!token)
        return res.sendStatus(401);
    let payload = null;
    try {
        payload = verify(token, ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        return res.sendStatus(401);
    }
    const user = await identity.findOne({ _id: payload.userId });
    if (!user) {
        return res.sendStatus(500);
    }
    else {
        req.user = user;
        return next();
    }
}
//# sourceMappingURL=token.js.map