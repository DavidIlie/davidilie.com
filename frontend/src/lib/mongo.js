import monk from "monk";

const db = monk(process.env.MONGO_URI);

export default db;
