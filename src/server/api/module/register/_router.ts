import { type Prisma } from "@prisma/client";
import { createTRPCRouter } from "../../trpc";
import registerNewUserHandler from "./register.handler";

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

export const registerQuery = createTRPCRouter({
  //** REGISTER API HANDLER */
  registerNewUser: registerNewUserHandler
});
