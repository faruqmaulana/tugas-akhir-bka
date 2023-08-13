import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { AppLayout } from "~/common/components/layout/AppLayout";
import { ToastContainer } from "react-toastify";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "~/common/context/GlobalContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <ToastContainer />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
    </GlobalProvider>
  );
};

export default api.withTRPC(MyApp);
