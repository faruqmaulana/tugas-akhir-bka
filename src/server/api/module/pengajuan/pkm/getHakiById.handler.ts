import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { userQuery } from "~/server/queries/module/user/user.query";

const getHakiByIdHandler = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.patenAndHakiTable.findUnique({
        where: { id: input },
        include: {
          PengajuanOnUsers: { select: { userId: true, keterangan: true } },
          ActivityLog: {
            include: {
              User: { select: userQuery },
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  });

export default getHakiByIdHandler;
