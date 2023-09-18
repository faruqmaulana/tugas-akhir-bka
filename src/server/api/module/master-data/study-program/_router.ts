import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllStudyProgramHandle from "./getAllStudyProgram.handler";
import deleteStudyProgramHandle from "./deleteStudyProgram.handler";
import upsertStudyProgramHandle from "./upsertStudyProgram.handler";

export type AllStudyProgramType = Prisma.MasterDataProdiGetPayload<{
  select: {
    id: true;
    name: true;
    fakultasId: true;
    Fakultas: true;
    _count: {
      select: {
        user: true;
      };
    };
  };
}>[];

export const studyProgramQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllStudyProgram: getAllStudyProgramHandle,
  deleteStudyProgram: deleteStudyProgramHandle,
  upsertStudyProgram: upsertStudyProgramHandle,
});
