/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import { useRouter } from "next/router";
import { Button } from "~/common/components/ui/button/Button";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { useApproveKejuaraan } from "~/common/hooks/module/kejuaraan/useApproveKejuaraan";
import BaseForm from "~/common/components/ui/form/BaseForm";
import StepperVertical from "~/common/components/ui/stepper/StepperVertical";
import BaseDrawer from "~/common/components/ui/drawer/BaseDrawer";
import EditModalDescription from "~/common/components/ui/modal/EditModalDescription";
import ExpandableCard from "~/common/components/ui/card/ExpandableCard";
import MahasiswaActionButton from "~/common/components/ui/button/MahasiswaActionButton";
import { requireAuth } from "~/common/authentication/requireAuth";

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
    handleOpenPreview,
    handleClosePreview,
    isPreviewOpen,
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
      <ExpandableCard
        status={prestasi?.status}
        setIsDrawerOpen={setIsDrawerOpen}
        dokumenTitle="Dokumen Prestasi lomba dan kejuaraan"
      >
        <BaseForm
          isEditForm
          isPreview={isAdmin}
          isLoading={!prestasi}
          data={TRANSFORM_KEJUARAAN}
        />
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
          <MahasiswaActionButton
            onSubmit={handleSubmit(onSubmit)}
            disableReset={!prestasi}
            handleButtonAction={() => handleButtonAction("edit")}
            FORM_DATA={TRANSFORM_KEJUARAAN}
            setDefaultValue={() => setDefaultValue()}
            status={prestasi?.status}
          />
        )}
      </ExpandableCard>
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
            <EditModalDescription status={prestasi?.status} />
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
