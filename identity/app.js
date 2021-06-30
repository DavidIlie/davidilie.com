const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./utils/database/mongo");
const identity = db.get("identity");
const middlewares = require("./utils/middlewares");
const api = require("./api");
const app = express();

app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
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
    console.log(`App running on port ${port}`);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//function to check if user admin there, else create it
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
