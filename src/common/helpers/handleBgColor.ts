export const handleBgColor = (status: string): string => {
  if (status === "Disetujui") return "#42C997";
  if (status === "Ditolak") return "#FF7070";
  if (status === "Diajukan Ulang") return "#FFD580";
  if (status === "Sedang Diproses") return "#80C0FF";

  return "";
};
