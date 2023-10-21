import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getScholarshipHandler from "./getScholarship.handler";
import editScholarshipHandler from "./editScholarship.handler";

export type MasterDataBeasiswaType = Prisma.BeasiswaGetPayload<{
  select: {
    id: true;
    syarat: true;
    templateFormulir: true;
  };
}>;

export const scholarshipQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getScholarship: getScholarshipHandler,
  editScholarship: editScholarshipHandler,
});
