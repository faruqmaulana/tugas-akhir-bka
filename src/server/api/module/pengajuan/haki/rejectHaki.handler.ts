import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { MOUDLE_HAKI } from "~/common/constants/MESSAGE";
import { REJECT } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { rejectHakiForm } from "~/common/schemas/module/pengajuan/haki/approve-haki-application.schema";

const rejectHakiHandler = protectedProcedure
  .input(rejectHakiForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { patenAndHakiTableId, catatan } = input;

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
          MODULE: MOUDLE_HAKI,
          moduleId: patenAndHakiTableId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.HAKI,
          STATUS_TYPE: STATUS.REJECT,
          note: catatan,
        },
      });

      return {
        message: `${REJECT} ${MOUDLE_HAKI}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default rejectHakiHandler;
