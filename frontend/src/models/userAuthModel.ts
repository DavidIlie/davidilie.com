import Adapters from "next-auth/adapters";

export interface UserModelProps {
    name: string;
    email: string;
    image: string;
    isAdmin: string;
}

export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
    constructor({ name, email, image, isAdmin }: UserModelProps) {
        super(name, email, image, isAdmin);
        if (!this.isAdmin) this.isAdmin = false;
    }
}

export const UserSchema = {
    name: "User",
    target: User,
    columns: {
        ...Adapters.TypeORM.Models.User.schema.columns,
        isAdmin: {
            type: "boolean",
            default: false,
        },
    },
};
