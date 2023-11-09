import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import { type userQuery } from "~/server/queries/module/user/user.query";
import addHakiHandler from "./createHaki.handler";
import getHakiByIdHandler from "./getHakiById.handler";
import rejectHakiHandler from "./rejectHaki.handler";
import approveHakiHandler from "./approveHaki.handler";
import editHakiHandler from "./editHaki.handler";
import getAllPatenAndHakiHandler from "./getAllHaki.handler";

export type HakiByIdType = Prisma.PatenAndHakiTableGetPayload<{
  include: {
    PengajuanOnUsers: { select: { userId: true; keterangan: true } };
    ActivityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
  };
}>;

export const hakiModule = createTRPCRouter({
  addHakiApplication: addHakiHandler,
  getAllPatenAndHaki: getAllPatenAndHakiHandler,
  getHakiById: getHakiByIdHandler,
  rejectHaki: rejectHakiHandler,
  approveHaki: approveHakiHandler,
  editHaki: editHakiHandler,
});
