import { MOUDLE_BEASISWA } from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { scholarshipApplicationSchema } from "~/common/schemas/module/pengajuan/beasiswa/scholarship-application.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS, SCOLARSHIP_NOTIF } from "~/common/message";
import handleAddInitialNotification from "../../notification/handleAddInitialNotification";
import { MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";

const addScholarshipApplicationHandler = protectedProcedure
  .input(scholarshipApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const dokumenJsonMeta =
        stringToJSON(input.dokumen as string) || undefined;

      //** ADD SCHOLARSHIP APPLICATION */
      const createScholarshipApplication =
        await ctx.prisma.pengajuanBeasiswa.create({
          data: {
            ...input,
            userId: ctx.session.user.userId,
            dokumen: dokumenJsonMeta,
          },
        });

      //** HANDLE ADD INITIAL NOTIFICATION */
      await handleAddInitialNotification({
        ctx,
        payload: {
          moduleId: createScholarshipApplication.id,
          MODULE_TYPE: MOUDLE_BEASISWA,
          MODULE_TYPE_CODE: MODULE_TYPE_CODE.BEASISWA,
          notifDescription: "Pengajuan Beasiswa",
          STATUS_TYPE: STATUS.PROCESSED,
          relatedUserData: [{ userId: ctx.session.user.userId }],
        },
      });

      return {
        message: `${ADD_SUCCESS} ${SCOLARSHIP_NOTIF}`,
      };
    } catch (error) {}
  });

export default addScholarshipApplicationHandler;
