import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser {
    session_id?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    user: User;
  }
}
