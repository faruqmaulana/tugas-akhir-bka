/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import TrashIcon from "~/common/components/svg/TrashIcon";
import { Button } from "~/common/components/ui/button/Button";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { DATA_CANT_RECOVER } from "~/common/constants/MESSAGE/index";
import { NOTIFICATION } from "~/common/constants/NOTIFICATION";
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
        {NOTIFICATION.map((val) => (
          <div
            key={val.id}
            className={`flex flex-col gap-3 rounded-md px-5 py-3 ${
              !val.isReaded ? "bg-slate-200" : "border-2"
            }`}
          >
            <div className="flex justify-between">
              <div
                className="rounded-full px-2 text-sm font-semibold opacity-95"
                style={{ backgroundColor: val.color }}
              >
                {val.status}
              </div>
              {!val.isReaded && (
                <span className="text-sm underline hover:cursor-pointer">
                  Tandai Sudah Dibaca
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">
                {val.name}
                {val.detail !== "" ? ` - ${val.detail}` : ""}
              </h2>
              <p className="font-semibold">
                {val.nama_mahasiswa}&nbsp;-&nbsp;{val.prodi}
              </p>
              <div className="mt-2 flex justify-between">
                <p className="text-sm">{val.createdAt}</p>
                <div className="flex justify-between gap-2">
                  <ViewDetailButton />
                  <Button
                    isDanger
                    isSmall
                    className="flex w-fit items-center gap-2 !rounded-full text-center"
                    onClick={() =>
                      onOpen({
                        showContent: true,
                        detailInfo: `(${val.name} ${
                          val.detail !== "" ? ` - ${val.detail}` : ""
                        })`,
                        content: "Data Berhasil Dihapus!",
                      })
                    }
                  >
                    <TrashIcon color="#FFFFFF" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
