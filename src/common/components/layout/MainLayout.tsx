/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Spinner from "../svg/Spinner";
import { Aside } from "./partials/Aside";
import { Header } from "./partials/Header";
import { useMainLayout } from "~/common/hooks/layout/useMainLayout";
import Banner from "../ui/banner/Banner";

const MainLayout = ({ children }: any) => {
  const {
    showAside,
    setShowAside,
    userData,
    displayBanner,
    handleCloseBannerProfileHasFilled,
    showBannerProfile,
  } = useMainLayout();

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-col">
        <Banner
          isCloseAble={false}
          display={displayBanner}
          redirect="/profile"
          className="bg-slate-300"
          text="Untuk melanjutkan proses pengajuan data, mohon lengkapi data profil"
        />
        <Banner
          display={showBannerProfile}
          isCloseAble={true}
          redirect="/module/kejuaraan/tambah"
          className="bg-slate-300"
          onClick={handleCloseBannerProfileHasFilled}
          text={
            <p>
              Selamat, profil anda berhasil diperbarui 🎉🎉🎉. Silakan ajukan{" "}
              <span className="font-bold hover:underline">
                dokumen pertama Anda.
              </span>
            </p>
          }
        />
      </div>
      <Aside showAside={showAside} setShowAside={setShowAside} />
      <div
        className={`relative flex flex-col transition-all duration-1000 ease-in-out ${
          showAside ? "md:pl-60" : "pl-0"
        }`}
      >
        {showAside && (
          <div
            className="absolute inset-0 z-[15] cursor-pointer bg-[#21252980] md:hidden"
            onClick={() => setShowAside(false)}
          />
        )}
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
