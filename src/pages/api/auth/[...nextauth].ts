import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/helpers/authentication";
import { findUser } from "@/helpers/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async credentials => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await findUser(email);

        if (!user) {
          throw new Error("Email does not exist");
        }

        const { _id, firstName, lastName } = user;
        const isPasswordValid = await verifyPassword(
          password,
          user.hashedPassword
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
};

export default NextAuth(authOptions);
