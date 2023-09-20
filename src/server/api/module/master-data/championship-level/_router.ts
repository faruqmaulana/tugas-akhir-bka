import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllChampionshipLevelHandle from "./getAllChampionshipLevel.handler";
import deleteChampionshipLevelHandle from "./deleteChampionshipLevel.handler";
import upsertChampionshipLevelHandle from "./upsertChampionshipLevel.handler";

export type AllChampionshipLevelType =
  Prisma.MasterDataTingkatKejuaraanGetPayload<{
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

export const championshipLevelQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllChampionshipLevel: getAllChampionshipLevelHandle,
  deleteChampionshipLevel: deleteChampionshipLevelHandle,
  upsertChampionshipLevel: upsertChampionshipLevelHandle,
});
