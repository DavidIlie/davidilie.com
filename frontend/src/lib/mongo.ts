import monk from "monk";

const db = monk(
    `${process.env.MONGO_URI}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
);

export default db;
