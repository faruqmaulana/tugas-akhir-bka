/* eslint-disable @typescript-eslint/require-await */
import { useRouter } from "next/router";
import { requireAuth } from "~/common/authentication/requireAuth";
import EditIcon from "~/common/components/svg/EditIcon";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PdfViewer from "~/common/components/ui/file-viewer/PdfViewer";
import PageHeading from "~/common/components/ui/header/PageHeading";
import FullPageLoader from "~/common/components/ui/loader/FullPageLoader";
import Modal from "~/common/components/ui/modal/Modal";
import { useEditBeasiswa } from "~/common/hooks/master-data/useEditBeasiswa";

export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});

const Example = () => {
  const router = useRouter();
  const { scholarship } = useEditBeasiswa();

  if (!scholarship) return <FullPageLoader />;

  return (
    <>
      <PageHeading />
      <div className="flex flex-col gap-5">
        <Card>
          <div
            className="prose min-w-full"
            dangerouslySetInnerHTML={{ __html: scholarship?.syarat || "" }}
          />
        </Card>
        <Card header="Template Formulir Pengajuan Beasiswa">
          <PdfViewer
            className="mt-2"
            url={
              (scholarship?.templateFormulir as PrismaJson.FileResponse)
                ?.secure_url
            }
          />
          <p className="mt-5 text-red-500">
            **Note: Template formulir ini digunakan ketika mahasiswa mengajukan
            beasiswa
          </p>
        </Card>
        <Button
          title="Edit Dokumen"
          isMedium
          isSecondary
          className="ml-auto flex w-fit items-center gap-2 text-center"
          onClick={() => {
            void router.push("/master-data/beasiswa/edit");
          }}
        >
          <EditIcon />
          <span>Edit</span>
        </Button>
      </div>
      <Modal isOpen={false} content="asd"></Modal>
    </>
  );
};

export default Example;
