export type TingkatPrestasi = {
  name: string;
  total_prestasi: number;
};

export const TINGKAT_PRESTASI: TingkatPrestasi[] = [
  {
    name: "Internasional",
    total_prestasi: 100,
  },
  {
    name: "Nasional",
    total_prestasi: 321,
  },
  {
    name: "Regional",
    total_prestasi: 222,
  },
];

export const TINGKAT_PRESTASI_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Tingkat Prestasi",
    label: "Tingkat Prestasi",
  },
];