/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from "react";
import { Aside } from "./partials/Aside";
import { Header } from "./partials/Header";

const MainLayout = ({ children }: any) => {
  const [showAside, setShowAside] = useState<boolean>(true);

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
          {children}
        </main>
      </div>
    </div>
  );
};

export { MainLayout };
