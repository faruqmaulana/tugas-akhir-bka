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
import {
  PENGAJUAN_BEASISWA,
  type PengajuanBeasiswa,
} from "~/common/constants/module/PENGAJUAN_BEASISWA";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import {
  DATA_HAKI,
  DATA_PATEN,
  type PatenType,
  type HAKI,
} from "~/common/constants/DUMMY_PATEN_HAKI";

const INITIAL_STATE = {
  isReject: false,
  isApprove: false,
  isSuccess: false,
};

const Example = () => {
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);
  const {
    Abstrak,
    DaerahPerlindungan,
    Dosen,
    Fakultas,
    Gambar,
    Jenis,
    JudulPaten,
    Klaim,
    Klasifikasi,
    MasaBerlaku,
    NBI,
    NomorPaten,
    PemegangPaten,
    PenulisPenemu,
    Prodi,
    Semester,
    Status,
    TanggalDiberikan,
    TanggalPengajuan,
  } = DATA_PATEN[0] as PatenType;

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
      <PageHeading
        title="Detail Haki"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/haki");
            }}
          >
            <ArrorLeft />
            <span>Kembali</span>
          </Button>
        }
      />
      <div className="flex flex-col gap-5">
        <Card>
          <div className="ml-auto flex flex-row gap-4">
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
          <div className="-mt-9 grid grid-cols-12 gap-2">
            <span className="col-span-2 font-semibold">Nama Mahasiswa</span>
            <span className="col-span-10">: {PemegangPaten}</span>
            <span className="col-span-2 font-semibold">NBI</span>
            <span className="col-span-10">: {NBI}</span>
            <span className="col-span-2 font-semibold">Prodi</span>
            <span className="col-span-10">: {Prodi}</span>
            <span className="col-span-2 font-semibold">Fakultas</span>
            <span className="col-span-10">: {Fakultas}</span>
            <span className="col-span-2 font-semibold">Semester</span>
            <span className="col-span-10">: {Semester}</span>
            <span className="col-span-2 font-semibold">Judul Paten</span>
            <span className="col-span-10">: {JudulPaten}</span>
            <span className="col-span-2 font-semibold">Jenis Paten</span>
            <span className="col-span-10">: {Jenis}</span>
            <span className="col-span-2 font-semibold">Nomor Paten</span>
            <span className="col-span-10">: {NomorPaten}</span>
            <span className="col-span-2 font-semibold">Pemegang Paten</span>
            <span className="col-span-10">: {PemegangPaten}</span>
            <span className="col-span-2 font-semibold">Abstrak</span>
            <span className="col-span-10">: {Abstrak}</span>
            <span className="col-span-2 font-semibold">Klaim</span>
            <span className="col-span-10">: {Klaim}</span>
            <span className="col-span-2 font-semibold">Tanggal Pengajuan</span>
            <span className="col-span-10">: {TanggalPengajuan}</span>
            <span className="col-span-2 font-semibold">Tanggal Diberikan</span>
            <span className="col-span-10">: - </span>
            <span className="col-span-2 font-semibold">Masa Berlaku</span>
            <span className="col-span-10">: {MasaBerlaku}</span>
            <span className="col-span-2 font-semibold">
              Daerah Perlindungan
            </span>
            <span className="col-span-10">: {DaerahPerlindungan}</span>
            <span className="col-span-2 font-semibold">Status</span>
            <span className="col-span-10">: Dalam Proses</span>
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
            label="*Berikan Alasan Anda :"
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
        content={
          <Input
            labelFontSize="text-[16px]"
            label="*Tambahkan Catatan :"
            placeholder="Contoh: Dana Beasiswa Akan Cair Tanggal 12 Mei 2023. Diharapkan datang ke kantor BKA setelah dana beasiswa cair."
            type="textarea"
          />
        }
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