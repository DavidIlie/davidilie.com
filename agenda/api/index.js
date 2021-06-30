const router = require("express").Router();
const db = require("../utils/database/mongo");

const statistics = db.get("statistics");
const github = db.get("github");

router.get("/", (req, res) => {
    res.json({
        message: "Please put job name as a param",
    });
});

router.get("/:job", async (req, res) => {
    const { job } = req.params;
    if (job) {
        if (job === "statistics") {
            const statistic = await statistics.find();
            res.json({
                subscribers: statistic[0].subscribers,
                views: statistic[0].views,
                videos: statistic[0].videos,
            });
        } else if (job === "github") {
            const repos = await github.find();
            res.json(repos);
        } else {
            res.status(404).json({
                message: "Job not found",
            });
        }
    } else {
        res.status(404).json({
            message: "Job not found",
        });
    }
});

module.exports = router;
