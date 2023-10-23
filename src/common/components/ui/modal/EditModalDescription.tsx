import React from "react";
import { STATUS } from "~/common/enums/STATUS";

const EditModalDescription = ({ status }: { status?: string }) => {
  return (
    <div className="flex flex-col">
      {status !== STATUS.REJECT && status !== STATUS.APPROVE && (
        <p className="text-center">
          Anda melakukan perubahan pada dokumen yang sudah diajukan.
        </p>
      )}
      {status === STATUS.APPROVE && (
        <div className="flex flex-col gap-1">
          <p className="text-center">
            Anda melakukan perubahan pada dokumen yang sudah <b>disetujui</b>.
          </p>
          <p className="text-center">
            Apabila anda melanjutkan proses maka status dokumen anda akan
            diperbarui menjadi <b>Diajukan Ulang</b>.
          </p>
        </div>
      )}
    </div>
  );
};

export default EditModalDescription;
