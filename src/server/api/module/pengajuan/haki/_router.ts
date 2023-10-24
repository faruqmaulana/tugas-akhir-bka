import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import { type userQuery } from "~/server/queries/module/user/user.query";
import addHakiHandler from "./createHaki.handler";

export type ScholarshipByIdType = Prisma.PengajuanBeasiswaGetPayload<{
  include: {
    ActivityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
  };
}>;

export const hakiModule = createTRPCRouter({
  addHakiApplication: addHakiHandler,
});
