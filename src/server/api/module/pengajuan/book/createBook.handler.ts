/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { STATUS } from "~/common/enums/STATUS";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS } from "~/common/message";
import handleAddInitialNotification from "../../notification/handleAddInitialNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { MODULE_BUKU } from "~/common/constants/MESSAGE";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { createBookSchema } from "~/common/schemas/module/pengajuan/book/create-book.schema";

const addBookHandler = protectedProcedure
  .input(createBookSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        judulBuku,
        penerbit,
        pengarang,
        penulis,
        jumlahEksemplar,
        dokumenPendukung,
      } = input;
      const dokumenJsonMeta =
        stringToJSON(dokumenPendukung || undefined) || undefined;

      //** ADD BOOK APPLICATION */
      const createBookApplication = await ctx.prisma.buku.create({
        data: {
          judulBuku,
          penerbit,
          pengarang,
          penulis,
          jumlahEksemplar,
          userId: ctx.session.user.userId,
          dokumenPendukung: dokumenJsonMeta,
        },
      });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createBookApplication.id,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BUKU,
          MODULE_TYPE: MODULE_BUKU,
          notifDescription: `Pengajuan Buku - ${createBookApplication.judulBuku}`,
          STATUS_TYPE: STATUS.PROCESSED,
          relatedUserData: [{ userId: ctx.session.user.userId }],
        },
      });

      return {
        message: `${ADD_SUCCESS} ${MODULE_BUKU}`,
      };
    } catch (error) {
      throw error;
    }
  });

export default addBookHandler;
