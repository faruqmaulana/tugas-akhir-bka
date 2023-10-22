import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

const getScholarshipByIdHandler = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.pengajuanBeasiswa.findUnique({
        where: { id: input },
      });
    } catch (error) {
      return error;
    }
  });

export default getScholarshipByIdHandler;
