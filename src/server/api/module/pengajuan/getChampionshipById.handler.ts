import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { type KejuaraanByIdType } from "./_router";
import { userQuery } from "~/server/queries/module/user/user.query";

const getChampionshipByIdHandler = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return (await ctx.prisma.prestasiDataTable.findUnique({
      where: { id: input },
      include: {
        lampiran: true,
        users: { select: { userId: true, keterangan: true } },
        activityLog: {
          include: {
            User: { select: userQuery },
          },
        },
      },
    })) as KejuaraanByIdType;
  });

export default getChampionshipByIdHandler;
