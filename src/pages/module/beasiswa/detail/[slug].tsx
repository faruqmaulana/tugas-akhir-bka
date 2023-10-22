/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import SubmitButton from "~/common/components/ui/button/SubmitButton";
import Card from "~/common/components/ui/card/Card";
import PdfViewer from "~/common/components/ui/file-viewer/PdfViewer";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import FullPageLoader from "~/common/components/ui/loader/FullPageLoader";
import Modal from "~/common/components/ui/modal/Modal";
import { useEditBeasiswa } from "~/common/hooks/master-data/useEditBeasiswa";
import { useAddScholarship } from "~/common/hooks/module/beasiswa/useAddScholarship";
import { useScholarshipAction } from "~/common/hooks/module/beasiswa/useScrolarshipAction";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: { slug: ctx.query.slug } };
});

const ScholarshipDetail = ({ slug }: { slug: string }) => {
  const { ADD_SCHOLARSHIP_FORM, handleSubmit, onSubmit, loading } =
    useAddScholarship();
  const {} = useScholarshipAction({slug})
  const { scholarship } = useEditBeasiswa();
  if (!scholarship) return <FullPageLoader />;

  return (
    <>
      <PageHeading
        title="Form Pengajuan Beasiswa"
        ownButton={
          <Button isMedium isGray className="flex w-fit items-center gap-2">
            <ArrorLeft />
            <span>Batal</span>
          </Button>
        }
      />
      <Card>
        <div
          className="prose min-w-full"
          dangerouslySetInnerHTML={{ __html: scholarship?.syarat || "" }}
        />
      </Card>
      <Card header="Template Formulir Pengajuan Beasiswa" className="-mt-8">
        <PdfViewer
          className="mt-2"
          url={
            (scholarship?.templateFormulir as PrismaJson.FileResponse)
              ?.secure_url
          }
        />
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-[20px]">
          <BaseForm data={ADD_SCHOLARSHIP_FORM} />
          <SubmitButton loading={loading} />
        </Card>
      </form>

      <Modal
        confirm
        showClose
        isOpen={state.isEdited}
        className="!mb-0"
        onClose={() => handleButtonAction("close")}
        content={
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center">
              Anda melakukan perubahan pada dokumen yang sudah diajukan.
            </p>
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

export default ScholarshipDetail;
