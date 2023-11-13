/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import ArrorLeft from "~/common/components/svg/ArrorLeft";
import { Button } from "~/common/components/ui/button/Button";
import SubmitButton from "~/common/components/ui/button/SubmitButton";
import Card from "~/common/components/ui/card/Card";
import PdfViewer from "~/common/components/ui/file-viewer/PdfViewer";
import BaseForm from "~/common/components/ui/form/BaseForm";
import PageHeading from "~/common/components/ui/header/PageHeading";
import FullPageLoader from "~/common/components/ui/loader/FullPageLoader";
import { useEditBeasiswa } from "~/common/hooks/master-data/useEditBeasiswa";
import { useAddScholarship } from "~/common/hooks/module/beasiswa/useAddScholarship";

// export const getServerSideProps = requireAuth(async (ctx) => {
//   return { props: {} };
// });

const AddScolarship = () => {
  const { ADD_SCHOLARSHIP_FORM, handleSubmit, onSubmit, loading } =
    useAddScholarship();

  const { scholarship } = useEditBeasiswa();
  if (!scholarship) return <FullPageLoader />;

  return (
    <>
      <PageHeading
        title="Form Pengajuan Beasiswa"
        ownButton={
          <Button isMedium isGray className="flex w-fit items-center gap-2">
            <ArrorLeft />
            <span>Kembali</span>
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
        <Card
          className="mt-[20px]"
          header="Form Pengajuan Beasiswa"
          headerClassName="m-auto"
        >
          <BaseForm data={ADD_SCHOLARSHIP_FORM} />
          <SubmitButton loading={loading} />
        </Card>
      </form>
    </>
  );
};

export default AddScolarship;
