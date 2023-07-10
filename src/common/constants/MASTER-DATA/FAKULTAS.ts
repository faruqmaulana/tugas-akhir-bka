export type FakultasType = {
  name: string;
  total_prodi: number;
};

export const FAKULTAS: FakultasType[] = [
  {
    name: "Teknik",
    total_prodi: 10,
  },
  {
    name: "Ekonomi",
    total_prodi: 8,
  },
  {
    name: "Hukum",
    total_prodi: 6,
  },
  {
    name: "Kedokteran",
    total_prodi: 12,
  },
  {
    name: "Ilmu Sosial dan Ilmu Politik",
    total_prodi: 5,
  },
  {
    name: "Pertanian",
    total_prodi: 7,
  },
  {
    name: "Psikologi",
    total_prodi: 4,
  },
  {
    name: "Ilmu Kesehatan",
    total_prodi: 4,
  },
];

export const FAKULTAS_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Fakultas",
    label: "Fakultas",
  },
];
