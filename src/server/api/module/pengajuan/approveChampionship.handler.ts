/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { approvePrestasiForm } from "~/common/schemas/module/pengajuan/approve-prestasi.schema";
import { protectedProcedure } from "../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { MOUDLE_KEJUARAAN } from "~/common/constants/MESSAGE";
import { APPROVE_PRESTASI_AND_LOMBA } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "./_router";
import handleUpdateNotification from "../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";

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
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MOUDLE_KEJUARAAN,
          moduleId: prestasiDataTableId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.KEJUARAAN,
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: APPROVE_PRESTASI_AND_LOMBA,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveChampionshipHandler;
