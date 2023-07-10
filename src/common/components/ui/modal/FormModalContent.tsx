/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import BaseForm from "../form/BaseForm";

export type FormModalType = {
  success: boolean;
  createAction: boolean;
  initialData: any;
  updateFormData: any;
  content: string | undefined | null;
};

const FormModalContent = (props: FormModalType) => {
  const { success, content, createAction, initialData, updateFormData } = props;
  if (success) return <p className="text-center xl:text-lg">{content}</p>;
  if (createAction) return <BaseForm data={initialData} />;

  return <BaseForm data={updateFormData} />;
};

export default FormModalContent;
