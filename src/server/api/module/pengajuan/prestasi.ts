/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  ADD_PRESTASI_LOMBA_SUCCESS,
  APPROVE_PRESTASI_AND_LOMBA,
  EDIT_PRESTASI_AND_LOMBA,
  REJECT_PRESTASI_AND_LOMBA,
  REPROCESS_PRESTASI_AND_LOMBA,
} from "~/common/message";
import { Role, type Prisma } from "@prisma/client";
import {
  approvePrestasiForm,
  rejectPrestasiForm,
} from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { STATUS } from "~/common/enums/STATUS";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import {
  MOUDLE_KEJUARAAN,
  PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE,
  PENGAJUAN_ACCEPTED_BY_USER_SIDE,
  PENGAJUAN_EDITED_BY_ADMIN_SIDE,
  PENGAJUAN_EDITED_BY_USER_SIDE,
  PENGAJUAN_MESSAGE_BY_ADMIN_SIDE,
  PENGAJUAN_MESSAGE_BY_USER_SIDE,
  PENGAJUAN_REJECTED_BY_ADMIN_SIDE,
  PENGAJUAN_REJECTED_BY_USER_SIDE,
  PENGAJUAN_REPROCESS_BY_ADMIN_SIDE,
  PENGAJUAN_REPROCESS_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { userQuery } from "~/server/queries/module/user/user.query";
import { z } from "zod";
import { handleDocumentMetaToJSON } from "~/common/libs/handle-document-data";

export type SuccessPengajuanOnUsersType = {
  message: string;
  data: Prisma.PengajuanOnUsersSelect;
};

export type KejuaraanByIdType = Prisma.PrestasiDataTableGetPayload<{
  include: {
    lampiran: true;
    users: { select: { userId: true; keterangan: true } };
    activityLog: {
      include: {
        User: { select: typeof userQuery };
      };
    };
  };
}>;

export const prestasiLombaQuery = createTRPCRouter({
  //** GET KEJUARAAN BY ID */
  getKejuaraanById: protectedProcedure
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
    }),

  //** GET ALL KEJUARAAN */
  getAllKejuaraan: protectedProcedure.query(async ({ ctx }) => {
    try {
      const prestasiData = await ctx.prisma.pengajuanOnUsers.findMany({
        where: { NOT: { prestasiDataTableId: null } },
        include: {
          PrestasiDataTable: {
            include: {
              lampiran: true,
              orkem: true,
              tingkatKejuaraan: true,
              tingkatPrestasi: true,
              activityLog: true,
            },
          },
          dosen: { select: { name: true, nidn: true } },
          user: { select: { name: true, prodi: true } },
        },
      });

      const transformedPrestasiData = prestasiData.map((data) => ({
        id: data.PrestasiDataTable?.id || "-",
        nama: data.user.name || "-",
        noSK: data.PrestasiDataTable?.noSK || "-",
        tanggalSK: changeDateFormat(data.PrestasiDataTable?.tanggalSK),
        kegiatan: data.PrestasiDataTable?.kegiatan || "-",
        tanggalKegiatan: changeDateFormat(
          data.PrestasiDataTable?.tanggalKegiatan
        ),
        penyelenggara: data.PrestasiDataTable?.penyelenggara || "-",
        orkem: data.PrestasiDataTable?.orkem.name || "-",
        tingkatKejuaraan: data.PrestasiDataTable?.tingkatKejuaraan.name || "-",
        tingkatPrestasi: data.PrestasiDataTable?.tingkatPrestasi.name || "-",
        dosen: data.dosen.name || "-",
        piagamPenghargaan:
          (
            data.PrestasiDataTable?.lampiran
              .piagamPenghargaan as PrismaJson.FileResponse
          )?.secure_url || "-",
        fotoPenyerahanPiala:
          (
            data.PrestasiDataTable?.lampiran
              .fotoPenyerahanPiala as PrismaJson.FileResponse
          )?.secure_url || "-",
        undanganKejuaraan:
          (
            data.PrestasiDataTable?.lampiran
              .undanganKejuaraan as PrismaJson.FileResponse
          )?.secure_url || "-",
        keterangan: data.keterangan || "-",
        status: data.PrestasiDataTable?.status || "-",
      }));

      return transformedPrestasiData;
    } catch (error) {
      return error;
    }
  }),
  //** GET ALL PRODI */
  createPrestasiLomba: protectedProcedure
    .input(pengajuanPrestasiForm)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
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

          // PENGAJUAN ON USER PAYLOAD
          users,
          currentUserName,
        } = input;

        // ** CREATE A LAMPIRAN DATA FIRST TO GET A LAMPIRAN ID
        const createLampiran = await ctx.prisma.lampiranData.create({
          data: handleDocumentMetaToJSON({
            dokumenPendukung,
            fotoPenyerahanPiala,
            piagamPenghargaan,
            undanganKejuaraan,
          }),
        });

        // ** CREATE NEW PRESTASI DATA TABLE AND GET THE DATA ID
        const createPrestasiDataTable =
          await ctx.prisma.prestasiDataTable.create({
            data: {
              kegiatan,
              tanggalKegiatan,
              penyelenggara,
              dosenId,
              orkemId,
              tingkatKejuaraanId,
              tingkatPrestasiId,
              lampiranId: createLampiran.id,
              createdById: ctx.session.user.userId,
            },
          });

        // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
        const createPengajuanOnUsers =
          await ctx.prisma.pengajuanOnUsers.createMany({
            data: users.map((val) => {
              return {
                dosenId,
                userId: val.value,
                keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
                prestasiDataTableId: createPrestasiDataTable.id,
              };
            }),
          });

        //** ADD NOTIFICATION MESSAGE */
        const notificationMessage = await ctx.prisma.notifMessage.create({
          data: {
            module: "kejuaraan",
            status: STATUS.PROCESSED,
            description: `Pengajuan Prestasi - ${createPrestasiDataTable.kegiatan}`,
            moduleId: createPrestasiDataTable.id,
            actionByMahasiswaId: ctx.session.user.userId,
            forUserMessage: PENGAJUAN_MESSAGE_BY_USER_SIDE(MOUDLE_KEJUARAAN),
            forAdminMessage: PENGAJUAN_MESSAGE_BY_ADMIN_SIDE(
              currentUserName,
              MOUDLE_KEJUARAAN
            ),
            userInfo: users,
          },
        });

        //** ADD NOTIFICATION IN ADMIN */
        const admin = await ctx.prisma.user.findMany({
          where: {
            role: "ADMIN",
          },
        });

        const mergeusers = [...admin, ...users];

        //** ADD ACTIVITY LOG */
        const createActivityLog = await ctx.prisma.activityLog.create({
          data: {
            prestasiDataTableId: createPrestasiDataTable.id,
            userId: ctx.session.user.userId,
            status: STATUS.PROCESSED,
          },
        });

        //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
        await ctx.prisma.notification.createMany({
          data: mergeusers.map((val: { value?: string; id?: string }) => {
            return {
              notificationMessageId: notificationMessage.id,
              userId: (val.value || val.id) as string,
              activityLogId: createActivityLog.id,
            };
          }),
        });

        return {
          message: ADD_PRESTASI_LOMBA_SUCCESS,
          data: createPengajuanOnUsers,
        } as SuccessPengajuanOnUsersType;
      } catch (error) {
        throw error;
      }
    }),

  //** ADMIN ACTION */
  approvePengajuanPrestasi: protectedProcedure
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
    }),

  //** ADMIN ACTION */
  rejectPengajuanPrestasi: protectedProcedure
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
    }),

  //** MAHASISWA ACTION */
  editPengajuanPrestasi: protectedProcedure
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
        const filteredDeletedUsers = notificationMessage!.Notification.filter(
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
              userId: { in: filteredDeletedUsers.map((val) => val.userId) },
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
    }),
});
