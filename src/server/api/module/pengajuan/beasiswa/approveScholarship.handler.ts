import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { MOUDLE_BEASISWA } from "~/common/constants/MESSAGE";
import { APPROVE } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { rejectScholarshipForm } from "~/common/schemas/module/pengajuan/beasiswa/approve-reject-scholarship.schema";

const approveScholarshipHandler = protectedProcedure
  .input(rejectScholarshipForm)
  .mutation(async ({ ctx, input }) => {
    try {
      const { pengajuanBeasiswaId, catatan } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.pengajuanBeasiswa.update({
        where: {
          id: pengajuanBeasiswaId,
        },
        data: {
          status: STATUS.APPROVE,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MOUDLE_BEASISWA,
          moduleId: pengajuanBeasiswaId,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BEASISWA,
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: `${APPROVE} ${MOUDLE_BEASISWA}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveScholarshipHandler;
