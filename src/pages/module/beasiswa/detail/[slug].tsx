/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import MahasiswaActionButton from "~/common/components/ui/button/MahasiswaActionButton";
import ExpandableCard from "~/common/components/ui/card/ExpandableCard";
import BaseDrawer from "~/common/components/ui/drawer/BaseDrawer";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import FullPageLoader from "~/common/components/ui/loader/FullPageLoader";
import EditModalDescription from "~/common/components/ui/modal/EditModalDescription";
import Modal from "~/common/components/ui/modal/Modal";
import StepperVertical from "~/common/components/ui/stepper/StepperVertical";
import renderActionButton from "~/common/helpers/renderActionButton";
import { useScholarshipAction } from "~/common/hooks/module/beasiswa/useScholarshipAction";
import { useCurrentUser } from "~/common/hooks/module/profile";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: { slug: ctx.query.slug } };
});

const ScholarshipDetail = ({ slug }: { slug: string }) => {
  const {
    router,
    scholarship,
    SCHOLARSHIP_FORM,
    EDIT_SCHOLARSHIP_FORM,
    REJECT_SCHOLARSHIP_FORM,
    APPROVE_SCHOLARSHIP_FORM,
    activityLog,
    isLoadingScholarship,
    isDrawerOpen,
    state,
    setDefaultValue,
    setIsDrawerOpen,
    handleButtonAction,
    submitRejectScholarship,
    onRejectScholarship,
    onApproveScholarship,
    submitApproveScholarship,
    onEditScholarship,
    submitEditScholarship,
  } = useScholarshipAction({ slug });

  const { role, isAdmin } = useCurrentUser();
  if (!scholarship) return <FullPageLoader />;

  return (
    <>
      <PageHeading
        title="Detail Pengajuan Beasiswa"
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => {
              void router.push("/module/beasiswa");
            }}
          >
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <ExpandableCard
        dokumenTitle="Dokumen Pengajuan Beasiswa"
        status={scholarship?.status}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        <BaseForm
          isEditForm
          isPreview={isAdmin}
          data={SCHOLARSHIP_FORM}
          className="mb-5"
        />
        {renderActionButton({ status: scholarship?.status, role }) && (
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
        {!isAdmin && !isLoadingScholarship && (
          <MahasiswaActionButton
            onSubmit={submitEditScholarship(onEditScholarship)}
            disableReset={!scholarship}
            handleButtonAction={() => handleButtonAction("edit")}
            FORM_DATA={SCHOLARSHIP_FORM}
            setDefaultValue={() => setDefaultValue()}
            status={scholarship?.status}
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
          <form onSubmit={submitEditScholarship(onEditScholarship)}>
            <EditModalDescription status={scholarship?.status} />
            <BaseForm data={EDIT_SCHOLARSHIP_FORM} />
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
          <form onSubmit={submitRejectScholarship(onRejectScholarship)}>
            <BaseForm data={REJECT_SCHOLARSHIP_FORM} />
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
        captionTitleConfirm="Approve Pengajuan Beasiswa"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={submitApproveScholarship(onApproveScholarship)}>
            <BaseForm data={APPROVE_SCHOLARSHIP_FORM} />
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

export default ScholarshipDetail;
