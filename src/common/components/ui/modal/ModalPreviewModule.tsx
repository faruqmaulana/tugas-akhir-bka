import React from "react";
import Modal from "./Modal";
import BaseForm from "../form/BaseForm";
import { type InputPropsType } from "../form/Input";
import { Button } from "../button";

const ModalPreviewModule = ({
  isOpen,
  handleClose,
  handleOpen,
  data,
  title,
  className,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  data: InputPropsType[];
  title?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Button
        isPurple
        isSuccess
        isMedium
        onClick={handleOpen}
        className={`${className || ""} ml-auto`}
      >
        Preview
      </Button>
      <Modal
        modalLarge
        showClose
        modalScroll
        title={title ? `Preview Dokumen ${title}` : undefined}
        isOpen={isOpen}
        className="!mb-0"
        onClose={handleClose}
        buttonCenter
        content={<BaseForm isPreview data={data} />}
      ></Modal>
    </div>
  );
};

export default ModalPreviewModule;
{
}
