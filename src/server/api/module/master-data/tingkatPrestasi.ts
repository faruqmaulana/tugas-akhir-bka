import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";

export const tingkatPrestasiQuery = createTRPCRouter({
  //** GET ALL ORKEM */
  getAllTingkatPrestasi: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataTingkatPrestasi.findMany({
        orderBy: { name: "asc" },
      })) as Prisma.MasterDataTingkatPrestasiSelect;
    } catch (error) {
      return error;
    }
  }),
});
