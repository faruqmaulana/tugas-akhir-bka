export type StatusType = {
  id: number;
  name: string;
  color: string;
  [key: string]: any;
};

export const STATUS: StatusType[] = [
  { id: 1, name: "Disetujui", color: "#42C997" },
  { id: 2, name: "Ditolak", color: "#FF7070" },
  { id: 3, name: "Diajukan Ulang", color: "#FFD580" },
  { id: 4, name: "Sedang Diproses", color: "#80C0FF" },
];

export const PENGAJUAN_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama",
    label: "Nama Status",
  },
  {
    key: "color",
    className: "col-span-2 w-fit",
    placeholder: "Warna",
    label: "Pilih Warna",
    type: "color",
  },
];
