/* eslint-disable @typescript-eslint/ban-types */
import { type GetResult } from "@prisma/client/runtime";
import { type Prisma } from "@prisma/client";

export type Prodi =
  | (GetResult<
      { id: string; name: string; fakultasId: string | null },
      any
    > & {})
  | null;

export type UserProfileType = Prisma.UserGetPayload<{
  include: { prodi: { include: { Fakultas: true } } };
}>;

export const userQuery = {
  id: true,
  name: true,
  alamat: true,
  email: true,
  npm: true,
  role: true,
  phone: true,
  prodiId: true,
  semester: true,
  Buku: true,
  activityLog: true,
  prestasiDataTables: true,
  PengajuanBeasiswa: true,
  password: false,
  prodi: {
    include: {
      Fakultas: true,
    },
  },
};
