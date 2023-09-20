/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { type Prisma } from "@prisma/client";

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
  password: false,
  prodi: {
    include: {
      Fakultas: true,
    },
  },
  
};
