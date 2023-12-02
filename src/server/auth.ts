/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

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
      email: string;
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
    email: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { npm, password } = await loginSchema.parseAsync(credentials);
        const result = await prisma.user.findFirst({
          where: { npm },
        });

        if (!result) throw new Error("Akun belum terdaftar");
        const isValidPassword = await verify(result.password!, password);
        if (!isValidPassword) throw new Error("NPM atau password salah!");
        if (!result.isActive) throw new Error("Akun tidak aktif!");
        const { id, name, email, role } = result;

        return { id, name, email, role };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // if (account?.provider === "google") {
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const { name, id, role, email } = user;
        token.name = name;
        token.userId = id;
        token.role = role;
        token.email = email as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        const { name, userId, role, email } = token;
        session.user.name = name;
        session.user.userId = userId;
        session.user.role = role;
        token.email = email;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  jwt: {
    maxAge: 1 * 24 * 30 * 60, // 1 days
  },
  pages: {
    signIn: "/dashboard",
    newUser: "/",
  },
  session: {
    strategy: "jwt",
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
