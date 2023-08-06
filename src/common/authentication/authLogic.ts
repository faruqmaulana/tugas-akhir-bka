/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import {
//   ADMIN_ROUTE,
//   QUEUE_DETAIL_ROUTE,
//   USER_ROUTE,
// } from "../constant/routes";
import { ADMIN_ROUTE, USER_ROUTE } from "../constants/routers";
import checkTokenExpired from "../helpers/checkTokenExpired";
import { findString } from "../helpers/findString";
import { type SessionType } from "../types/sessionTypes";

type RedirectDestination = {
  destination: string;
  permanent: boolean;
};

const getRedirectObject = (
  destination: string,
  permanent = false
): { redirect: RedirectDestination } => {
  return {
    redirect: {
      destination,
      permanent,
    },
  };
};

const redirectIfAuthenticated = (
  session: SessionType
): { redirect?: RedirectDestination } | undefined => {
  if (session) {
    return getRedirectObject("/dashboard");
  }
};

const redirectIfNotAuthenticated = (
  session: SessionType,
  url: string
): { redirect?: RedirectDestination } | undefined => {
  if (session && url) {
    const IS_ADMIN = session.user.role === "ADMIN";
    const IS_MAHASISWA = session.user.role === "MAHASISWA";

    const isUserRoute = findString(USER_ROUTE, url);
    const isAdminRoute = findString(ADMIN_ROUTE, url);

    if (isUserRoute && IS_ADMIN) {
      return getRedirectObject("/dashboard");
    }

    if (isAdminRoute && IS_MAHASISWA) {
      return getRedirectObject("/dashboard", true);
    }
  }

  if (!session || checkTokenExpired(session.expires)) {
    return getRedirectObject("/");
  }
};

export {
  getRedirectObject,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
};
