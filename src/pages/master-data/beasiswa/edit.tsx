/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */

import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import dynamic from "next/dynamic";
import Input from "~/common/components/ui/form/Input";
import { requireAuth } from "~/common/authentication/requireAuth";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useEditBeasiswa } from "~/common/hooks/master-data/useEditBeasiswa";
import BaseForm from "~/common/components/ui/form/BaseForm";
import ArrorLeft from "~/common/components/svg/ArrorLeft";

const DynamicEditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false, // Ensure the component is not rendered on the server
  }
);

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Example = () => {
  const {
    router,
    loading,
    onSubmit,
    editorState,
    SCHOLARSHIP_FORM,
    handleSubmit,
    onEditorStateChange,
  } = useEditBeasiswa();

  return (
    <>
      <PageHeading
        ownButton={
          <Button
            isMedium
            isGray
            className="flex w-fit items-center gap-2"
            onClick={() => router.push("/master-data/beasiswa/")}
          >
            <ArrorLeft />
            <span>Kembali</span>
          </Button>
        }
      />
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <h1 className="text-[20px] font-semibold text-gray-700">
              Form Edit Syarat dan Ketentuan Pengajuan Beasiswa
            </h1>
            <div className="mt-3 overflow-visible rounded-lg border border-gray-400 p-2">
              {typeof window !== "undefined" && (
                <DynamicEditor
                  wrapperClassName="prose min-w-full"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              )}
            </div>
            <h1 className="mt-5 text-[20px] font-semibold text-gray-700">
              Form Upload Template Formulir Pengajuan Beasiswa
            </h1>
            <BaseForm data={SCHOLARSHIP_FORM} />
          </Card>
          <div className="mt-3 flex w-full flex-row justify-end gap-4">
            <Button
              title="Cancel"
              isMedium
              isGray
              className="w-fit"
              onClick={() => {
                void router.push("/master-data/beasiswa");
              }}
            >
              <span>Cancel</span>
            </Button>
            <Button
              isSubmit
              title="Save"
              isMedium
              isSuccess
              className="w-fit"
              isLoading={loading}
            >
              <span>Save</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Example;
