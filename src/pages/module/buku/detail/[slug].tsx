/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import { Button } from "~/common/components/ui/button/Button";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import BaseForm from "~/common/components/ui/form/BaseForm";
import StepperVertical from "~/common/components/ui/stepper/StepperVertical";
import BaseDrawer from "~/common/components/ui/drawer/BaseDrawer";
import EditModalDescription from "~/common/components/ui/modal/EditModalDescription";
import renderActionButton from "~/common/helpers/renderActionButton";
import { useCurrentUser } from "~/common/hooks/module/profile";
import ExpandableCard from "~/common/components/ui/card/ExpandableCard";
import MahasiswaActionButton from "~/common/components/ui/button/MahasiswaActionButton";
import { useBookAction } from "~/common/hooks/module/book/useBookAction";

const Example = ({ slug }: { slug: string }) => {
  const {
    router,
    data,
    DISPLAYED_FORM,
    EDIT_FORM,
    REJECT_FORM,
    APPROVE_FORM,
    activityLog,
    isLoadingData,
    isDrawerOpen,
    state,
    setDefaultValue,
    setIsDrawerOpen,
    handleButtonAction,
    submitRejectHaki,
    submitApprove,
    submitEdit,
    onReject,
    onApprove,
    onEdit,
  } = useBookAction({ slug });

  const { role, isAdmin } = useCurrentUser();

  return (
    <>
      <PageHeading
        title="Detail Pengajuan Buku"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/buku");
            }}
          >
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <ExpandableCard
        dokumenTitle="Dokumen Pengajuan Buku"
        status={data?.status}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        <BaseForm
          isEditForm
          isLoading={!data}
          isPreview={isAdmin}
          data={DISPLAYED_FORM}
          className="mb-5"
        />
        {renderActionButton({ status: data?.status, role }) && (
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
        {!isAdmin && !isLoadingData && (
          <MahasiswaActionButton
            onSubmit={submitEdit(onEdit)}
            disableReset={!data}
            handleButtonAction={() => handleButtonAction("edit")}
            FORM_DATA={DISPLAYED_FORM}
            setDefaultValue={() => setDefaultValue()}
            status={data?.status}
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
        isOpen={state.isEdited}
        className="!mb-0"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitEdit(onEdit)}>
            <EditModalDescription status={data?.status} />
            <BaseForm data={EDIT_FORM} />
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
      <Modal
        confirm
        showClose
        isOpen={state.isReject}
        className="!mb-0"
        captionButtonDanger="Tolak"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitRejectHaki(onReject)}>
            <BaseForm data={REJECT_FORM} />
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
        captionTitleConfirm="Approve Pengajuan Buku"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitApprove(onApprove)}>
            <BaseForm data={APPROVE_FORM} />
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
    </>
  );
};

export default Example;
