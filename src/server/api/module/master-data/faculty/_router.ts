import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllFacultyHandle from "./getAllFaculty.handler";
import deleteFacultyHandle from "./deleteFaculty.handler";
import upsertFacultyHandle from "./upsertFaculty.handler";

export type AllFacultyType = Prisma.MasterDataFakultasGetPayload<{
  include: {
    prodi: true;
  };
}>[];

export const facultyQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllFaculty: getAllFacultyHandle,
  deleteFaculty: deleteFacultyHandle,
  upsertFaculty: upsertFacultyHandle,
});
