import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { verifyPassword } from "@/helpers/authentication";
import { findUser, addUserProfile } from "@/helpers/user";
import { UserAuth } from "@/types/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      authorize: async credentials => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const userData = await findUser(email, true);

        if (!userData) {
          throw new Error("Email does not exist");
        }

        const { _id, firstName, lastName, hashedPassword } =
          userData as UserAuth;
        const isPasswordValid = await verifyPassword(password, hashedPassword);

        if (!isPasswordValid) {
          throw new Error("Incorrect password or email.");
        }

        return {
          id: _id.toString(),
          email,
          name: `${firstName} ${lastName}`,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const newToken: JWT = { ...token };

      if (user) {
        newToken.name = user.name;
        newToken.email = user.email;
      }

      return newToken;
    },
    session({ session, token }) {
      const newSession = { ...session };

      if (token && newSession.user) {
        newSession.user.email = token.email;
        newSession.user.name = token.name;
      }

      return newSession;
    },
    async signIn({ user: { email, name }, account }) {
      const ERROR_AUTH = "/login?error=Error%20when%20logging%20in";

      if (
        !account?.access_token &&
        account?.type === "credentials" &&
        !account?.providerAccountId
      ) {
        return ERROR_AUTH;
      }

      const foundUser = await findUser(email);

      if (foundUser) {
        return true;
      }

      const userObj = {
        email,
        displayName: name as string,
      };

      try {
        await addUserProfile(userObj);
      } catch (err) {
        return ERROR_AUTH;
      }

      return true;
    },
  },
});
