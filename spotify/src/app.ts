import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
require("dotenv").config();

import * as middlewares from "./utils/middlewares";
import api from "./api";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/spotify", api);

const port = process.env.PORT || 5004;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
