/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { MOUDLE_HAKI } from "~/common/constants/MESSAGE";
import { APPROVE } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { approveHakiApplicationSchema } from "~/common/schemas/module/pengajuan/haki/approve-haki-application.schema";
import { stringToJSON } from "~/common/helpers/parseJSON";

const approveHakiHandler = protectedProcedure
  .input(approveHakiApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { patenAndHakiTableId, catatan, expiredDate, dokumenTambahan } =
        input;

      const dokumenJsonMeta = stringToJSON(dokumenTambahan) || undefined;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.patenAndHakiTable.update({
        where: {
          id: patenAndHakiTableId,
        },
        data: {
          status: STATUS.APPROVE,
          dokumenTambahan: dokumenJsonMeta,
          expiredDate,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MOUDLE_HAKI,
          moduleId: patenAndHakiTableId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.HAKI,
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: `${APPROVE} ${MOUDLE_HAKI}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveHakiHandler;
