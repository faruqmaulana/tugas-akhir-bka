import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import addScholarshipApplicationHandler from "./createShcolarship.handler";
import getScholarshipByIdHandler from "./getScholarshipById.handler";

// export type MasterDataBeasiswaType = Prisma.MasterDataBeasiswaGetPayload<{
//   select: {
//     id: true;
//     syarat: true;
//     templateFormulir: true;
//   };
// }>;

export const scholarshipModule = createTRPCRouter({
  addScholarshipApplication: addScholarshipApplicationHandler,
  getScholarshipById: getScholarshipByIdHandler,
});
