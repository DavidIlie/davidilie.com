const monk = require("monk");

const db = monk(
    `${process.env.MONGO_URI}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
);

module.exports = db;
