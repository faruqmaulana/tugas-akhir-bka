/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { ADD_PRESTASI_LOMBA_SUCCESS } from "~/common/message";
import { type Prisma } from "@prisma/client";
import id from "date-fns/locale/id";
import { format } from "date-fns";

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
        nama: data.user.name || "-",
        noSK: data.PrestasiDataTable!.noSK || "-",
        tanggalSK: data.PrestasiDataTable!.tanggalSK || "-",
        kegiatan: data.PrestasiDataTable!.kegiatan || "-",
        tanggalKegiatan:
          format(data.PrestasiDataTable!.tanggalKegiatan, "PPP", {
            locale: id,
          }) || "-",
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
          },
        });

        //** ADD NOTIFICATION */

        return {
          message: ADD_PRESTASI_LOMBA_SUCCESS,
          data: createPengajuanOnUsers,
        } as SuccessPengajuanOnUsersType;
      } catch (error) {
        throw error;
      }
    }),
});
