export const getUserLead = (isKetua: boolean): string => {
  if (isKetua) return "Ketua Tim";

  return "Anggota";
};

export const getUserLeadBoolean = (isKetua: string): boolean => {
  if (isKetua === "Ketua Tim") return true;

  return false;
};
