import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";
import { userQuery } from "~/server/queries/module/user/user.query";

export type ActivityLogResType = Prisma.ActivityLogGetPayload<{
  include: {
    User: { select: typeof userQuery };
  };
}>[];

export const activityLogQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getModuleLogActivity: protectedProcedure
    .input(z.object({ id: z.string().optional(), type: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      try {
        return (await ctx.prisma.activityLog.findMany({
          where: { prestasiDataTableId: id },
          include: {
            User: { select: userQuery },
          },
        })) as ActivityLogResType;
      } catch (error) {
        return error;
      }
    }),
});
