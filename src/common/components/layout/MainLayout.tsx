import { useState } from "react";
import { Aside } from "./partials/Aside";
import { Header } from "./partials/Header";

const MainLayout = ({ children }: any) => {
  const [showAside, setShowAside] = useState<boolean>(true);

  return (
    <div className="grid h-screen grid-cols-[240px_1fr] grid-rows-[70px_1fr] antialiased">
      <Aside showAside={showAside} />
      <Header setShowAside={setShowAside} showAside={showAside} />
      <main className="col-start-2 col-end-2 row-start-2 row-end-[-1] h-full bg-charcoal-100 px-6 py-5">
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
