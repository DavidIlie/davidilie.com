import monk from "monk";

export default monk(<string>process.env.MONGO_URI);
