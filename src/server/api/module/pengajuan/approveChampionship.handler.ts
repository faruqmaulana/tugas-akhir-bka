/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { approvePrestasiForm } from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { protectedProcedure } from "../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import {
  MOUDLE_KEJUARAAN,
  PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE,
  PENGAJUAN_ACCEPTED_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { APPROVE_PRESTASI_AND_LOMBA } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./prestasi";
import { userQuery } from "~/server/queries/module/user/user.query";

const approveChampionshipHandler = protectedProcedure
  .input(approvePrestasiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { noSK, tanggalSK, catatan, prestasiDataTableId } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.prestasiDataTable.update({
        where: {
          id: prestasiDataTableId,
        },
        data: {
          noSK,
          tanggalSK,
          status: STATUS.APPROVE,
          updatedAt: new Date(),
        },
      });

      //** ADD NOTIFICATION MESSAGE */
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
          status: STATUS.APPROVE,
          module: notificationMessage!.module,
          moduleId: notificationMessage!.moduleId,
          description: notificationMessage!.description,
          forUserMessage: PENGAJUAN_ACCEPTED_BY_USER_SIDE(MOUDLE_KEJUARAAN),
          forAdminMessage: PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE(MOUDLE_KEJUARAAN),
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
          status: STATUS.APPROVE,
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
        message: APPROVE_PRESTASI_AND_LOMBA,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveChampionshipHandler;
