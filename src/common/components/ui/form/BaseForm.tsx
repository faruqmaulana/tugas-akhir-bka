/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Input from "./Input";

const BaseForm = ({ data }: { data: any }) => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
      {data.map((val: any) => (
        <Input key={val.label} {...val} />
      ))}
    </div>
  );
};

export default BaseForm;
