/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Spinner from "../svg/Spinner";
import { Aside } from "./partials/Aside";
import { Header } from "./partials/Header";
import { useMainLayout } from "~/common/hooks/layout/useMainLayout";

const MainLayout = ({ children }: any) => {
  const { showAside, setShowAside, userData } = useMainLayout();

  return (
    <div>
      <Aside showAside={showAside} />
      <div
        className={`flex flex-col transition-all duration-1000 ease-in-out ${
          showAside ? "pl-60" : "pl-0"
        }`}
      >
        <Header setShowAside={setShowAside} showAside={showAside} />
        <main className="min-h-screen bg-charcoal-100 px-5 pb-5 pt-[90px]">
          {userData ? (
            children
          ) : (
            <div className="flex h-full min-h-[80vh] items-center justify-center">
              <Spinner width="30px" height="30px" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export { MainLayout };
