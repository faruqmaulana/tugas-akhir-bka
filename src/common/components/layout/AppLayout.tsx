/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Router, useRouter } from "next/router";

import { MainLayout } from "./MainLayout";
import { useState } from "react";
import Spinner from "../svg/Spinner";
import PageHeading from "../ui/header/PageHeading";
import capitalizeFirstLetter from "~/common/utils/capitalizeFirstLetter";
import { AUTH_URL } from "~/common/constants";
import { findString } from "~/common/utils/findString";
import { AuthLayout } from "./AuthLayout";

const AppLayout = ({ children }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthPage = findString(AUTH_URL, router.pathname);

  Router.events.on("routeChangeStart", () => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
  });

  const handlePageHeading = () => {
    return capitalizeFirstLetter(
      router.pathname.replaceAll("/", " ").replaceAll("-", " ")
    );
  };
  if (!isAuthPage) {
    return (
      <>
        <MainLayout>
          {isLoading ? (
            <div className="flex h-full min-h-[80vh] items-center justify-center">
              <Spinner width="30px" height="30px" />
            </div>
          ) : (
            <>
              <PageHeading title={handlePageHeading()} className="mb-[20px]" />
              {children}
            </>
          )}
        </MainLayout>
      </>
    );
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export { AppLayout };
