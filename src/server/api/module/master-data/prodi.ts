import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";

export type AllMasterDataProdiType = Prisma.MasterDataProdiGetPayload<{
  include: { Fakultas: true };
}>[];

export const prodiQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllProdi: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataProdi.findMany({
        include: { Fakultas: true },
      })) as AllMasterDataProdiType;
    } catch (error) {
      return error;
    }
  }),
});
