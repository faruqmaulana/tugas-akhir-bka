import { createTRPCRouter } from "../../../trpc";
import { type Prisma } from "@prisma/client";
import getAllAchievementLevelHandle from "./getAllAchievementLevel.handler";
import deleteAchievementLevelHandle from "./deleteAchievementLevel.handler";
import upsertAchievementLevelHandle from "./upsertAchievementLevel.handler";

export type AllAchievementLevelType =
  Prisma.MasterDataTingkatPrestasiGetPayload<{
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

export const achievementLevelQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllAchievementLevel: getAllAchievementLevelHandle,
  deleteAchievementLevel: deleteAchievementLevelHandle,
  upsertAchievementLevel: upsertAchievementLevelHandle,
});
