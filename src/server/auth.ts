/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type DefaultUser,
} from "next-auth";
import { env } from "~/env.mjs";
import { verify } from "argon2";
import { loginSchema } from "~/common/schemas/login";
import Credentials from "next-auth/providers/credentials";
import prisma from "~/common/config/prisma";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      role: "MAHASISWA" | "ADMIN";
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: "MAHASISWA" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: "MAHASISWA" | "ADMIN";
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        try {
          const { npm, password } = await loginSchema.parseAsync(credentials);
          const result = await prisma.user.findFirst({
            where: { npm },
          });

          if (!result) return null;
          const isValidPassword = await verify(result.password, password);
          console.log({ isValidPassword });
          if (!isValidPassword) return null;

          return { id: result.id, role: result.role };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const { name, id, role } = user;
        token.name = name;
        token.userId = id;
        token.role = role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        const { name, userId, role } = token;
        session.user.name = name;
        session.user.userId = userId;
        session.user.role = role;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 1 * 24 * 30 * 60, // 1 days
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
