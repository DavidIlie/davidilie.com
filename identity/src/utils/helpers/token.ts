import { Request, Response, NextFunction } from "express";

import db from "../../utils/database/mongo";
const identity = db.get("identity");

import User from "../../types/User";

import { verify } from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET } from "../helpers/auth";

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

export async function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.access;

    if (!token) return res.sendStatus(401);

    let payload: any = null;
    try {
        payload = verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.sendStatus(401);
    }

    const user = await identity.findOne({ _id: payload.userId });

    if (!user) {
        return res.sendStatus(500);
    } else {
        req.user = user;
        return next();
    }
}
