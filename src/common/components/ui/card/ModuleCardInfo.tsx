import React, { type Dispatch, type SetStateAction } from "react";
import InfoIcon from "../../svg/InfoIcon";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import { STATUS } from "~/common/enums/STATUS";
import ExpandIcon from "../../svg/ExpandIcon";
import { useCurrentUser } from "~/common/hooks/module/profile";

export type ModuleCardInfoType = {
  dokumenTitle: string;
  status?: string;
  setIsDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
};

const ModuleCardInfo = (props: ModuleCardInfoType) => {
  const { dokumenTitle, status, setIsDrawerOpen, isExpanded, setIsExpanded } =
    props;

  const { isAdmin } = useCurrentUser();

  return (
    <div className="flex flex-col">
      <div className="flex mb-4 flex-wrap justify-between">
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
        <div className="ml-auto flex flex-row items-center gap-3">
          {setIsExpanded && isAdmin && (
            <ExpandIcon onClick={() => setIsExpanded(!isExpanded)} />
          )}
          {setIsDrawerOpen && (
            <button
              type="button"
              className="flex flex-row items-center gap-2"
              onClick={() => setIsDrawerOpen(true)}
            >
              <InfoIcon />
              <p className="font-bold text-primary-600">Log Activity</p>
            </button>
          )}
        </div>
      </div>
      {isAdmin && (
        <p className="mb-4 text-center text-lg font-bold lg:text-xl">
          {dokumenTitle}
        </p>
      )}
    </div>
  );
};

export default ModuleCardInfo;
