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
  DUMMY_KEJUARAAN,
  type KejuaraanData,
} from "~/common/constants/DUMMY_KEJUARAAN";

const INITIAL_STATE = {
  isReject: false,
  isApprove: false,
  isSuccess: false,
};

const Example = () => {
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);
  const {
    nama,
    dosen,
    noSK,
    tanggalSK,
    orkem,
    kegiatan,
    tanggalKegiatan,
    penyelenggara,
    tingkatKejuaraan,
    tingkatPrestasi,
  } = DUMMY_KEJUARAAN[0] as KejuaraanData;

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
        title="Detail Prestasi lomba dan kejuaraan"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/kejuaraan");
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
            <span className="col-span-4">: {nama}</span>
            <span className="col-span-2 font-semibold">NBI</span>
            <span className="col-span-4">: 1462000447</span>
            <span className="col-span-2 font-semibold">Semester</span>
            <span className="col-span-4">: 6</span>
            <span className="col-span-2 font-semibold">Prodi</span>
            <span className="col-span-4">: Teknik Informatika</span>
            <span className="col-span-2 font-semibold">Fakultas</span>
            <span className="col-span-4">: Teknik</span>
            <span className="col-span-2 font-semibold">Judul</span>
            <span className="col-span-4">: Desain Sistem Kontrol Otomatis</span>
            <span className="col-span-2 font-semibold">Deskripsi</span>
            <span className="col-span-4">
              : Mendesain sistem pengendalian suhu dalam industri.
            </span>
            <span className="col-span-2 font-semibold">Dosen</span>
            <span className="col-span-4">: {dosen}</span>
            <span className="col-span-2 font-semibold">Tanggal Kegiatan</span>
            <span className="col-span-4">: {tanggalKegiatan}</span>
            <span className="col-span-2 font-semibold">
              Anggaran yang diajukan
            </span>
            <span className="col-span-4">: Rp. 1.000.000</span>
            <span className="col-span-2 font-semibold">Lampiran</span>
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
