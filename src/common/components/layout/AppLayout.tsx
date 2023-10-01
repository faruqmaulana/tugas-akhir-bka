/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Router, useRouter } from "next/router";

import { MainLayout } from "./MainLayout";
import { useState } from "react";
import Spinner from "../svg/Spinner";
import { findString } from "~/common/helpers/findString";
import { AuthLayout } from "./AuthLayout";
import { PUBLIC_ROUTE } from "~/common/constants/routers";

const AppLayout = ({ children }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isPublicPage = findString(PUBLIC_ROUTE, router.pathname);

  Router.events.on("routeChangeStart", () => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
  });

  if (!isPublicPage) {
    return (
      <>
        <MainLayout>
          {isLoading ? (
            <div className="flex h-full min-h-[80vh] items-center justify-center">
              <Spinner width="30px" height="30px" />
            </div>
          ) : (
            <>{children}</>
          )}
        </MainLayout>
      </>
    );
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export { AppLayout };
