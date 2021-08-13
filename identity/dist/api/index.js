import express from "express";
import bcrypt from "bcrypt";
import loginSchema from "../utils/schema/login";
import db from "../utils/database/mongo";
import { createAccessToken } from "../utils/helpers/auth";
import { verifyToken } from "../utils/helpers/token";
const router = express.Router();
const identity = db.get("identity");
router.get("/", (_req, res) => {
    res.json({
        message: "auth api",
    });
});
router.post("/login", async (req, res, next) => {
    try {
        const body = await loginSchema.validate(req.body);
        const user = await identity.findOne({
            email: body.email,
        });
        if (user) {
            if (await bcrypt.compare(body.password, user.password)) {
                const accessToken = createAccessToken(user);
                res.cookie("access", accessToken);
                res.json({
                    email: user.email,
                });
            }
            else {
                res.status(401).json({
                    message: "not authenticated",
                });
            }
        }
        else {
            res.status(404).json({
                message: "no user",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
router.get("/user", verifyToken, (req, res) => {
    res.json({
        email: req.user.email,
        admin: req.user.admin,
    });
});
export default router;
//# sourceMappingURL=index.js.map