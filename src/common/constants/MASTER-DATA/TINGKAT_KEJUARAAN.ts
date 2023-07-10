export type TingkatKejuaraan = {
  name: string;
  total_kejuaraan: number;
};

export const TINGKAT_KEJUARAAN: TingkatKejuaraan[] = [
  {
    name: "Internasional",
    total_kejuaraan: 100,
  },
  {
    name: "Nasional",
    total_kejuaraan: 321,
  },
  {
    name: "Regional",
    total_kejuaraan: 222,
  },
];

export const TINGKAT_KEJUARAAN_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Tingkat Kejuaraan",
    label: "Tingkat Kejuaraan",
  },
];
