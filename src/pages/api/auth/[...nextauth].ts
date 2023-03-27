import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/helpers/authentication";
import { findUser } from "@/helpers/user";

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

        const userData = await findUser(email);

        if (!userData) {
          throw new Error("Email does not exist");
        }

        const { _id, firstName, lastName } = userData;
        const isPasswordValid = await verifyPassword(
          password,
          userData.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect password or email.");
        }

        return {
          id: _id.toString(),
          email,
          firstName,
          lastName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        newToken.firstName = user.firstName;
        newToken.lastName = user.lastName;
        newToken.email = user.email;
      }

      return newToken;
    },
    session({ session, token }) {
      const newSession = { ...session };

      if (token && newSession.user) {
        newSession.user.email = token.email;
        newSession.user.firstName = token.firstName;
        newSession.user.lastName = token.lastName;
      }

      return newSession;
    },
  },
});
