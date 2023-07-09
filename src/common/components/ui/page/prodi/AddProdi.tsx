import React from "react";
import Input from "../../form/Input";
import { ADD_PRODI_FORM } from "./PRODI_FORM";

const AddProdi = () => {
  return (
    <div className="mx-auto mb-5 grid h-fit w-full grid-cols-2 gap-5">
      {ADD_PRODI_FORM.map((val) => (
        <Input key={val.label} {...val} />
      ))}
    </div>
  );
};

export default AddProdi;
