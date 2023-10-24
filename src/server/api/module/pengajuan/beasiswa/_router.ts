import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import addScholarshipApplicationHandler from "./createShcolarship.handler";
import getScholarshipByIdHandler from "./getScholarshipById.handler";
import { type userQuery } from "~/server/queries/module/user/user.query";
import approveScholarshipHandler from "./approveScholarship.handler";
import rejectScholarshipHandler from "./rejectScholarship.handler";
import editScholarshipHandlder from "./editScholarship.handler";
import getAllScholarshipHandler from "./getAllScholarship.handler";

export type ScholarshipByIdType = Prisma.PengajuanBeasiswaGetPayload<{
  include: {
    ActivityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
  };
}>;

export const scholarshipModule = createTRPCRouter({
  addScholarshipApplication: addScholarshipApplicationHandler,
  getScholarshipById: getScholarshipByIdHandler,
  approveScholarship: approveScholarshipHandler,
  rejectScholarship: rejectScholarshipHandler,
  editScholarship: editScholarshipHandlder,
  getAllScholarship: getAllScholarshipHandler,
});
