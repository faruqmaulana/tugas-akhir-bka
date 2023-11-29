import React from "react";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import { useStatus } from "~/common/hooks/module/status/useStatus";

export type StatusBadgeType = {
  className?: string;
  text?: string;
  status: string;
  size?: "xs" | "sm" | "md";
};

export const getSizeStyle = (size: StatusBadgeType["size"]) => {
  switch (size) {
    case "xs":
      return "px-2 text-[10px]";
    case "sm":
      return "px-2 py-1 text-[10px]";
    case "md":
    default:
      return "px-2 py-1 text-xs";
  }
};

const StatusBadge = (props: StatusBadgeType) => {
  const { className, text, status, size = "md" } = props;
  const sizeStyle = getSizeStyle(size);
  const { handleTransformedStatus } = useStatus();

  return (
    <div
      className={`rounded-full font-semibold opacity-95
        ${className || ""}
        ${handleBgColor(handleTransformedStatus({ status }))}
        ${sizeStyle}`}
    >
      <p className="w-max">{text ?? handleTransformedStatus({ status })}</p>
    </div>
  );
};

export default StatusBadge;
