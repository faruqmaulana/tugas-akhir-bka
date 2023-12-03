import React, { useState, type FormEvent } from "react";
import { Button } from "./Button";
import ModalPreviewModule from "../modal/ModalPreviewModule";
import { type InputPropsType } from "../form/Input";
import { STATUS } from "~/common/enums/STATUS";

export type MahasiswaActionButtonType = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setDefaultValue: () => void;
  disableReset: boolean;

  // preview action type
  FORM_DATA: InputPropsType[];
  handleButtonAction: () => void;
  status?: string;
};

const MahasiswaActionButton = (props: MahasiswaActionButtonType) => {
  const {
    status,
    onSubmit,
    FORM_DATA,
    setDefaultValue,
    handleButtonAction,
    disableReset,
  } = props;
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col xs:flex-row justify-end gap-4">
        <div className="flex flex-row gap-4 w-full xs:w-fit">
          <Button
            isLarge
            isSecondary
            className="!max-w-full xs:!max-w-fit"
            disabled={disableReset}
            onClick={() => setDefaultValue()}
          >
            Reset
          </Button>
          <ModalPreviewModule
            className="w-full !max-w-full xs:!max-w-fit"
            title="Prestasi Lomba & Kejuaraan"
            isOpen={isPreviewOpen}
            handleOpen={() => setIsPreviewOpen(true)}
            handleClose={() => setIsPreviewOpen(false)}
            data={FORM_DATA}
          />
        </div>
        <Button
          isLarge
          isSuccess
          className="!max-w-full xs:!max-w-fit"
          onClick={handleButtonAction}
        >
          {status === STATUS.PROCESSED || status === STATUS.REPROCESS
            ? "Submit Perubahan"
            : "Ajukan Ulang"}
        </Button>
      </div>
    </form>
  );
};

export default MahasiswaActionButton;
