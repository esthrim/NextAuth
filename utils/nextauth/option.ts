import { addUser, getUser, getUserByEmail } from "@/db/actions/userAction";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubCredential from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credential) => {
        const email = credential?.email as string;
        const password = credential?.password as string;
        const findUser = await getUser(email, password);

        if (findUser) {
          return {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            image: findUser.image,
          };
        }

        return null;
      },
    }),
    GithubCredential({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const email = user?.email as string;
      const findUser = await getUserByEmail(email);

      if (!findUser) {
        await addUser(user?.name as string, email, user?.image as string);
      }

      return true;
    },
    session: async ({ session }) => {
      if (session.user) {
        const email = session.user?.email as string;
        const findUser = await getUserByEmail(email);

        if (findUser) {
          session.user.id = findUser.id;
          session.user.roleId = findUser.roleId;
        }
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (token) {
        const email = token?.email as string;

        const findUser = await getUserByEmail(email);

        if (findUser) {
          token.roleId = findUser.roleId;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
