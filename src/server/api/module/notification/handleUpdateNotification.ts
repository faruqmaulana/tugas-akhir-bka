import {
  PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE,
  PENGAJUAN_ACCEPTED_BY_USER_SIDE,
} from "~/common/constants/MESSAGE";
import { type trpcContextType } from "../../trpc";
import { userQuery } from "~/server/queries/module/user/user.query";

const handleNotification = async ({
  ctx,
  payload: { moduleId, note, MODULE_TYPE, STATUS_TYPE },
}: {
  ctx: trpcContextType;
  payload: {
    moduleId: string;
    note: string;
    MODULE_TYPE: string;
    STATUS_TYPE: string;
  };
}) => {
  try {
    //** ADD NOTIFICATION MESSAGE */
    const notificationMessage = await ctx?.prisma?.notifMessage?.findFirst({
      where: { moduleId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Notification: { include: { User: { select: userQuery } } },
      },
    });

    //** ADD NOTIFICATION MESSAGE */
    const createNotificationMessage = await ctx.prisma.notifMessage.create({
      data: {
        catatan: note,
        status: STATUS_TYPE,
        module: notificationMessage!.module,
        moduleId: notificationMessage!.moduleId,
        description: notificationMessage!.description,
        forUserMessage: PENGAJUAN_ACCEPTED_BY_USER_SIDE(MODULE_TYPE),
        forAdminMessage: PENGAJUAN_ACCEPTED_BY_ADMIN_SIDE(MODULE_TYPE),
        actionByMahasiswaId: notificationMessage!.actionByMahasiswaId,
        actionByAdminId: ctx?.session?.user?.userId,
        userInfo: notificationMessage?.userInfo,
      },
    });

    //** ADD ACTIVITY LOG */
    const createActivityLog = await ctx.prisma.activityLog.create({
      data: {
        catatan: note,
        prestasiDataTableId: moduleId,
        userId: ctx?.session?.user?.userId as string,
        status: STATUS_TYPE,
      },
    });

    //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
    await ctx.prisma.notification.createMany({
      data: notificationMessage!.Notification.map(
        (val: { userId?: string }) => {
          return {
            notificationMessageId: createNotificationMessage.id,
            userId: val.userId as string,
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
export default handleNotification;
