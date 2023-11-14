/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { APPROVE } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { approvePKMApplicationSchema } from "~/common/schemas/module/pengajuan/pkm/approve-pkm-application.schema";
import { MOUDLE_PKM } from "~/common/constants/MESSAGE";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import idrToNumber from "~/common/helpers/idrToNumber";

const approvePKMHandler = protectedProcedure
  .input(approvePKMApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { PengajuanPKMId, dokumenSK, catatan, totalAnggaran } = input;

      const dokumenJsonMeta = stringToJSON(dokumenSK) || undefined;
      const totalAnggaranToNumeric = idrToNumber(totalAnggaran);

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.pengajuanPKM.update({
        where: {
          id: PengajuanPKMId,
        },
        data: {
          totalAnggaran: totalAnggaranToNumeric,
          dokumenSK: dokumenJsonMeta,
          status: STATUS.APPROVE,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MOUDLE_PKM,
          moduleId: PengajuanPKMId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.PKM,
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: `${APPROVE} ${MOUDLE_PKM}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approvePKMHandler;
