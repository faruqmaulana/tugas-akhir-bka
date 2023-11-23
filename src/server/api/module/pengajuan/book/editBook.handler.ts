/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { EDIT, REPROCESS } from "~/common/message";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { MODULE_BUKU } from "~/common/constants/MESSAGE";
import { editBookSchema } from "~/common/schemas/module/pengajuan/book/edit-book.schema";
import handleUpdateModuleStatus from "../../notification/handleStatus";

const editBookHandler = protectedProcedure
  .input(editBookSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        id,
        catatan,
        judulBuku,
        jumlahEksemplar,
        penerbit,
        pengarang,
        penulis,
        dokumenPendukung,
      } = input;

      const dokumenJsonMeta =
        stringToJSON(dokumenPendukung || undefined) || undefined;

      // ** GET CURRENT STATUS DATA FROM DATABASE TO PREVENT STATUS DATA VALUE NOT UPDATED IN CLIENT
      const getCurrentModuleStatus = await ctx.prisma.buku.findUnique({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      const status = getCurrentModuleStatus?.status;
      const isReprocessMsg =
        status === STATUS.REJECT || status === STATUS.APPROVE;

      await ctx.prisma.buku.update({
        where: { id },
        data: {
          penulis,
          penerbit,
          pengarang,
          judulBuku,
          jumlahEksemplar,
          dokumenPendukung: dokumenJsonMeta,
          status: handleUpdateModuleStatus(status as string),
        },
      });

      //** HANDLE EDIT NOTIFICATION */
      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BUKU,
          moduleId: id,
          note: catatan,
          MODULE: MODULE_BUKU,
          ACTION_TYPE: "EDIT",
          STATUS_TYPE: status as string,
        },
      });

      return {
        message: `${isReprocessMsg ? REPROCESS : EDIT} ${MODULE_BUKU}!`,
      };
    } catch (error) {}
  });

export default editBookHandler;
