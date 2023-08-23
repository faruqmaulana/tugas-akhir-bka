import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { ADD_PRESTASI_LOMBA_SUCCESS } from "~/common/message";
import { type Prisma } from "@prisma/client";

export type SuccessPengajuanOnUsersType = {
  message: string;
  data: Prisma.PengajuanOnUsersSelect;
};

export const prestasiLombaQuery = createTRPCRouter({
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
          userId,
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
            data: [
              {
                userId,
                dosenId,
                prestasiDataTableId: createPrestasiDataTable.id,
              },
            ],
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
