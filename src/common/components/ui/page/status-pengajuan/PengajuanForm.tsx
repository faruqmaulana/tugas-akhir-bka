import React from "react";
import Input from "../../form/Input";
import { PENGAJUAN_FORM } from "./PENGAJUAN";

const PengajuanForm = () => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
      {PENGAJUAN_FORM.map((val) => (
        <Input key={val.label} {...val} />
      ))}
    </div>
  );
};

export default PengajuanForm;
