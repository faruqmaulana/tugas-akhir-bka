import { createTRPCRouter } from "../../trpc";
import { type Prisma } from "@prisma/client";

import { type userQuery } from "~/server/queries/module/user/user.query";
import getChampionshipByIdHandler from "./getChampionshipById.handler";
import getAllChampionshipHandler from "./getAllChampionship.handler";
import createChampionshipHandler from "./createChampionship.handler";
import approveChampionshipHandler from "./approveChampionship.handler";
import rejectChampionshipHandler from "./rejectChampionship.handler";
import editChampionshipHanlder from "./editChampionship.handler";

export type SuccessPengajuanOnUsersType = {
  message: string;
  data: Prisma.PengajuanOnUsersSelect;
};

export type KejuaraanByIdType = Prisma.PrestasiDataTableGetPayload<{
  include: {
    lampiran: true;
    users: { select: { userId: true; keterangan: true } };
    activityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
  };
}>;

export const prestasiLombaQuery = createTRPCRouter({
  //** GET KEJUARAAN BY ID */
  getKejuaraanById: getChampionshipByIdHandler,

  //** GET ALL KEJUARAAN */
  getAllKejuaraan: getAllChampionshipHandler,

  //** CREATE PRODI */
  createPrestasiLomba: createChampionshipHandler,

  //** ADMIN ACTION => APPROVE CHAMPHIONSHIP */
  approvePengajuanPrestasi: approveChampionshipHandler,

  //** ADMIN ACTION */
  rejectPengajuanPrestasi: rejectChampionshipHandler,

  //** MAHASISWA ACTION */
  editPengajuanPrestasi: editChampionshipHanlder,
});
