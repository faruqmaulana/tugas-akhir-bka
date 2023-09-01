/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Card from "~/common/components/ui/card/Card";
import NotificationCard from "~/common/components/ui/card/NotificationCard";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { DATA_CANT_RECOVER } from "~/common/constants/MESSAGE/index";
import { useNotification } from "~/common/hooks/core/useNotification";

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
  } = useNotification();

  return (
    <>
      <PageHeading />
      <Card className="flex flex-col gap-5">
        <div className="flex justify-between border-b-2 pb-1">
          <span className="text-2xl font-bold text-gray-800">
            Semua Notifikasi Anda
          </span>
          <div className="flex justify-between gap-2">
            <span
              className="underline hover:cursor-pointer"
              onClick={() =>
                onOpen({
                  titleContent: "Tandai Semua Notifikasi Sudah Dibaca?",
                  showContent: false,
                  content: "Semua Notifikasi Berhasil Ditandai Sudah Dibaca!",
                  captionButtonDanger: "Oke",
                })
              }
            >
              Tandai Semua Sudah Dibaca
            </span>
            <span
              className="underline hover:cursor-pointer"
              onClick={() =>
                onOpen({
                  titleContent: "Yakin Ingin Menghapus Semua Notifikasi?",
                  showContent: true,
                  content: "Semua Notifikasi Berhasil Dihapus!",
                })
              }
            >
              Hapus Semua Notifikasi
            </span>
          </div>
        </div>
        <NotificationCard onOpen={onOpen} />
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
