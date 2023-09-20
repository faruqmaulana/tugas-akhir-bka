import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllStudentOrganizationHandle from "./getAllStudentOrganization.handler";
import deleteStudentOrganizationHandle from "./deleteStudentOrganization.handler";
import upsertStudentOrganizationHandle from "./upsertStudentOrganization.handler";

export type AllStudentOrganizationType = Prisma.MasterDataOrkemGetPayload<{
  select: {
    id: true;
    name: true;
    _count: {
      select: {
        PrestasiDataTable: true;
      };
    };
  };
}>[];

export const studentOrganizationQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllStudentOrganization: getAllStudentOrganizationHandle,
  deleteStudentOrganization: deleteStudentOrganizationHandle,
  upsertStudentOrganization: upsertStudentOrganizationHandle,
});
