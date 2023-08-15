import React from "react";
import Input from "../../form/Input";
import { PENGAJUAN_FORM } from "~/common/constants/MASTER-DATA/STATUS";

const PengajuanForm = ({ data = PENGAJUAN_FORM, showValue = true }) => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
      {data.map((val) => (
        <Input {...val} key={val.label} showValue={showValue} />
      ))}
    </div>
  );
};

export default PengajuanForm;
