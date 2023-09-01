/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  ADD_PRESTASI_LOMBA_SUCCESS,
  APPROVE_PRESTASI_AND_LOMBA,
} from "~/common/message";
import { type Prisma } from "@prisma/client";
import { approvePrestasiForm } from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { STATUS } from "~/common/enums/STATUS";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";

export type SuccessPengajuanOnUsersType = {
  message: string;
  data: Prisma.PengajuanOnUsersSelect;
};

export const prestasiLombaQuery = createTRPCRouter({
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
            },
          },
          dosen: { select: { name: true, nidn: true } },
          user: { select: { name: true, prodi: true } },
        },
      });

      const transformedPrestasiData = prestasiData.map((data) => ({
        id: data.PrestasiDataTable!.id || "-",
        nama: data.user.name || "-",
        noSK: data.PrestasiDataTable!.noSK || "-",
        tanggalSK: changeDateFormat(data.PrestasiDataTable!.tanggalSK),
        kegiatan: data.PrestasiDataTable!.kegiatan || "-",
        tanggalKegiatan: changeDateFormat(
          data.PrestasiDataTable!.tanggalKegiatan
        ),
        penyelenggara: data.PrestasiDataTable!.penyelenggara || "-",
        // validatedAt: data.PrestasiDataTable!.createdAt || "-",
        orkem: data.PrestasiDataTable!.orkem.name || "-",
        tingkatKejuaraan: data.PrestasiDataTable!.tingkatKejuaraan.name || "-",
        tingkatPrestasi: data.PrestasiDataTable!.tingkatPrestasi.name || "-",
        dosen: data.dosen.name || "-",
        piagamPenghargaan:
          data.PrestasiDataTable!.lampiran.piagamPenghargaan || "-",
        fotoPenyerahanPiala:
          data.PrestasiDataTable!.lampiran.fotoPenyerahanPiala || "-",
        undanganKejuaraan:
          data.PrestasiDataTable!.lampiran.undanganKejuaraan || "-",
        keterangan: data.keterangan || "-",
        status: data.PrestasiDataTable!.status || "-",
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

        // ** ADD ACTIVITY LOG
        await ctx.prisma.activityLog.create({
          data: {
            userId: ctx.session.user.userId,
            prestasiDataTableId: createPrestasiDataTable.id,
            status: STATUS.PROCESSED,
          },
        });

        //** ADD NOTIFICATION MESSAGE */
        const notificationMessage = await ctx.prisma.notifMessage.create({
          data: {
            module: "kejuaraan",
            status: STATUS.PROCESSED,
            notifMessage: `Pengajuan Prestasi - ${createPrestasiDataTable.kegiatan}`,
            moduleId: createPrestasiDataTable.id,
            userId: ctx.session.user.userId,
            userInfo: users.map((val) => {
              return `${val.label} - ${val.isKetua ? "Ketua Tim" : "Anggota"}`;
            }),
          },
        });

        //** ADD NOTIFICATION */
        await ctx.prisma.notification.createMany({
          data: users.map((val) => {
            return {
              notificationMessageId: notificationMessage.id,
              userId: val.value,
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

        // ** CREATE ACTIVITY LOG
        await ctx.prisma.activityLog.create({
          data: {
            catatan,
            prestasiDataTableId,
            status: STATUS.APPROVE,
            userId: ctx.session.user.userId,
          },
        });

        return {
          message: APPROVE_PRESTASI_AND_LOMBA,
        } as SuccessPengajuanOnUsersType;
      } catch (error) {
        throw error;
      }
    }),
});
