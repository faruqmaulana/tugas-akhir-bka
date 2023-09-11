/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditIcon } from "lucide-react";
import React from "react";

const CustomEditIcon = (props: any) => {
  const { disabled } = props;
  return (
    <div
      className={`m-auto ml-2 cursor-pointer rounded-lg border bg-slate-100 p-[8px] ${
        disabled ? "border-slate-600 hover:bg-slate-200" : "border-slate-400"
      }`}
      {...props}
    >
      <EditIcon
        width={16}
        height={16}
        className={disabled ? "text-slate-600" : "text-slate-400"}
      />
    </div>
  );
};

export default CustomEditIcon;
