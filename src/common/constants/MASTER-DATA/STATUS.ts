export type StatusType = {
  name: string;
  color: string;
};

export const STATUS: StatusType[] = [
  { name: "Diterima", color: "rgb(66 201 151/1)" },
  { name: "Ditolak", color: "#FF7070" },
  { name: "Diajukan Ulang", color: "#FFD580" },
  { name: "Sedang Diproses", color: "#80C0FF" },
];
