/* eslint-disable @typescript-eslint/ban-types */
import { type GetResult } from "@prisma/client/runtime";

export type Prodi =
  | (GetResult<
      { id: string; name: string; fakultasId: string | null },
      any
    > & {})
  | null;

export type UserProfileType = {
  name: string;
  alamat: string | null;
  email: string;
  npm: string | null;
  role: string;
  phone: string | null;
  prodi: Prodi;
  prodiId: string | null;
  semester: string | null;
  Buku: any[]; // You can replace "any" with a more specific type if needed
  activityLog: any[]; // You can replace "any" with a more specific type if needed
  prestasiDataTables: any[]; // You can replace "any" with a more specific type if needed
  PengajuanBeasiswa: any[]; // You can replace "any" with a more specific type if needed
} & {};

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
