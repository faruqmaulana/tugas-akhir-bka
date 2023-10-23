/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { MOUDLE_BEASISWA } from "~/common/constants/MESSAGE";
import { EDIT, REPROCESS } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import handleUpdateModuleStatus from "../../notification/handleStatus";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { editscholarshipApplicationSchema } from "~/common/schemas/module/pengajuan/beasiswa/edit-scholarship-application.schema";

const editScholarshipHandlder = protectedProcedure
  .input(editscholarshipApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { pengajuanBeasiswaId, dokumen, catatan, description } = input;

      // ** GET CURRENT STATUS DATA FROM DATABASE TO PREVENT STATUS DATA VALUE NOT UPDATED IN CLIENT
      const getCurrentModuleStatus =
        await ctx.prisma.pengajuanBeasiswa.findUnique({
          where: {
            id: pengajuanBeasiswaId,
          },
          select: {
            status: true,
          },
        });

      const status = getCurrentModuleStatus?.status;
      const isReprocessMsg =
        status === STATUS.REJECT || status === STATUS.APPROVE;

      // ** UPDATE NEW PRESTASI DATA TABLE
      await ctx.prisma.pengajuanBeasiswa.update({
        where: { id: pengajuanBeasiswaId },
        data: {
          description,
          status: handleUpdateModuleStatus(status as string),
          dokumen: stringToJSON(dokumen as string) || undefined,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BEASISWA,
          moduleId: pengajuanBeasiswaId as string,
          note: catatan,
          MODULE: MOUDLE_BEASISWA,
          ACTION_TYPE: "EDIT",
          STATUS_TYPE: status as string,
        },
      });

      return {
        message: isReprocessMsg
          ? `${REPROCESS} ${MOUDLE_BEASISWA}`
          : `${EDIT} ${MOUDLE_BEASISWA}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default editScholarshipHandlder;
