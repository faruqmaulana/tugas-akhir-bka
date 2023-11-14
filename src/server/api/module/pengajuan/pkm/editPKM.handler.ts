/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { EDIT, REPROCESS } from "~/common/message";
import handleUpdateNotification from "../../notification/handleUpdateNotification";
import handleUpdateModuleStatus from "../../notification/handleStatus";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { editPKMSchema } from "~/common/schemas/module/pengajuan/pkm/create-pkm.shema";
import { MOUDLE_PKM } from "~/common/constants/MESSAGE";

const editPKMHandler = protectedProcedure
  .input(editPKMSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const {
        PengajuanPKMId,
        judul,
        dosenId,
        deskripsi,
        tanggalKegiatan,
        dokumenProposal,
        catatan,

        // PENGAJUAN ON USER PAYLOAD
        users: selectedUsers,
      } = input;

      const dokumenJsonMeta =
        stringToJSON(dokumenProposal || undefined) || undefined;

      // ** GET CURRENT STATUS DATA FROM DATABASE TO PREVENT STATUS DATA VALUE NOT UPDATED IN CLIENT
      const getCurrentModuleStatus = await ctx.prisma.pengajuanPKM.findUnique({
        where: {
          id: PengajuanPKMId,
        },
        select: {
          status: true,
        },
      });

      const status = getCurrentModuleStatus?.status;
      const isReprocessMsg =
        status === STATUS.REJECT || status === STATUS.APPROVE;

      //** UPDATE HAKI APPLICATION */
      const updatePKMApplication = await ctx.prisma.pengajuanPKM.update({
        where: { id: PengajuanPKMId },
        include: {
          users: true,
        },
        data: {
          judul,
          dosenId,
          tanggalKegiatan,
          deskripsi,
          dokumenProposal: dokumenJsonMeta,
          status: handleUpdateModuleStatus(status as string),
        },
      });

      await ctx.prisma.pengajuanOnUsers.deleteMany({
        where: {
          AND: {
            PengajuanPKMId: PengajuanPKMId,
            userId: {
              in: updatePKMApplication?.users.map((val) => val.userId),
            },
          },
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON HAKI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: selectedUsers.map((val) => {
          return {
            userId: val.value,
            keterangan: val.isKetua ? "Ketua Tim" : "Anggota",
            PengajuanPKMId: PengajuanPKMId,
          };
        }),
      });

      //** HANDLE EDIT NOTIFICATION */
      await handleUpdateNotification({
        ctx,
        payload: {
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.PKM,
          moduleId: PengajuanPKMId,
          note: catatan,
          MODULE: MOUDLE_PKM,
          ACTION_TYPE: "EDIT",
          selectedUsers,
          STATUS_TYPE: status as string,
        },
      });

      return {
        message: `${isReprocessMsg ? REPROCESS : EDIT} ${MOUDLE_PKM}!`,
      };
    } catch (error) {}
  });

export default editPKMHandler;
