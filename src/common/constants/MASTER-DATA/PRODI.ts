import { FAKULTAS } from "./FAKULTAS";

export type ProdiType = {
  id: number;
  name: string;
  fakultas: string;
  jumlah_mahasiswa: number;
};

export const PRODI: ProdiType[] = [
  {
    id: 1,
    name: "Teknik Informatika",
    jumlah_mahasiswa: 200,
    fakultas: "Teknik",
  },
  {
    id: 2,
    name: "Akuntansi",
    jumlah_mahasiswa: 150,
    fakultas: "Ekonomi",
  },
  {
    id: 3,
    name: "Ilmu Komunikasi",
    jumlah_mahasiswa: 180,
    fakultas: "Ilmu Sosial dan Ilmu Politik",
  },
  {
    id: 4,
    name: "Psikologi",
    jumlah_mahasiswa: 120,
    fakultas: "Psikologi",
  },
  {
    id: 5,
    name: "Manajemen",
    jumlah_mahasiswa: 250,
    fakultas: "Ekonomi",
  },
  {
    id: 6,
    name: "Arsitektur",
    jumlah_mahasiswa: 90,
    fakultas: "Teknik",
  },
  {
    id: 7,
    name: "Teknik Sipil",
    jumlah_mahasiswa: 160,
    fakultas: "Teknik",
  },
];

export const PRODI_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Prodi",
    label: "Prodi",
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
