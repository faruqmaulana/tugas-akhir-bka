import { rejectPrestasiForm } from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { protectedProcedure } from "../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { userQuery } from "~/server/queries/module/user/user.query";
import {
  MOUDLE_KEJUARAAN,
  PENGAJUAN_REJECTED_BY_ADMIN_SIDE,
  PENGAJUAN_REJECTED_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { REJECT_PRESTASI_AND_LOMBA } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./prestasi";

const rejectChampionshipHandler = protectedProcedure
  .input(rejectPrestasiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { prestasiDataTableId, catatan } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.prestasiDataTable.update({
        where: {
          id: prestasiDataTableId,
        },
        data: {
          status: STATUS.REJECT,
          updatedAt: new Date(),
        },
      });

      //** FIND NOTIFICATION MESSAGE */
      const notificationMessage = await ctx.prisma.notifMessage.findFirst({
        where: { moduleId: prestasiDataTableId },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Notification: { include: { User: { select: userQuery } } },
        },
      });

      //** ADD NOTIFICATION MESSAGE */
      const createNotificationMessage = await ctx.prisma.notifMessage.create({
        data: {
          catatan,
          status: STATUS.REJECT,
          module: notificationMessage!.module,
          moduleId: notificationMessage!.moduleId,
          description: notificationMessage!.description,
          forUserMessage: PENGAJUAN_REJECTED_BY_USER_SIDE(MOUDLE_KEJUARAAN),
          forAdminMessage: PENGAJUAN_REJECTED_BY_ADMIN_SIDE(MOUDLE_KEJUARAAN),
          actionByMahasiswaId: notificationMessage!.actionByMahasiswaId,
          actionByAdminId: ctx.session.user.userId,
          userInfo: notificationMessage?.userInfo,
        },
      });

      //** ADD ACTIVITY LOG */
      const createActivityLog = await ctx.prisma.activityLog.create({
        data: {
          catatan,
          prestasiDataTableId,
          userId: ctx.session.user.userId,
          status: STATUS.REJECT,
        },
      });

      //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
      await ctx.prisma.notification.createMany({
        data: notificationMessage!.Notification.map(
          (val: { userId?: string }) => {
            return {
              notificationMessageId: createNotificationMessage.id,
              userId: val.userId as string,
              activityLogId: createActivityLog.id,
            };
          }
        ),
      });

      return {
        message: REJECT_PRESTASI_AND_LOMBA,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default rejectChampionshipHandler;
