import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllLecturerHandle from "./getAllLecturer.handler";
import createLecturerHandle from "./createLecturer.handler";
import deleteLecturerHandle from "./deleteLecturer.handler";

export type AllDosenType = Prisma.DosenGetPayload<{
  include: { prodi: { include: { Fakultas: true } } };
}>[];

export const dosenQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllDosen: getAllLecturerHandle,
  createLecturer: createLecturerHandle,
  deleteLecturee: deleteLecturerHandle,
  update: getAllLecturerHandle,
});
