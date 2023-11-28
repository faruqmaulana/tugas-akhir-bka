/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { protectedProcedure } from "../../../trpc";
import { STATUS } from "~/common/enums/STATUS";
import { APPROVE } from "~/common/message";
import { type SuccessPengajuanOnUsersType } from "../_router";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { MODULE_BUKU } from "~/common/constants/MESSAGE";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { approveBookSchema } from "~/common/schemas/module/pengajuan/book/approve-book.schema";

const approveBookHandler = protectedProcedure
  .input(approveBookSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        id,
        dokumenSK,
        nomorSK,
        tanggalSK,
        nomorISBN,
        tahunTerbit,
        catatan,
      } = input;

      const dokumenJsonMeta = stringToJSON(dokumenSK) || undefined;

      // ** ADD DOKUMEN SK
      const dokumenSKCreate = await ctx.prisma.dokumenSKMeta.create({
        data: {
          nomorSK,
          tanggalSK,
          dokumenSK: dokumenJsonMeta,
        },
      });

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.buku.update({
        where: {
          id: id,
        },
        data: {
          nomorISBN,
          tahunTerbit,
          suratKeputusanId: dokumenSKCreate.id,
        },
      });

      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE: MODULE_BUKU,
          moduleId: id,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BUKU,
          STATUS_TYPE: STATUS.APPROVE,
          note: catatan,
        },
      });

      return {
        message: `${APPROVE} ${MODULE_BUKU}`,
      } as SuccessPengajuanOnUsersType;
    } catch (error) {
      throw error;
    }
  });

export default approveBookHandler;
