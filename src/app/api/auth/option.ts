// auth/options.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDictionary } from "@/locales/dictionary";
import { authenticateWithOdoo } from "@/lib/auth-odoo";
import { logoutFromOdoo } from "@/lib/logout-odoo";

declare module "next-auth" {
  interface Session {
    user: User & { session_id?: string };
  }

  interface JWT {
    user: User & { session_id?: string };
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = { ...(user as User), session_id: user.session_id };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (token.user?.session_id) {
        try {
          await logoutFromOdoo(token.user.session_id);
        } catch (error) {
          console.error("Failed to log out from Odoo:", error);
        }
      }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "string" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;

        try {
          const user = await authenticateWithOdoo(username, password);
          return user;
        } catch (error) {
          const dict = await getDictionary();
          throw new Error(dict.login.message.auth_failed);
        }
      },
    }),
  ],
};
