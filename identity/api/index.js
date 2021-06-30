const router = require("express").Router();
const bcrypt = require("bcrypt");
const loginSchema = require("../utils/schema/login");
const db = require("../utils/database/mongo");
const identity = db.get("identity");
const { createAccessToken } = require("../utils/helpers/auth");
const { verifyToken } = require("../utils/helpers/token");

router.get("/", (req, res) => {
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
            } else {
                res.status(401).json({
                    message: "not authenticated",
                });
            }
        } else {
            res.status(404).json({
                message: "user not found",
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/user", verifyToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
