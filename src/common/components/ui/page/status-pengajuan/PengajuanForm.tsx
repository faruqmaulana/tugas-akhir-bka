import React from "react";
import Input from "../../form/Input";
import { PENGAJUAN_FORM } from "./PENGAJUAN";

const PengajuanForm = ({ data = PENGAJUAN_FORM }) => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
      {data.map((val) => (
        <Input {...val} key={val.label} />
      ))}
    </div>
  );
};

export default PengajuanForm;
