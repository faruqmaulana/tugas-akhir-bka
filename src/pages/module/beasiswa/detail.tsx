/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter } from "next/router";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Input from "~/common/components/ui/form/Input";
import { UPDATE_SUCCESS } from "~/common/constants/MESSAGE";
import {
  PENGAJUAN_BEASISWA,
  type PengajuanBeasiswa,
} from "~/common/constants/module/PENGAJUAN_BEASISWA";

const INITIAL_STATE = {
  isReject: false,
  isApprove: false,
  isSuccess: false,
};

const Example = () => {
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);
  const {
    namaMahasiswa,
    nbi,
    prodi,
    fakultas,
    semester,
    dokumenFormulirPengajuan,
    deskripsi,
    dokumenPendukung,
    tanggalPengajuan,
  } = PENGAJUAN_BEASISWA[0] as PengajuanBeasiswa;

  const handleButtonAction = (type: string) => {
    if (type === "reject") {
      setState({ ...state, isReject: true });
    }

    if (type === "approve") {
      setState({ ...state, isApprove: true });
    }

    setTimeout(() => {
      if (type === "success") {
        setState({ ...INITIAL_STATE, isSuccess: true });
      }
    }, 500);

    if (type === "close") {
      setState(INITIAL_STATE);
    }
  };

  return (
    <>
      <PageHeading />
      <div className="flex flex-col gap-5">
        <Card>
          <div className="grid grid-cols-12 gap-2">
            <span className="col-span-2 font-semibold">Nama Mahasiswa</span>
            <span className="col-span-10">: {namaMahasiswa}</span>
            <span className="col-span-2 font-semibold">NBI</span>
            <span className="col-span-10">: {nbi}</span>
            <span className="col-span-2 font-semibold">Prodi</span>
            <span className="col-span-10">: {prodi}</span>
            <span className="col-span-2 font-semibold">Fakultas</span>
            <span className="col-span-10">: {fakultas}</span>
            <span className="col-span-2 font-semibold">Semester</span>
            <span className="col-span-10">: {semester}</span>
            <span className="col-span-2 font-semibold">Deskripsi Dokumen</span>
            <span className="col-span-10">: {deskripsi}</span>
            <span className="col-span-2 font-semibold">Tanggal Pengajuan</span>
            <span className="col-span-10">: {tanggalPengajuan}</span>
            <span className="col-span-2 font-semibold">Formulir Pengajuan</span>
            <span className="col-span-10">:</span>
            <span className="col-span-12">
              <iframe
                className="h-[600px] w-full"
                src="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
              ></iframe>
            </span>
            <span className="col-span-2 font-semibold">Dokumen Pendukung</span>
            <span className="col-span-10">:</span>
            <span className="col-span-12">
              <iframe
                className="h-[600px] w-full"
                src="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
              ></iframe>
            </span>
          </div>
        </Card>
        <div className="ml-auto flex flex-row gap-4">
          <Button
            isMedium
            isGray
            className="w-fit"
            onClick={() => {
              void router.push("/master-data/beasiswa");
            }}
          >
            <span>Kembali</span>
          </Button>
          <Button
            isMedium
            isDanger
            className="w-fit"
            onClick={() => handleButtonAction("reject")}
          >
            <span>Tolak</span>
          </Button>
          <Button
            isMedium
            isSuccess
            className="w-fit"
            onClick={() => handleButtonAction("approve")}
          >
            <span>Setuju</span>
          </Button>
        </div>
      </div>
      <Modal
        confirm
        showClose
        isOpen={state.isReject}
        buttonCenter
        showButtonClose
        showButtonDanger
        captionButtonDanger="Tolak"
        onClose={() => handleButtonAction("close")}
        onCloseButton={() => handleButtonAction("close")}
        onDangerButton={() => handleButtonAction("success")}
        onSuccessButton={() => {
          void router.push("/master-data/beasiswa");
        }}
        content={
          <Input
            labelFontSize="text-[16px]"
            label="Berikan Alasan Anda :"
            placeholder="Contoh: Dokumen tidak valid"
            type="textarea"
          />
        }
      ></Modal>
      <Modal
        confirm
        showClose
        buttonCenter
        isOpen={state.isApprove}
        showButtonClose
        showButtonSuccess
        captionButtonSuccess="Setuju"
        onClose={() => handleButtonAction("close")}
        onCloseButton={() => handleButtonAction("close")}
        onSuccessButton={() => handleButtonAction("success")}
        content=""
      ></Modal>
      <Modal
        success
        isOpen={state.isSuccess}
        buttonCenter
        showButtonSuccess
        captionButtonSuccess="Oke"
        onSuccessButton={() => {
          void router.push("/master-data/beasiswa");
        }}
        content=""
      ></Modal>
    </>
  );
};

export default Example;
