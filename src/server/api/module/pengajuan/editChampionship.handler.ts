/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pengajuanPrestasiForm } from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { protectedProcedure } from "../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { handleDocumentMetaToJSON } from "~/common/libs/handle-document-data";
import { MOUDLE_KEJUARAAN } from "~/common/constants/MESSAGE";
import {
  EDIT_PRESTASI_AND_LOMBA,
  REPROCESS_PRESTASI_AND_LOMBA,
} from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./_router";
import handleUpdateNotification from "../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import handleUpdateModuleStatus from "../notification/handleStatus";

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

        // PENGAJUAN ON USER PAYLOAD
        users: selectedUsers,
      } = input;

      // ** GET CURRENT STATUS DATA FROM DATABASE TO PREVENT STATUS DATA VALUE NOT UPDATED IN CLIENT
      const getCurrentModuleStatus =
        await ctx.prisma.prestasiDataTable.findUnique({
          where: {
            id: prestasiDataTableId,
          },
          select: {
            status: true,
          },
        });

      const status = getCurrentModuleStatus?.status;
      const isReprocessMsg = status === STATUS.REJECT || status === STATUS.APPROVE;

      // ** UPDATE NEW PRESTASI DATA TABLE
      const updatedPrestasiDataTable =
        await ctx.prisma.prestasiDataTable.update({
          where: { id: prestasiDataTableId },
          include: {
            users: true,
          },
          data: {
            status: handleUpdateModuleStatus(status as string),
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

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.KEJUARAAN,
          moduleId: prestasiDataTableId as string,
          note: catatan,
          MODULE: MOUDLE_KEJUARAAN,
          ACTION_TYPE: "EDIT",
          selectedUsers,
          STATUS_TYPE: status as string,
        },
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

export default editChampionshipHanlder;
