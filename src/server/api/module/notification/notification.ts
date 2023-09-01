import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";
import { z } from "zod";

export type AllNotificationType = Prisma.NotificationGetPayload<{
  include: {
    notificationMessage: {
      include: { createdBy: { include: { prodi: true } } };
    };
  };
}>[];

export const notificationQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getUserNotif: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.notification.findMany({
        where: { userId: ctx.session.user.userId },
        include: {
          notificationMessage: {
            include: { createdBy: { select: userQuery } },
          },
        },
      })) as AllNotificationType;
    } catch (error) {
      return error;
    }
  }),

  //** UPDATE READED DATA */
  updateNotification: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notification.update({
          where: { id: input },
          data: {
            readed: true,
          },
        });
      } catch (error) {
        return error;
      }
    }),

  //** DELETE NOTIFICATION */
  deleteSingleNotification: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notification.delete({
          where: { id: input },
        });
      } catch (error) {
        return error;
      }
    }),
});
