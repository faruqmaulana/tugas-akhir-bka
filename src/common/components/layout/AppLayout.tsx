/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Router, useRouter } from "next/router";

import { MainLayout } from "./MainLayout";
import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import { findString } from "~/common/helpers/findString";
import { AuthLayout } from "./AuthLayout";
import { PUBLIC_ROUTE } from "~/common/constants/routers";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { useCurrentUser } from "~/common/hooks/module/profile";

const AppLayout = ({ children }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isPublicPage = findString(PUBLIC_ROUTE, router.pathname);
  const { dispatch } = useGlobalContext();
  const { isAdmin, session } = useCurrentUser();

  useEffect(() => {
    if (session && router) {
      const isMasterData = router.pathname.includes("master-data");
      const userManagement = router.pathname.includes("user-management");
      if ((!isAdmin && isMasterData) || (!isAdmin && userManagement)) {
        return void router.push("/dashboard");
      }
    }
  }, [router, session]);

  Router.events.on("routeChangeStart", () => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
    dispatch({ type: ActionReducer.UPDATE_FILE_META, payload: [] });
    dispatch({
      type: ActionReducer.UPDATE_PENGAJU_DOKUMEN,
      payload: undefined,
    });
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
