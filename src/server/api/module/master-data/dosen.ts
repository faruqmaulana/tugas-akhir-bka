import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";

export type AllDosenType = Prisma.DosenGetPayload<{
  include: { prodi: { include: { Fakultas: true } } };
}>[];

export const dosenQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getAllDosen: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.dosen.findMany({
        include: { prodi: { include: { Fakultas: true } } }
      })) as AllDosenType;
    } catch (error) {
      return error;
    }
  }),
});
