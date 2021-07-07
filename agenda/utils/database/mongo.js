const monk = require("monk");

const db = monk(
    `${process.env.MONGO_URI}?authSource=admin&readPreference=primary&ssl=false`
);

module.exports = db;
