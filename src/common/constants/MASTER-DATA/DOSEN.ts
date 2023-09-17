import { FAKULTAS } from "./FAKULTAS";
import { PRODI } from "./PRODI";

export const DOSEN_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Dosen",
    label: "Dosen",
  },
  {
    key: "nidn",
    className: "col-span-2",
    placeholder: "NIDN Dosen",
    label: "NIDN",
  },
  {
    key: "prodi",
    className: "col-span-2",
    placeholder: "Pilih Prodi",
    label: "Prodi",
    type: "select",
    selectData: PRODI,
  },
  {
    key: "fakultas",
    className: "col-span-2",
    placeholder: "Pilih Fakultas",
    label: "Fakultas",
    type: "select",
    selectData: FAKULTAS,
  },
];
