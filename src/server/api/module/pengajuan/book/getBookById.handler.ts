import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { userQuery } from "~/server/queries/module/user/user.query";

const getBookByIdHandler = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.buku.findUnique({
        where: { id: input },
        include: {
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

export default getBookByIdHandler;
