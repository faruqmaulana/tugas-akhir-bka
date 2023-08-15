import { FAKULTAS } from "./FAKULTAS";
import { PRODI } from "./PRODI";

export type DosenType = {
  name: string;
  nidn: string;
  fakultas: string;
  prodi: string;
};

export const DOSEN: DosenType[] = [
  {
    name: "Dr. Budi Santoso",
    nidn: "0012345678",
    fakultas: "Teknik",
    prodi: "Teknik Elektro",
  },
  {
    name: "Prof. Retno Wulandari",
    nidn: "0098765432",
    fakultas: "Ekonomi",
    prodi: "Manajemen",
  },
  {
    name: "Drs. Slamet Riyadi",
    nidn: "0054321098",
    fakultas: "Ilmu Kesehatan",
    prodi: "Farmasi",
  },
  {
    name: "Ir. Dewi Anggraeni",
    nidn: "0032109876",
    fakultas: "Hukum",
    prodi: "Ilmu Hukum",
  },
  {
    name: "Dr. Ali Akbar",
    nidn: "0076543210",
    fakultas: "Kedokteran",
    prodi: "Kedokteran Umum",
  },
];

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
