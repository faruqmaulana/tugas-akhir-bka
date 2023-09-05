/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter } from "next/router";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Input from "~/common/components/ui/form/Input";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import {
  DUMMY_KEJUARAAN,
  type KejuaraanData,
} from "~/common/constants/DUMMY_KEJUARAAN";
import { useApproveKejuaraan } from "~/common/hooks/module/kejuaraan/useApproveKejuaraan";
import BaseForm from "~/common/components/ui/form/BaseForm";
import { requireAuth } from "~/common/authentication/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Example = () => {
  const router = useRouter();
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

  const {
    state,
    handleButtonAction,
    APPROVE_PRESTASI_FORM,
    submitApproveKejuaraan,
    onApproveKejuaraan,
  } = useApproveKejuaraan();

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
          <div className="-mt-9 grid grid-cols-12 gap-2 py-5">
            <span className="col-span-2 font-semibold">Nama Mahasiswa</span>
            <span className="col-span-3">: {nama}</span>
            <span className="col-span-2 font-semibold">NBI</span>
            <span className="col-span-5">: 1462000447</span>
            <span className="col-span-2 font-semibold">Prodi</span>
            <span className="col-span-3">: Teknik Informatika</span>
            <span className="col-span-2 font-semibold">Fakultas</span>
            <span className="col-span-5">: Teknik</span>
            <span className="col-span-2 font-semibold">Dosen</span>
            <span className="col-span-3">: {dosen}</span>
            <span className="col-span-2 font-semibold">No SK</span>
            <span className="col-span-5">: {noSK}</span>
            <span className="col-span-2 font-semibold">Tanggal SK</span>
            <span className="col-span-3">: {tanggalSK}</span>
            <span className="col-span-2 font-semibold">
              Organisasi Kemahasiswaan
            </span>
            <span className="col-span-5">: {orkem}</span>
            <span className="col-span-2 font-semibold">Kegiatan</span>
            <span className="col-span-3">: {kegiatan}</span>
            <span className="col-span-2 font-semibold">Tanggal Kegiatan</span>
            <span className="col-span-5">: {tanggalKegiatan}</span>
            <span className="col-span-2 font-semibold">Penyelenggara</span>
            <span className="col-span-3">: {penyelenggara}</span>
            <span className="col-span-2 font-semibold">Tingkat</span>
            <span className="col-span-5">: {tingkatKejuaraan}</span>
            <span className="col-span-2 font-semibold">Prestasi</span>
            <span className="col-span-3">: {tingkatPrestasi}</span>
            {/* <span className="col-span-12 font-semibold">
              Piagam Penghargaan
            </span>
            <span className="col-span-12">
              <iframe
                className="h-[600px] w-full"
                // src="https://drive.google.com/uc?id=1WCEiV1Ovxga261bLEs_rlNoS4I0hANiN"
                src="https://drive.google.com/uc?id=1iSoVWRPyyQVJ_tn0oMGNs8Bttw7u6UtP"
                title="Embedded Google Drive File"
              ></iframe>
            </span>
            <span className="col-span-2 font-semibold">
              Foto Penyerahan Piala
            </span>
            <span className="col-span-10">:</span>
            <span className="col-span-12">
              <iframe
                className="h-[600px] w-full"
                src="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
              ></iframe>
            </span>
            <span className="col-span-2 font-semibold">Undangan Kejuaraan</span>
            <span className="col-span-10">:</span>
            <span className="col-span-12">
              <iframe
                className="h-[600px] w-full"
                src="https://www.buds.com.ua/images/Lorem_ipsum.pdf"
              ></iframe>
            </span> */}
          </div>
          <div className="mr-auto flex flex-row gap-4">
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
        showIconModal={false}
        isOpen={state.isApprove}
        className="!mb-0"
        captionTitleConfirm="Approve Pengajuan Prestasi dan Kejuaraan"
        // showButtonClose
        // showButtonSuccessx
        // captionButtonSuccess="Setuju"
        // onCloseButton={() => handleButtonAction("close")}
        // onSuccessButton={() => handleButtonAction("success")}
        content={
          <form onSubmit={submitApproveKejuaraan(onApproveKejuaraan)}>
            <BaseForm data={APPROVE_PRESTASI_FORM} />
            <div className="flex flex-row justify-end gap-4">
              <Button
                isGray
                isMedium
                onClick={() => handleButtonAction("close")}
              >
                Cancel
              </Button>
              <Button
                isSubmit
                isSuccess
                isMedium
                isLoading={state.loadingApprove}
              >
                Submit
              </Button>
            </div>
          </form>
        }
      ></Modal>
      {/* <Modal
        success
        isOpen={state.isSuccess}
        buttonCenter
        showButtonSuccess
        captionButtonSuccess="Oke"
        onSuccessButton={() => {
          handleButtonAction("close")
          void router.push("/master-data/beasiswa");
        }}
        content=""
      ></Modal> */}
    </>
  );
};

export default Example;
