/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { REJECT } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { rejectHakiForm } from "~/common/schemas/module/pengajuan/haki/approve-haki-application.schema";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";

const rejectHakiHandler = protectedProcedure
  .input(rejectHakiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { patenAndHakiTableId, catatan, jenis } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.patenAndHakiTable.update({
        where: {
          id: patenAndHakiTableId,
        },
        data: {
          status: STATUS.REJECT,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: jenis,
          moduleId: patenAndHakiTableId,
          MODULE_TYPE_CODE: jenis.toLowerCase(),
          STATUS_TYPE: STATUS.REJECT,
          note: catatan,
        },
      });

      return {
        message: `${REJECT} ${capitalizeFirstLetter(jenis)}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default rejectHakiHandler;
