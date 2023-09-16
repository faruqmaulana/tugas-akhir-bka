/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from "@prisma/client";

import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { protectedProcedure } from "../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { handleDocumentMetaToJSON } from "~/common/libs/handle-document-data";
import {
  MOUDLE_KEJUARAAN,
  PENGAJUAN_EDITED_BY_ADMIN_SIDE,
  PENGAJUAN_EDITED_BY_USER_SIDE,
  PENGAJUAN_REPROCESS_BY_ADMIN_SIDE,
  PENGAJUAN_REPROCESS_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import {
  EDIT_PRESTASI_AND_LOMBA,
  REPROCESS_PRESTASI_AND_LOMBA,
} from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./prestasi";
import { userQuery } from "~/server/queries/module/user/user.query";

 const editChampionshipHanlder = protectedProcedure
  .input(pengajuanPrestasiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        prestasiDataTableId,
        catatan,

        // THESE LAMPIRAN PAYLOAD
        dokumenPendukung,
        fotoPenyerahanPiala,
        piagamPenghargaan,
        undanganKejuaraan,

        // PRESTASI DATA TABLE PAYLOAD
        kegiatan,
        tanggalKegiatan,
        penyelenggara,
        dosenId,
        orkemId,
        tingkatKejuaraanId,
        tingkatPrestasiId,
        status,

        // PENGAJUAN ON USER PAYLOAD
        users: selectedUsers,
        currentUserName,
      } = input;
      const isReprocessMsg =
        status === STATUS.REJECT || status === STATUS.APPROVE;
      const handleUpdateStatus = () => {
        if (status === STATUS.PROCESSED || status === STATUS.EDITED) {
          return STATUS.EDITED;
        }
        return STATUS.REPROCESS;
      };

      // ** UPDATE NEW PRESTASI DATA TABLE
      const updatedPrestasiDataTable =
        await ctx.prisma.prestasiDataTable.update({
          where: { id: prestasiDataTableId },
          include: {
            users: true,
          },
          data: {
            status: handleUpdateStatus(),
            kegiatan,
            tanggalKegiatan,
            penyelenggara,
            dosenId,
            orkemId,
            tingkatKejuaraanId,
            tingkatPrestasiId,
          },
        });

      // ** UPDATE A LAMPIRAN DATA FIRST TO GET A LAMPIRAN ID
      await ctx.prisma.lampiranData.update({
        where: { id: updatedPrestasiDataTable.lampiranId },
        data: handleDocumentMetaToJSON({
          dokumenPendukung,
          fotoPenyerahanPiala,
          piagamPenghargaan,
          undanganKejuaraan,
        }),
      });

      await ctx.prisma.pengajuanOnUsers.deleteMany({
        where: {
          AND: {
            prestasiDataTableId,
            userId: {
              in: updatedPrestasiDataTable.users.map((val) => val.userId),
            },
          },
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: selectedUsers.map((val) => {
          return {
            dosenId,
            userId: val.value,
            keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
            prestasiDataTableId,
          };
        }),
      });

      // //** FIND NOTIFICATION MESSAGE */
      const notificationMessage = await ctx.prisma.notifMessage.findFirst({
        where: { moduleId: prestasiDataTableId },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Notification: { include: { User: { select: userQuery } } },
        },
      });

      // //** FILTERS NOT RELATED USER * //
      const filteredDeletedUsers = notificationMessage?.Notification.filter(
        (val) => {
          return (
            val.User.role !== "ADMIN" &&
            !selectedUsers.some((subval) => subval.value === val.userId)
          );
        }
      );
      // //** FILTER AND MERGE ADMIN AND RELATED USER * //
      const getAllAdmin = notificationMessage!.Notification.filter(
        (val) => val.User.role === Role.ADMIN
      );
      const transformedAdmin = getAllAdmin.map((val) => val.userId);
      const transformedUsers = selectedUsers.map((val) => val.value);
      const mergeAdminAndRelatedUsers = [
        ...transformedAdmin,
        ...transformedUsers,
      ];

      // //** DELETE NOTIFICATION THAT NOT RELATED USER * //
      await ctx.prisma.notification.deleteMany({
        where: {
          AND: {
            userId: { in: filteredDeletedUsers?.map((val) => val.userId) },
            notificationMessage: { moduleId: prestasiDataTableId },
          },
        },
      });

      // //** ADD NOTIFICATION MESSAGE */
      const createNotificationMessage = await ctx.prisma.notifMessage.create({
        data: {
          catatan,
          status: handleUpdateStatus(),
          module: notificationMessage!.module,
          moduleId: notificationMessage!.moduleId,
          description: notificationMessage!.description,
          forUserMessage: isReprocessMsg
            ? PENGAJUAN_REPROCESS_BY_USER_SIDE(MOUDLE_KEJUARAAN)
            : PENGAJUAN_EDITED_BY_USER_SIDE(MOUDLE_KEJUARAAN),
          forAdminMessage: isReprocessMsg
            ? PENGAJUAN_REPROCESS_BY_ADMIN_SIDE(MOUDLE_KEJUARAAN)
            : PENGAJUAN_EDITED_BY_ADMIN_SIDE(MOUDLE_KEJUARAAN),
          actionByMahasiswaId: notificationMessage!.actionByMahasiswaId,
          actionByAdminId: ctx.session.user.userId,
          userInfo: notificationMessage?.userInfo,
        },
      });

      // //** ADD ACTIVITY LOG */
      const createActivityLog = await ctx.prisma.activityLog.create({
        data: {
          catatan,
          prestasiDataTableId,
          userId: ctx.session.user.userId,
          status: handleUpdateStatus(),
        },
      });

      // //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
      await ctx.prisma.notification.createMany({
        data: mergeAdminAndRelatedUsers.map((val: string) => {
          return {
            notificationMessageId: createNotificationMessage.id,
            userId: val,
            activityLogId: createActivityLog.id,
          };
        }),
      });

      return {
        message: isReprocessMsg
          ? REPROCESS_PRESTASI_AND_LOMBA
          : EDIT_PRESTASI_AND_LOMBA,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });


export default editChampionshipHanlder