export const handleBgColor = (status: string): string => {
  if (status === "Disetujui")
    return "border border-green-500 bg-green-50 text-green-600";
  if (status === "Aktif") return "border border-sky-500 bg-sky-50 text-sky-600";
  if (status === "Ditolak")
    return "border border-red-500 bg-red-50 text-red-600";
  if (status === "Diajukan Ulang")
    return "border border-orange-500 bg-orange-50 text-orange-600";
  if (status === "Sedang Diproses")
    return "border border-yellow-500 bg-yellow-50 text-yellow-600";
  if (status === "Baru")
    return "border border-indigo-500 bg-indigo-50 text-indigo-600";

  return "";
};
