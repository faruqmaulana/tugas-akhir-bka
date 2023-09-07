/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import Input from "./Input";

const BaseForm = ({ data }: { data: any }) => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-3 md:gap-5">
      {data.map((val: any, index: number) => (
        <Input {...val} key={index} />
      ))}
    </div>
  );
};

export default BaseForm;
