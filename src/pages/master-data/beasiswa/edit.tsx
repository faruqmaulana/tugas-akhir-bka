/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useRouter } from "next/router";
import { Button } from "~/common/components/ui/button/Button";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import Input from "~/common/components/ui/form/Input";
import { UPDATE_SUCCESS } from "~/common/constants/MESSAGE";
const DynamicEditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false, // Ensure the component is not rendered on the server
  }
);
const Example = () => {
  const router = useRouter();
  const defaultValue = `hello world`;
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const contentState = ContentState.createFromText(defaultValue);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleOpenSuccess = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccessOpen(true);
    }, 500);
  };

  const handleSubmit = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <PageHeading />
      <div className="flex flex-col gap-5">
        <Card>
          <h1 className="text-[20px] font-semibold text-gray-700">
            Form Edit Syarat dan Ketentuan Pengajuan Beasiswa
          </h1>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-400 p-2">
            {typeof window !== "undefined" && (
              <DynamicEditor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                editorStyle={{ borderBlock: "red" }}
              />
            )}
          </div>
          <h1 className="mt-5 text-[20px] font-semibold text-gray-700">
            Form Upload Template Formulir Pengajuan Beasiswa
          </h1>
          <Input placeholder="" type="file" />
        </Card>
        <div className="ml-auto flex flex-row gap-4">
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
            title="Save"
            isMedium
            isSuccess
            className="w-fit"
            onClick={handleSubmit}
          >
            <span>Save</span>
          </Button>
        </div>
      </div>
      <Modal
        confirm
        showClose
        buttonCenter
        isOpen={isOpen}
        onClose={onClose}
        showButtonConfirm
        showButtonClose
        onCloseButton={onClose}
        onConfirmButton={handleOpenSuccess}
        content={
          <p className="text-center">
            Pastikan data yang anda perbarui sudah benar!
          </p>
        }
      ></Modal>
      <Modal
        success
        isOpen={isSuccessOpen}
        buttonCenter
        showButtonSuccess
        onSuccessButton={() => {
          void router.push("/master-data/beasiswa");
        }}
        content={<p className="text-center">{UPDATE_SUCCESS}</p>}
      ></Modal>
    </>
  );
};

export default Example;
