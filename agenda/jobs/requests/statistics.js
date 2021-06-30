const fetch = require("node-fetch");

const API_KEY = process.env.YOUTUBE_API_KEY;

async function getSubscribers() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCwfF_jZHkxF1Vxx5b8PlIGA&fields=items/statistics/subscriberCount&key=${API_KEY}`,
        {
            method: "GET",
        }
    );
    var data = await response.json();
    return await data.items[0].statistics.subscriberCount;
}

async function getViews() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCwfF_jZHkxF1Vxx5b8PlIGA&fields=items/statistics/viewCount&key=${API_KEY}`,
        {
            method: "GET",
        }
    );
    var data = await response.json();
    return await data.items[0].statistics.viewCount;
}

async function getVideos() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCwfF_jZHkxF1Vxx5b8PlIGA&fields=items/statistics/videoCount&key=${API_KEY}`,
        {
            method: "GET",
        }
    );
    var data = await response.json();
    return await data.items[0].statistics.videoCount;
}

module.exports = { getSubscribers, getViews, getVideos };
