import { STATUS } from "../enums/STATUS";

export const handleBgColor = (status: string): string => {
  if (status === STATUS.APPROVE)
    return "border border-green-500 bg-green-50 text-green-600";
  if (status === STATUS.ACTIVE)
    return "border border-sky-500 bg-sky-50 text-sky-600";
  if (status === STATUS.REJECT)
    return "border border-red-500 bg-red-50 text-red-600";
  if (status === STATUS.REPROCESS)
    return "border border-orange-500 bg-orange-50 text-orange-600";
  if (status === STATUS.PROCESSED)
    return "border border-yellow-500 bg-yellow-50 text-yellow-600";
  if (status === "Baru")
    return "border border-indigo-500 bg-indigo-50 text-indigo-600";

  return "";
};

export const handleTextColor = (status: string): string => {
  if (status === STATUS.APPROVE) return "text-green-600";
  if (status === STATUS.ACTIVE) return "text-sky-600";
  if (status === STATUS.REJECT) return "text-red-600";
  if (status === STATUS.REPROCESS) return "text-orange-600";
  if (status === STATUS.PROCESSED) return "text-yellow-600";
  if (status === "Baru") return "text-indigo-600";

  return "";
};
