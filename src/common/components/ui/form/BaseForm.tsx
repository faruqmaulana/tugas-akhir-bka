/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import Input, { type InputPropsType } from "./Input";

const BaseForm = ({
  data,
  isEditForm,
  className = "",
  isPreview = false
}: {
  data: InputPropsType[];
  isEditForm?: boolean;
  className?: string;
  isPreview?: boolean
}) => {
  return (
    <div
      className={`mx-auto grid h-fit w-full grid-cols-2 gap-3 md:gap-5 ${className}`}
    >
      {data?.map((val: any, index: number) => (
        <Input {...val} key={index} isEditForm={isEditForm} isPreview={isPreview} />
      ))}
    </div>
  );
};

export default BaseForm;
