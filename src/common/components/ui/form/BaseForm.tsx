/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import Input, { type InputPropsType } from "./Input";

const BaseForm = ({
  data,
  isEditForm,
  className = "",
  isPreview = false,
  isLoading = false,
}: {
  data: InputPropsType[];
  isEditForm?: boolean;
  className?: string;
  isPreview?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={`mx-auto grid h-fit w-full grid-cols-2 gap-3 md:gap-5 ${className}`}
    >
      {data?.map((val: InputPropsType) => (
        <Input
          {...val}
          key={val.placeholder}
          isEditForm={isEditForm}
          isPreview={isPreview}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default BaseForm;
