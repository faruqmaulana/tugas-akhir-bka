/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  ADD_PRESTASI_LOMBA_SUCCESS,
  APPROVE_PRESTASI_AND_LOMBA,
  REJECT_PRESTASI_AND_LOMBA,
} from "~/common/message";
import { type Prisma } from "@prisma/client";
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
  PENGAJUAN_MESSAGE_BY_ADMIN_SIDE,
  PENGAJUAN_MESSAGE_BY_USER_SIDE,
  PENGAJUAN_REJECTED_BY_ADMIN_SIDE,
  PENGAJUAN_REJECTED_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { userQuery } from "~/server/queries/module/user/user.query";
import { z } from "zod";

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
        // validatedAt: data.PrestasiDataTable?.createdAt || "-",
        orkem: data.PrestasiDataTable?.orkem.name || "-",
        tingkatKejuaraan: data.PrestasiDataTable?.tingkatKejuaraan.name || "-",
        tingkatPrestasi: data.PrestasiDataTable?.tingkatPrestasi.name || "-",
        dosen: data.dosen.name || "-",
        piagamPenghargaan:
          data.PrestasiDataTable?.lampiran.piagamPenghargaan || "-",
        fotoPenyerahanPiala:
          data.PrestasiDataTable?.lampiran.fotoPenyerahanPiala || "-",
        undanganKejuaraan:
          data.PrestasiDataTable?.lampiran.undanganKejuaraan || "-",
        keterangan: data.keterangan || "-",
        status: data.PrestasiDataTable?.status || "-",
      }));

      return transformedPrestasiData.reverse();
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
          data: {
            dokumenPendukung,
            fotoPenyerahanPiala,
            piagamPenghargaan,
            undanganKejuaraan,
          },
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

        //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
        await ctx.prisma.notification.createMany({
          data: notificationMessage!.Notification.map(
            (val: { userId?: string }) => {
              return {
                notificationMessageId: createNotificationMessage.id,
                userId: val.userId as string,
              };
            }
          ),
        });

        //** ADD ACTIVITY LOG */
        await ctx.prisma.activityLog.create({
          data: {
            catatan,
            prestasiDataTableId,
            userId: ctx.session.user.userId,
            status: STATUS.APPROVE,
          },
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

        //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
        await ctx.prisma.notification.createMany({
          data: notificationMessage!.Notification.map(
            (val: { userId?: string }) => {
              return {
                notificationMessageId: createNotificationMessage.id,
                userId: val.userId as string,
              };
            }
          ),
        });

        //** ADD ACTIVITY LOG */
        await ctx.prisma.activityLog.create({
          data: {
            catatan,
            prestasiDataTableId,
            userId: ctx.session.user.userId,
            status: STATUS.REJECT,
          },
        });

        return {
          message: REJECT_PRESTASI_AND_LOMBA,
        } as SuccessPengajuanOnUsersType;
      } catch (error) {
        throw error;
      }
    }),
});
