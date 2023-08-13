export type Prodi = {
  id: string;
  name: string;
  fakultasId: string;
};

export type UserProfileType = {
  name: string;
  alamat: string | undefined;
  email: string;
  npm: string;
  role: string;
  phone: string;
  prodi: Prodi;
  prodiId: string;
  semester: string;
  Buku: any[]; // You can replace "any" with a more specific type if needed
  activityLog: any[]; // You can replace "any" with a more specific type if needed
  prestasiDataTables: any[]; // You can replace "any" with a more specific type if needed
  PengajuanBeasiswa: any[]; // You can replace "any" with a more specific type if needed
};

export const userQuery = {
  name: true,
  alamat: true,
  email: true,
  npm: true,
  role: true,
  phone: true,
  prodi: true,
  prodiId: true,
  semester: true,
  Buku: true,
  activityLog: true,
  prestasiDataTables: true,
  PengajuanBeasiswa: true,
  password: false,
};
