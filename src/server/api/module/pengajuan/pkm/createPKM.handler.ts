/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS } from "~/common/message";
import handleAddInitialNotification from "../../notification/handleAddInitialNotification";
import { createPKMSchema } from "~/common/schemas/module/pengajuan/pkm/create-pkm.shema";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { MOUDLE_PKM } from "~/common/constants/MESSAGE";

const addPKMHandler = protectedProcedure
  .input(createPKMSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        judul,
        dosenId,
        tanggalKegiatan,
        deskripsi,
        users,
        dokumenProposal,
      } = input;

      const dokumenJsonMeta =
        stringToJSON(dokumenProposal || undefined) || undefined;

      //** ADD PKM APPLICATION */
      const createPKMApplication = await ctx.prisma.pengajuanPKM.create({
        data: {
          judul,
          dosenId,
          tanggalKegiatan,
          deskripsi,
          dokumenProposal: dokumenJsonMeta,
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: users.map((val) => {
          return {
            dosenId,
            userId: val.value,
            keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
            PengajuanPKMId: createPKMApplication.id,
          };
        }),
      });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createPKMApplication.id,
          MODULE_TYPE: MOUDLE_PKM,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.PKM,
          notifDescription: `Pengajuan PKM - ${createPKMApplication.judul}`,
          STATUS_TYPE: STATUS.PROCESSED,
          relatedUserData: users,
        },
      });

      return {
        message: `${ADD_SUCCESS} ${MOUDLE_PKM}`,
      };
    } catch (error) {
      throw error;
    }
  });

export default addPKMHandler;
