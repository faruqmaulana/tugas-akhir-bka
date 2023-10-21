import {
  MOUDLE_BEASISWA,
  PENGAJUAN_MESSAGE_BY_ADMIN_SIDE,
  PENGAJUAN_MESSAGE_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { STATUS } from "~/common/enums/STATUS";
import { stringToJSON } from "~/common/helpers/parseJSON";
import { scholarshipApplicationSchema } from "~/common/schemas/module/pengajuan/beasiswa/scholarship-application.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { ADD_SUCCESS, SCOLARSHIP_NOTIF } from "~/common/message";

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

      //** ADD NOTIFICATION MESSAGE */
      const notificationMessage = await ctx.prisma.notifMessage.create({
        data: {
          module: "kejuaraan",
          status: STATUS.PROCESSED,
          description: "Pengajuan Beasiswa",
          moduleId: createScholarshipApplication.id,
          actionByMahasiswaId: ctx.session.user.userId,
          forUserMessage: PENGAJUAN_MESSAGE_BY_USER_SIDE(MOUDLE_BEASISWA),
          forAdminMessage: PENGAJUAN_MESSAGE_BY_ADMIN_SIDE(MOUDLE_BEASISWA),
        },
      });

      //** ADD NOTIFICATION IN ADMIN */
      const admin = await ctx.prisma.user.findMany({
        where: {
          role: "ADMIN",
        },
      });

      const mergeusers = [...admin];

      //** ADD ACTIVITY LOG */
      const createActivityLog = await ctx.prisma.activityLog.create({
        data: {
          pengajuanBeasiswaId: createScholarshipApplication.id,
          userId: ctx.session.user.userId,
          status: STATUS.PROCESSED,
        },
      });

      //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
      await ctx.prisma.notification.createMany({
        data: mergeusers.map((val: { value?: string; id?: string }) => {
          return {
            notificationMessageId: notificationMessage.id,
            userId: (val.value || val.id) as string,
            activityLogId: createActivityLog.id,
          };
        }),
      });

      return {
        message: `${ADD_SUCCESS} ${SCOLARSHIP_NOTIF}`,
      };
    } catch (error) {}
  });

export default addScholarshipApplicationHandler;
