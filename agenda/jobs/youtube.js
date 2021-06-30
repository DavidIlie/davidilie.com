const db = require("../utils/database/mongo");
const statistics = db.get("statistics");

const {
    getSubscribers,
    getViews,
    getVideos,
} = require("./requests/statistics");

const updateAlbastruStatistics = async (job, done) => {
    const statistic = await statistics.find();
    const subscribers = await getSubscribers();
    const views = await getViews();
    const videos = await getVideos();

    if (subscribers && views && videos) {
        if (!statistic[0]) {
            statistics.insert({
                channel: "Albastru",
                subscribers: subscribers,
                views: views,
                videos,
            });
            job.attrs.data = { subscribers: subscribers, views: views, videos };
            done();
        } else {
            statistics.update(
                {
                    channel: "Albastru",
                },
                {
                    $set: {
                        subscribers: subscribers,
                        views: views,
                        videos,
                    },
                }
            );
            job.attrs.data = { subscribers: subscribers, views: views, videos };
            done();
        }
    } else {
        done("youtube api key is invalid or not defined");
    }
};

module.exports = { updateAlbastruStatistics };
