import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";

export const orkemQuery = createTRPCRouter({
  //** GET ALL ORKEM */
  getAllOrkem: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataOrkem.findMany()) as Prisma.MasterDataOrkemSelect;
    } catch (error) {
      return error;
    }
  }),
});
