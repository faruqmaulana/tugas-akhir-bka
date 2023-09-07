import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { type Prisma } from "@prisma/client";
import { z } from "zod";
import { NOTIFICATION_ACTION } from "~/common/hooks/core/useNotification";

export const notificationQueryData = {
  select: {
    id: true,
    status: true,
    module: true,
    moduleId: true,
    description: true,
    forUserMessage: true,
    forAdminMessage: true,
    createdAt: true,
    prestasiDataTableId: true,
    catatan: true,
    actionByAdminId: true,
    actionByMahasiswaId: true,
    userInfo: true,
    Notification: {
      select: {
        User: {
          select: { ...userQuery, prestasiDataTables: false },
        },
      },
    },
  },
};

export type AllNotificationType = Prisma.NotificationGetPayload<{
  select: {
    id: true;
    readed: true;
    notificationMessage: typeof notificationQueryData;
  };
}>[];

export type NotificationType =
  AllNotificationType[0]["notificationMessage"]["Notification"];

export const notificationQuery = createTRPCRouter({
  //** GET ALL PRODI */
  getUserNotif: protectedProcedure.query(async ({ ctx }) => {
    try {
      return (await ctx.prisma.notification.findMany({
        where: { userId: ctx.session.user.userId },
        select: {
          id: true,
          readed: true,
          notificationMessage: notificationQueryData,
        },
        orderBy: {
          createdAt: "desc",
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

  actionToAllNotification: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        if (input === NOTIFICATION_ACTION.MARK_ALL_NOTIFICATION) {
          await ctx.prisma.notification.updateMany({
            where: { userId: ctx.session.user.userId },
            data: {
              readed: true,
            },
          });
          return;
        }

        if (input === NOTIFICATION_ACTION.DELETE_ALL_NOTIFICATION) {
          await ctx.prisma.notification.deleteMany({
            where: { userId: ctx.session.user.userId },
          });
          return;
        }
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
