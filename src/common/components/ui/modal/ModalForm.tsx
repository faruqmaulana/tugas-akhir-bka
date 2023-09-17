import React from "react";
import { type InputPropsType } from "../form/Input";
import BaseForm from "../form/BaseForm";
import { Button } from "../button";

export type ModalFormsType = {
  onSubmit: () => void;
  FORMS: InputPropsType[];
  loadingSubmit: boolean;
  onClose: () => void;
};

const ModalForm = (props: ModalFormsType) => {
  const { onSubmit, onClose, FORMS, loadingSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <BaseForm data={FORMS} />
      <div className="-mb-8 mt-6 flex flex-row items-center justify-end gap-3">
        <Button
          isGray
          isSuccess
          onClick={onClose}
          className="flex w-full max-w-[120px] justify-center py-2"
        >
          Cancel
        </Button>
        <Button
          isSubmit
          isSuccess
          isLoading={loadingSubmit}
          className="flex w-full max-w-[120px] justify-center py-2"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ModalForm;
