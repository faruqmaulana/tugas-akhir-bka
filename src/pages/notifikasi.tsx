/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import Card from "~/common/components/ui/card/Card";
import NotificationCard from "~/common/components/ui/card/NotificationCard";
import { EmptyModulePageData } from "~/common/components/ui/empty";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { DATA_CANT_RECOVER } from "~/common/constants/MESSAGE/index";
import { useNotification } from "~/common/hooks/core/useNotification";
import { type AllNotificationType } from "~/server/api/module/notification/notification";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const notifikasi = () => {
  const {
    content,
    confirm,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    showContent,
    captionButtonDanger,
    captionTitleConfirm,
    showButtonClose,
    showButtonConfirm,
    showButtonDanger,
    showButtonSuccess,
    success,
    detailInfo,
    userNotification,
    handleReadMessage,
    loadingButton,
    loadingState,
  } = useNotification();

  if ((userNotification as AllNotificationType)?.length === 0)
    return <EmptyModulePageData />;

  return (
    <>
      <PageHeading />
      <Card className="flex flex-col gap-5">
        <div className="flex flex-wrap justify-between border-b-2 pb-1">
          <span className="text-2xl font-bold text-gray-800">
            Semua Notifikasi Anda
          </span>
          {(userNotification as AllNotificationType) && (
            <div className="flex flex-wrap justify-between gap-2">
              <span
                className="underline hover:cursor-pointer"
                // onClick={() =>
                //   onOpen({
                //     titleContent: "Tandai Semua Notifikasi Sudah Dibaca?",
                //     showContent: false,
                //     content: "Semua Notifikasi Berhasil Ditandai Sudah Dibaca!",
                //     captionButtonDanger: "Oke",
                //   })
                // }
              >
                Tandai Semua Sudah Dibaca
              </span>
              <span
                className="underline hover:cursor-pointer"
                // onClick={() =>
                //   onOpen({
                //     // titleContent: "Yakin Ingin Menghapus Semua Notifikasi?",
                //     showContent: true,
                //     content: "Semua Notifikasi Berhasil Dihapus!",
                //   })
                // }
              >
                Hapus Semua Notifikasi
              </span>
            </div>
          )}
        </div>
        <NotificationCard
          onOpen={onOpen}
          handleReadMessage={handleReadMessage}
          loadingState={loadingState}
          userNotification={userNotification as AllNotificationType}
        />
        <Modal
          isOpen={isOpen}
          content={
            <ModalContent
              content={
                content ||
                (showContent ? `Data notifikasi ${DATA_CANT_RECOVER}` : "")
              }
              detailInfo={detailInfo}
            />
          }
          isLoading={loadingButton}
          captionTitleConfirm={captionTitleConfirm}
          onClose={onClose}
          success={success}
          confirm={!success && confirm}
          captionButtonDanger={captionButtonDanger}
          showButtonConfirm={showButtonConfirm}
          showButtonSuccess={showButtonSuccess}
          showButtonClose={showButtonClose}
          showButtonDanger={showButtonDanger}
          buttonCenter={confirm || success}
          onConfirmButton={onClose}
          onCloseButton={onClose}
          onSuccessButton={onSubmit}
          onDangerButton={onSubmit}
        />
      </Card>
    </>
  );
};

const ModalContent = ({
  content,
  detailInfo,
}: {
  content?: string;
  detailInfo?: string;
}) => (
  <div className="flex flex-col items-center justify-center">
    {detailInfo && <h1 className="mb-2 text-lg font-semibold">{detailInfo}</h1>}
    {content && <h1>{content}</h1>}
  </div>
);

export default notifikasi;
