import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllLecturerHandle from "./getAllLecturer.handler";
import createLecturerHandle from "./createLecturer.handler";
import deleteLecturerHandle from "./deleteLecturer.handler";
import updateLecturerHandle from "./updateLecturer.handler";

export type AllDosenType = Prisma.DosenGetPayload<{
  include: { prodi: { include: { Fakultas: true } } };
}>[];

export const lecturerQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllDosen: getAllLecturerHandle,
  createLecturer: createLecturerHandle,
  deleteLecturer: deleteLecturerHandle,
  updateLecturer: updateLecturerHandle,
});
