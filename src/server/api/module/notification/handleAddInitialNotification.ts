/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PENGAJUAN_MESSAGE_BY_ADMIN_SIDE,
  PENGAJUAN_MESSAGE_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { type trpcContextType } from "../../trpc";

const handleAddInitialNotification = async ({
  ctx,
  payload: {
    moduleId,
    MODULE_TYPE,
    STATUS_TYPE,
    MODULE_TYPE_CODE,
    relatedUserData,
    notifDescription,
  },
}: {
  ctx: trpcContextType;
  payload: {
    moduleId: string;
    MODULE_TYPE: string;
    STATUS_TYPE: string;
    MODULE_TYPE_CODE: string;
    notifDescription: string;
    relatedUserData: { value?: string; id?: string; userId?: string }[];
  };
}) => {
  try {
    //** ADD NOTIFICATION MESSAGE */
    const notificationMessage = await ctx.prisma.notifMessage.create({
      data: {
        module: MODULE_TYPE_CODE,
        status: STATUS_TYPE,
        description: notifDescription,
        moduleId: moduleId,
        actionByMahasiswaId: ctx?.session?.user?.userId as string,
        forUserMessage: PENGAJUAN_MESSAGE_BY_USER_SIDE(MODULE_TYPE),
        forAdminMessage: PENGAJUAN_MESSAGE_BY_ADMIN_SIDE(MODULE_TYPE),
      },
    });

    //** ADD NOTIFICATION IN ADMIN */
    const admin = await ctx.prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
    });

    const mergeusers = [...admin, ...relatedUserData];

    //** ADD ACTIVITY LOG AND SET WHO CREATE THE DATA */
    const createActivityLog = await ctx.prisma.activityLog.create({
      data: {
        prestasiDataTableId: moduleId,
        pengajuanBeasiswaId: moduleId,
        userId: ctx?.session?.user.userId as string,
        status: STATUS_TYPE,
      },
    });

    //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
    await ctx.prisma.notification.createMany({
      data: mergeusers.map(
        (val: { value?: string; id?: string; userId?: string }) => {
          return {
            notificationMessageId: notificationMessage.id,
            userId: (val.value || val.id || val.userId) as string,
            activityLogId: createActivityLog.id,
          };
        }
      ),
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
export default handleAddInitialNotification;
