export type Orkem = {
  name: string;
  total_kejuaraan: number;
};

export const ORKEM: Orkem[] = [
  {
    name: "Pataga",
    total_kejuaraan: 100,
  },
  {
    name: "Pencak Silat",
    total_kejuaraan: 55,
  },
  {
    name: "E-sport",
    total_kejuaraan: 44,
  },
];

export const ORKEM_FORM = [
  {
    key: "name",
    className: "col-span-2",
    placeholder: "Nama Organisasi Kemahasiswaan",
    label: "Organisasi Kemahasiswaan",
  },
];
