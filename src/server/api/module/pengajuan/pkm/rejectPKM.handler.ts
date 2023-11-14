/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { REJECT } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MOUDLE_PKM } from "~/common/constants/MESSAGE";
import { rejectPKMForm } from "~/common/schemas/module/pengajuan/pkm/approve-pkm-application.schema";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";

const rejectPKMHandler = protectedProcedure
  .input(rejectPKMForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { PengajuanPKMId, catatan } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.pengajuanPKM.update({
        where: {
          id: PengajuanPKMId,
        },
        data: {
          status: STATUS.REJECT,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MOUDLE_PKM,
          moduleId: PengajuanPKMId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.PKM,
          STATUS_TYPE: STATUS.REJECT,
          note: catatan,
        },
      });

      return {
        message: `${REJECT} ${MOUDLE_PKM}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default rejectPKMHandler;
