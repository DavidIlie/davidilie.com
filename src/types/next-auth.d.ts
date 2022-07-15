import type { DefaultUser } from "next-auth";

import { User } from "@prisma/client";

declare module "next-auth" {
   interface Session {
      user?: DefaultUser & User;
   }
}

declare module "next-auth/jwt/types" {
   interface JWT {
      uid: string;
   }
}
