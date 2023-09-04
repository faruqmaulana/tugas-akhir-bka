import React from "react";
import { STATUS } from "~/common/enums/STATUS";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import { useCurrentUser } from "~/common/hooks/module/profile";

export type StatusBadgeType = {
  status: string;
  size?: "sm" | "md";
};

const getSizeStyle = (size: StatusBadgeType["size"]) => {
  switch (size) {
    case "sm":
      return "px-2 py-1 text-[10px]";
    case "md":
    default:
      return "px-2 py-1 text-xs";
  }
};

const StatusBadge = (props: StatusBadgeType) => {
  const { status, size = "md" } = props;
  const sizeStyle = getSizeStyle(size);
  const { isAdmin } = useCurrentUser();

  const handleTransformedStatus = () => {
    if (isAdmin && status === STATUS.PROCESSED) return "Baru";

    return status;
  };

  return (
    <div
      className={`rounded-full font-semibold opacity-95 
        ${handleBgColor(handleTransformedStatus())}
        ${sizeStyle}`}
    >
      <p className="w-max">{handleTransformedStatus()}</p>
    </div>
  );
};

export default StatusBadge;
