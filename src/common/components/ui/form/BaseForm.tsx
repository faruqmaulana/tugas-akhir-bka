/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import Input, { type InputPropsType } from "./Input";

const BaseForm = ({
  data,
  isEditForm,
}: {
  data: InputPropsType[];
  isEditForm?: boolean;
}) => {
  return (
    <div className="mx-auto grid h-fit w-full grid-cols-2 gap-3 md:gap-5">
      {data?.map((val: any, index: number) => (
        <Input {...val} key={index} isEditForm={isEditForm} />
      ))}
    </div>
  );
};

export default BaseForm;
