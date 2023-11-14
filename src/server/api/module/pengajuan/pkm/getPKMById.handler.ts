import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { userQuery } from "~/server/queries/module/user/user.query";

const getPKMByIdHandler = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.pengajuanPKM.findUnique({
        where: { id: input },
        include: {
          activityLog: {
            include: {
              User: { select: userQuery },
            },
          },
          users: true,
        },
      });
    } catch (error) {
      return error;
    }
  });

export default getPKMByIdHandler;
