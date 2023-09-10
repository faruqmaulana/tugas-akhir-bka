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
    KEJUARAAN_FORM,
    EDIT_PRESTASI_FORM,
    onSubmit,
    handleSubmit,
    setDefaultValue,
    prestasi,
    isAdmin,
    isLoadingPrestasiData,
  } = useApproveKejuaraan({ slug });

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
      <Card className="mt-[20px]">
        <button
          type="button"
          className="ml-auto flex flex-row items-center gap-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          <InfoIcon />
          <p className="font-bold text-primary-600">Log Activity</p>
        </button>
        <BaseForm isEditForm data={KEJUARAAN_FORM} />
        {renderActionButton() && (
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
        )}
        {!isAdmin && !isLoadingPrestasiData && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mr-auto flex flex-row gap-4">
              <Button
                disabled={!prestasi}
                isSecondary
                isMedium
                onClick={() => setDefaultValue()}
              >
                Reset
              </Button>
              <Button
                isSuccess
                isMedium
                onClick={() => handleButtonAction("edit")}
              >
                {prestasi?.status === STATUS.PROCESSED
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
        content={
          <form onSubmit={submitRejectKejuaraan(onRejectKejuaraan)}>
            <BaseForm data={REJECT_PRESTASI_FORM} />
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
                isDanger
                isMedium
                isLoading={state.loadingReject}
              >
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
      <Modal
        confirm
        showClose
        isOpen={state.isEdited}
        className="!mb-0"
        content={
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center">
              Anda melakukan perubahan pada dokumen yang sudah diajukan.
            </p>
            <BaseForm data={EDIT_PRESTASI_FORM} />
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
