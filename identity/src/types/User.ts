import mongodb from "mongodb";

export default interface User {
    _id: mongodb.ObjectID;
    email: string;
    password: string;
    admin: boolean;
}
