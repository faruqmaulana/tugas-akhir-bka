import React from "react";
import { handleBgColor } from "~/common/helpers/handleBgColor";

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

  return (
    <div
      className={`rounded-full font-semibold opacity-95 
        ${handleBgColor(status)}
        ${sizeStyle}`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
