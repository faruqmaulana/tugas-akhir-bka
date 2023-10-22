/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import { useRouter } from "next/router";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { useApproveKejuaraan } from "~/common/hooks/module/kejuaraan/useApproveKejuaraan";
import BaseForm from "~/common/components/ui/form/BaseForm";
import { requireAuth } from "~/common/authentication/requireAuth";
import StepperVertical from "~/common/components/ui/stepper/StepperVertical";
import InfoIcon from "~/common/components/svg/InfoIcon";
import BaseDrawer from "~/common/components/ui/drawer/BaseDrawer";
import { STATUS } from "~/common/enums/STATUS";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import CheckIcon from "~/common/components/svg/CheckIcon";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: { slug: ctx.query.slug } };
});

const Example = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const {
    state,
    handleButtonAction,
    APPROVE_PRESTASI_FORM,
    submitApproveKejuaraan,
    onApproveKejuaraan,
    REJECT_PRESTASI_FORM,
    onRejectKejuaraan,
    submitRejectKejuaraan,
    activityLog,
    renderActionButton,
    isDrawerOpen,
    setIsDrawerOpen,
    EDIT_PRESTASI_FORM,
    onSubmit,
    handleSubmit,
    setDefaultValue,
    prestasi,
    isAdmin,
    isLoadingPrestasiData,
    TRANSFORM_KEJUARAAN,
  } = useApproveKejuaraan({ slug });
  return (
    <>
      <PageHeading
        title="Detail Prestasi lomba dan kejuaraan"
        ownButton={
          <Button
            isLarge
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
      <Card className="mt-[20px]">
        <div className="mb-2 flex flex-wrap justify-between">
          {prestasi?.status === STATUS.APPROVE && (
            <div
              className={`flex flex-wrap items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold opacity-95 
                ${handleBgColor(prestasi?.status)}
                `}
            >
              <p className="font-semibold text-green-600">
                Dokumen Ini Telah Disetujui
              </p>
            </div>
          )}
          <button
            type="button"
            className="ml-auto flex flex-row items-center gap-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <InfoIcon />
            <p className="font-bold text-primary-600">Log Activity</p>
          </button>
        </div>
        <BaseForm isEditForm data={TRANSFORM_KEJUARAAN} />
        {renderActionButton() && (
          <div className="flex flex-row justify-end gap-4">
            <Button
              isLarge
              isDanger
              onClick={() => handleButtonAction("reject")}
            >
              <span>Tolak</span>
            </Button>
            <Button
              isLarge
              isSuccess
              onClick={() => handleButtonAction("approve")}
            >
              <span>Setuju</span>
            </Button>
          </div>
        )}
        {!isAdmin && !isLoadingPrestasiData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-end gap-4">
              <Button
                disabled={!prestasi}
                isSecondary
                isLarge
                onClick={() => setDefaultValue()}
              >
                Reset
              </Button>
              <Button
                isSuccess
                isLarge
                onClick={() => handleButtonAction("edit")}
              >
                {prestasi?.status === STATUS.PROCESSED ||
                prestasi?.status === STATUS.REPROCESS
                  ? "Submit Perubahan"
                  : "Ajukan Ulang"}
              </Button>
            </div>
          </form>
        )}
      </Card>
      <BaseDrawer
        header="Pengajuan Info"
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={setIsDrawerOpen}
        content={<StepperVertical data={activityLog} />}
      />
      <Modal
        confirm
        showClose
        isOpen={state.isReject}
        className="!mb-0"
        captionButtonDanger="Tolak"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitRejectKejuaraan(onRejectKejuaraan)}>
            <BaseForm data={REJECT_PRESTASI_FORM} />
            <div className="mt-5 flex flex-row justify-end gap-4">
              <Button
                isGray
                isLarge
                isDisabled={state.loadingReject}
                onClick={() => handleButtonAction("close")}
              >
                Cancel
              </Button>
              <Button isSubmit isDanger isLarge isLoading={state.loadingReject}>
                Tolak
              </Button>
            </div>
          </form>
        }
      ></Modal>
      <Modal
        confirm
        showClose
        showIconModal={false}
        isOpen={state.isApprove}
        className="!mb-0"
        captionTitleConfirm="Approve Pengajuan Prestasi dan Kejuaraan"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitApproveKejuaraan(onApproveKejuaraan)}>
            <BaseForm data={APPROVE_PRESTASI_FORM} />
            <div className="mt-5 flex flex-row justify-end gap-4">
              <Button
                isGray
                isLarge
                isDisabled={state.loadingApprove}
                onClick={() => handleButtonAction("close")}
              >
                Cancel
              </Button>
              <Button
                isSubmit
                isSuccess
                isLarge
                isLoading={state.loadingApprove}
              >
                Submit
              </Button>
            </div>
          </form>
        }
      ></Modal>
      <Modal
        confirm
        showClose
        isOpen={state.isEdited}
        className="!mb-0"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={handleSubmit(onSubmit)}>
            {prestasi?.status !== STATUS.REJECT &&
              prestasi?.status !== STATUS.APPROVE && (
                <p className="text-center">
                  Anda melakukan perubahan pada dokumen yang sudah diajukan.
                </p>
              )}
            {prestasi?.status === STATUS.APPROVE && (
              <div className="flex flex-col gap-1">
                <p className="text-center">
                  Anda melakukan perubahan pada dokumen yang sudah{" "}
                  <b>disetujui</b>.
                </p>
                <p className="text-center">
                  Apabila anda melanjutkan proses maka status dokumen anda akan
                  diperbarui menjadi <b>Diajukan Ulang</b>.
                </p>
              </div>
            )}
            <BaseForm data={EDIT_PRESTASI_FORM} />
            <div className="mt-5 flex flex-row justify-end gap-4">
              <Button
                isGray
                isLarge
                isDisabled={state.loadingEdited}
                onClick={() => handleButtonAction("close")}
              >
                Cancel
              </Button>
              <Button
                isSubmit
                isSuccess
                isLarge
                isLoading={state.loadingEdited}
              >
                Submit
              </Button>
            </div>
          </form>
        }
      ></Modal>
    </>
  );
};

export default Example;
