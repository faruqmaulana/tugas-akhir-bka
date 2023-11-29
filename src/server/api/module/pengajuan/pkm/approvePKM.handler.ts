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
      const {
        PengajuanPKMId,
        nomorSK,
        tanggalSK,
        dokumenSK,
        catatan,
        totalAnggaran,
        suratKeputusanId,
      } = input;

      const totalAnggaranToNumeric = idrToNumber(totalAnggaran);
      const dokumenJsonMeta = stringToJSON(dokumenSK) || undefined;

      // ** ADD DOKUMEN SK
      const dokumenSKCreate = await ctx.prisma.dokumenSKMeta.upsert({
        where: {
          id: suratKeputusanId || "",
        },
        update: {
          nomorSK,
          tanggalSK,
          dokumenSK: dokumenJsonMeta,
        },
        create: {
          nomorSK,
          tanggalSK,
          dokumenSK: dokumenJsonMeta,
        },
      });

      // ** UPDATE PRESTASI DATA TABLE
      await ctx.prisma.pengajuanPKM.update({
        where: {
          id: PengajuanPKMId,
        },
        data: {
          totalAnggaran: totalAnggaranToNumeric,
          suratKeputusanId: dokumenSKCreate.id,
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
