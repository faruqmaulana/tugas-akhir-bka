import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";

export const tingkatKejuaraanQuery = createTRPCRouter({
  //** GET ALL ORKEM */
  getAllTingkatKejuaraan: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataTingkatKejuaraan.findMany()) as Prisma.MasterDataTingkatKejuaraanSelect;
    } catch (error) {
      return error;
    }
  }),
});
