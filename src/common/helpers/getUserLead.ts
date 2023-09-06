export const getUserLead = (isKetua: boolean): string => {
  if (isKetua) return "Ketua Tim";

  return "Anggota";
};
