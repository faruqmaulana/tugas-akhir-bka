/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MOUDLE_HAKI } from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS, HAKI_NOTIF } from "~/common/message";
import handleAddInitialNotification from "../../notification/handleAddInitialNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { hakiApplicationSchema } from "~/common/schemas/module/pengajuan/haki/haki-application.schema";
import { PatenAndHaki } from "@prisma/client";

const addHakiHandler = protectedProcedure
  .input(hakiApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const { judul, keterangan, dokumenPendukung, users } = input;
      const dokumenJsonMeta =
        stringToJSON(dokumenPendukung || undefined) || undefined;

      //** ADD SCHOLARSHIP APPLICATION */
      const createHakiApplication = await ctx.prisma.patenAndHakiTable.create({
        data: {
          judul,
          keterangan,
          jenis: PatenAndHaki.HAKI,
          createdById: ctx.session.user.userId,
          dokumenPendukung: dokumenJsonMeta,
        },
      });

      // ** CREATE NEW ENTITY PENGAJUAN ON USERS BASED ON PRETASI DATA TABLE AND USERS
      await ctx.prisma.pengajuanOnUsers.createMany({
        data: users.map((val) => {
          return {
            userId: val.value,
            keterangan: "",
            PengajuanPatenAndHakiTableId: createHakiApplication.id,
          };
        }),
      });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createHakiApplication.id,
          MODULE_TYPE: MOUDLE_HAKI,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.HAKI,
          notifDescription: `Pengajuan Haki - ${judul}`,
          STATUS_TYPE: STATUS.PROCESSED,
          relatedUserData: users,
        },
      });

      return {
        message: `${ADD_SUCCESS} ${HAKI_NOTIF}`,
      };
    } catch (error) {}
  });

export default addHakiHandler;
