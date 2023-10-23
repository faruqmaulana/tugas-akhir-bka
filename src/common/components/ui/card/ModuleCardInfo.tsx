import React, { type Dispatch, type SetStateAction } from "react";
import InfoIcon from "../../svg/InfoIcon";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import { STATUS } from "~/common/enums/STATUS";

type ModuleCardInfoType = {
  status?: string;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const ModuleCardInfo = (props: ModuleCardInfoType) => {
  const { status, setIsDrawerOpen } = props;
  return (
    <div className="mb-2 flex flex-wrap justify-between">
      {status === STATUS.APPROVE && (
        <div
          className={`flex flex-wrap items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold opacity-95 ${handleBgColor(
            status
          )}`}
        >
          <p className="font-semibold text-green-600">
            Dokumen Ini Telah Disetujui
          </p>
        </div>
      )}
      <button
        type="button"
        className="ml-auto flex flex-row items-center gap-2"
        onClick={() => setIsDrawerOpen(true)}
      >
        <InfoIcon />
        <p className="font-bold text-primary-600">Log Activity</p>
      </button>
    </div>
  );
};

export default ModuleCardInfo;
