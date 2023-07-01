/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Router, useRouter } from "next/router";

import { MainLayout } from "./MainLayout";
import { useState } from "react";
import Spinner from "../svg/Spinner";

const AppLayout = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setIsLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
  });

  return (
    <>
      <MainLayout>
        {isLoading ? (
          <div className="flex h-full min-h-[80vh] items-center justify-center">
            <Spinner width="30px" height="30px" />
          </div>
        ) : (
          children
        )}
      </MainLayout>
    </>
  );
};

export { AppLayout };
