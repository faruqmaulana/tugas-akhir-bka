/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { APPROVE } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { approveHakiApplicationSchema } from "~/common/schemas/module/pengajuan/haki/approve-haki-application.schema";
import { stringToJSON } from "~/common/helpers/parseJSON";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";

const approveHakiHandler = protectedProcedure
  .input(approveHakiApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        patenAndHakiTableId,
        catatan,
        expiredDate,
        nomorPaten,
        dokumenTambahan,
        jenis,
      } = input;

      const dokumenJsonMeta = stringToJSON(dokumenTambahan) || undefined;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.patenAndHakiTable.update({
        where: {
          id: patenAndHakiTableId,
        },
        data: {
          nomorPaten,
          status: STATUS.APPROVE,
          dokumenTambahan: dokumenJsonMeta,
          expiredDate,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: jenis,
          moduleId: patenAndHakiTableId,
          MODULE_TYPE_CODE: jenis.toLocaleLowerCase(),
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: `${APPROVE} ${capitalizeFirstLetter(jenis)}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveHakiHandler;
