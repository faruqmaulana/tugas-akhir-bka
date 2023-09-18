import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllLecturerHandle from "./getAllLecturer.handler";
import deleteLecturerHandle from "./deleteLecturer.handler";
import upsertLecturerHandle from "./upsertLecturer.handler";

export type AllDosenType = Prisma.DosenGetPayload<{
  include: {
    prodi: { include: { Fakultas: true } };
    prestasiDataTable: true;
  };
}>[];

export const lecturerQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllDosen: getAllLecturerHandle,
  deleteLecturer: deleteLecturerHandle,
  upsertLecturer: upsertLecturerHandle,
});
