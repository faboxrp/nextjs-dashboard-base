import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDictionary } from "@/locales/dictionary";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return { ...token, user: { ...(user as User) } };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: token.user };
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
          const response = await fetch("http://rayapim.site/web/session/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "call",
              params: {
                db: "rayapim.site",
                login: username,
                password: password,
              },
              id: null,
            }),
          });

          const data = await response.json();

          if (response.ok && data.result && data.result.uid) {
            return {
              id: data.result.uid,
              name: data.result.name,
              username: username,
              email: data.result.email || "",
              avatar: "/assets/img/avatars/8.jpg", // Modifica esto según tu necesidad
            };
          } else {
            const dict = await getDictionary();
            throw new Error(dict.login.message.auth_failed);
          }
        } catch (error) {
          throw new Error("Error authenticating with Odoo");
        }
      },
    }),
  ],
};
