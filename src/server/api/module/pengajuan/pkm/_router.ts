import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import { type userQuery } from "~/server/queries/module/user/user.query";
import editHakiHandler from "./editPKM.handler";
import getAllPatenAndHakiHandler from "./getAllPKM.handler";
import addPKMHandler from "./createPKM.handler";
import getPKMByIdHandler from "./getPKMById.handler";
import rejectPKMHandler from "./rejectPKM.handler";
import approvePKMHandler from "./approvePKM.handler";
import editPKMHandler from "./editPKM.handler";

export type PKMByIdType = Prisma.PengajuanPKMGetPayload<{
  include: {
    activityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
    users: true;
    suratKeputusan: true
  };
}>;

export const pkmModule = createTRPCRouter({
  addPKMApplication: addPKMHandler,
  getAllPatenAndHaki: getAllPatenAndHakiHandler,
  getPKMById: getPKMByIdHandler,
  rejectPKM: rejectPKMHandler,
  approvePKM: approvePKMHandler,
  editPKM: editPKMHandler,
});
