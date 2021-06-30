const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
var Agendash = require("agendash");
require("dotenv").config();
const db = require("./utils/database/mongo");
const agendaJobs = db.get("agendaJobs");
const { updateAlbastruStatistics } = require("./jobs/youtube");
const { updateDavidIlieGitHubRepos } = require("./jobs/github");
const agenda = require("./utils/agenda/agenda");
const middlewares = require("./utils/middlewares");
const api = require("./api");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./utils/helpers/token");

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

app.get("/api/agenda", (req, res) => {
    res.json({
        message: "agenda api",
    });
});

app.use(cookieParser());

app.use("/api/agenda/dash", verifyToken, Agendash(agenda));

agenda.define("Update YT Stats", updateAlbastruStatistics);
agenda.define("Update GitHub Repos", updateDavidIlieGitHubRepos);

const initAgenda = async () => {
    const ytStatJob = agenda.create("Update YT Stats");
    const githubRepoJob = agenda.create("Update GitHub Repos");
    await agendaJobs.remove({});
    await agenda.start();
    await ytStatJob.repeatEvery("10 minutes").save();
    await githubRepoJob.repeatEvery("1 hour").save();
};

initAgenda();

app.use(helmet());
app.use(morgan("dev"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

app.use("/api/agenda/job", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
