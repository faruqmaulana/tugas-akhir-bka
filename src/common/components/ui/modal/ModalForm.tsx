import React from "react";
import { type InputPropsType } from "../form/Input";
import BaseForm from "../form/BaseForm";
import { Button } from "../button";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";

export type ModalFormsType = {
  onSubmit: () => void;
  FORMS: InputPropsType[];
  loadingSubmit: boolean;
  onClose: () => void;
  formTitle?: string;
};

const ModalForm = (props: ModalFormsType) => {
  const { onSubmit, onClose, FORMS, loadingSubmit, formTitle } = props;

  return (
    <form onSubmit={onSubmit}>
      {formTitle && (
        <p className="text mb-4 text-center text-2xl font-semibold">
          Form {capitalizeFirstLetter(formTitle)}
        </p>
      )}
      <BaseForm data={FORMS} />
      <div className="mt-6 flex flex-row items-center justify-end gap-3">
        <Button
          isGray
          isSuccess
          onClick={onClose}
          isDisabled={loadingSubmit}
          className="flex w-full max-w-[120px] justify-center py-2"
        >
          Batal
        </Button>
        <Button
          isSubmit
          isSuccess
          isLoading={loadingSubmit}
          className="flex w-full max-w-[120px] justify-center py-2"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default ModalForm;
