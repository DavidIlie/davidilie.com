const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const middlewares = require("./utils/middlewares");
const api = require("./api");
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
