import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async () => {
        return { id: "123213", name: "Jor", email: "jrmartinez@gmail.com" };
      },
    }),
  ],
};

export default NextAuth(authOptions);
