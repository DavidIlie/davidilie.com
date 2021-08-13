require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import db from "./utils/database/mongo";
import * as middlewares from "./utils/middlewares";
import api from "./api/index";

const app = express();
const identity = db.get("identity");

app.use(
    cors({
        credentials: true,
        origin: function (_origin, callback) {
            callback(null, true);
        },
    })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/identity", api);

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const init = async () => {
    const adminAccount = await identity.findOne({
        email: "david@davidilie.com",
        password: process.env.ADMIN_PASSWORD,
    });
    if (!adminAccount) {
        await identity.insert({
            email: "david@davidilie.com",
            password: process.env.ADMIN_PASSWORD,
            admin: true,
        });
    }
};

init();
