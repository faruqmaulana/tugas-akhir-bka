import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import {
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
} from "./authLogic";

import { authOptions } from "~/server/auth";
import { findString } from "../helpers/findString";
import { PUBLIC_ROUTE } from "../constants/routers";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    // check if route is public

    const isPublicRoutes = findString(
      PUBLIC_ROUTE,
      ctx.resolvedUrl.split("?")[0] as string
    );

    // redirect if route is public and user is authenticated
    const redirectIfPublicAndAuthenticated = redirectIfAuthenticated(session);
    if (isPublicRoutes && redirectIfPublicAndAuthenticated) {
      return redirectIfPublicAndAuthenticated;
    }

    // redirect if route is protected and user is not authenticated or token has expired
    // and check users role
    const ifProtectedAndNotAuthenticated = redirectIfNotAuthenticated(
      session,
      ctx.resolvedUrl
    );

    if (!isPublicRoutes && ifProtectedAndNotAuthenticated) {
      return ifProtectedAndNotAuthenticated;
    }

    return await func(ctx);
  };
