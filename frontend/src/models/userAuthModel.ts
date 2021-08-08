import Adapters from "next-auth/adapters";

export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
    constructor(name: string, email: string, image: string, isAdmin: boolean) {
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
