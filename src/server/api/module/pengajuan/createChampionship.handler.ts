/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { protectedProcedure } from "../../trpc";
import { handleDocumentMetaToJSON } from "~/common/libs/handle-document-data";
import {
  MOUDLE_KEJUARAAN,
  PENGAJUAN_MESSAGE_BY_ADMIN_SIDE,
  PENGAJUAN_MESSAGE_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { ADD_PRESTASI_LOMBA_SUCCESS } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./_router";

const createChampionshipHandler = protectedProcedure
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
      const createPrestasiDataTable = await ctx.prisma.prestasiDataTable.create(
        {
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
        }
      );

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
          forAdminMessage: PENGAJUAN_MESSAGE_BY_ADMIN_SIDE(MOUDLE_KEJUARAAN),
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
  });

export default createChampionshipHandler;
