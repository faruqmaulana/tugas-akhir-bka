/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { REJECT } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_BUKU } from "~/common/constants/MESSAGE";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { rejectBookSchema } from "~/common/schemas/module/pengajuan/book/reject-book.schema";

const rejectBookHandler = protectedProcedure
  .input(rejectBookSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { id, catatan } = input;

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.buku.update({
        where: {
          id,
        },
        data: {
          status: STATUS.REJECT,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MODULE_BUKU,
          moduleId: id,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BUKU,
          STATUS_TYPE: STATUS.REJECT,
          note: catatan,
        },
      });

      return {
        message: `${REJECT} ${MODULE_BUKU}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default rejectBookHandler;
