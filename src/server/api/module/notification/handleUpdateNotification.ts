import { Role } from "@prisma/client";
import { type trpcContextType } from "../../trpc";
import { userQuery } from "~/server/queries/module/user/user.query";
import handleActivityLogTableRelation from "./handleActivityLogTableRelation";
import { STATUS } from "~/common/enums/STATUS";
import handleUsersNotificationMessage from "./handleUsersNotificationMessage";

type UpdateNotificationType = {
  ctx: trpcContextType;
  payload: {
    note?: string;
    moduleId: string;
    MODULE: string;
    STATUS_TYPE: string;
    MODULE_TYPE_CODE: string;
    ACTION_TYPE?: "EDIT" | undefined;
    selectedUsers?: {
      value: string;
      label: string;
      isKetua: boolean;
    }[];
  };
};

const handleUpdateNotification = async ({
  ctx,
  payload: {
    note,
    moduleId,
    MODULE,
    STATUS_TYPE,
    MODULE_TYPE_CODE,
    ACTION_TYPE = undefined,
    selectedUsers = undefined,
  },
}: UpdateNotificationType) => {
  try {
    //** HANDLE STATUS */
    const handleStatus = () => {
      //** HANDLE IF ACTION TYPE EQUAL WITH EDIT */
      if (ACTION_TYPE === "EDIT") {
        if (STATUS_TYPE === STATUS.PROCESSED || STATUS_TYPE === STATUS.EDITED) {
          return STATUS.EDITED;
        }
        return STATUS.REPROCESS;
      }

      //** SET FALLBACK WITH DEFAULT STATUS TYPE FROM PROPS */
      return STATUS_TYPE;
    };

    //** FIND NOTIFICATION MESSAGE */
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
        status: handleStatus(),
        module: notificationMessage!.module,
        moduleId: notificationMessage!.moduleId,
        description: notificationMessage!.description,
        actionByMahasiswaId: notificationMessage!.actionByMahasiswaId,
        actionByAdminId: ctx?.session?.user?.userId,
        userInfo: notificationMessage?.userInfo,
        ...handleUsersNotificationMessage({
          ACTION_TYPE,
          MODULE,
          status: handleStatus(),
        }),
      },
    });

    //** ADD ACTIVITY LOG */
    const createActivityLog = await ctx.prisma.activityLog.create({
      data: {
        catatan: note,
        userId: ctx?.session?.user?.userId as string,
        status: handleStatus(),
        ...handleActivityLogTableRelation({
          MODULE_CODE: MODULE_TYPE_CODE,
          moduleId,
        }),
      },
    });

    // RUN WHEN ACTION TYPE EQUAL WITH EDIT /
    if (ACTION_TYPE === "EDIT" && selectedUsers) {
      // //** FILTERS NOT RELATED USER * //
      const filteredDeletedUsers = notificationMessage?.Notification.filter(
        (val) => {
          return (
            val.User.role !== "ADMIN" &&
            !selectedUsers.some((subval) => subval.value === val.userId)
          );
        }
      );

      // //** FILTER AND MERGE ADMIN AND RELATED USER * //
      const getAllAdmin = notificationMessage!.Notification.filter(
        (val) => val.User.role === Role.ADMIN
      );
      const transformedAdmin = getAllAdmin.map((val) => val.userId);
      const transformedUsers = selectedUsers.map((val) => val.value);
      const mergeAdminAndRelatedUsers = [
        ...transformedAdmin,
        ...transformedUsers,
      ];

      // //** DELETE NOTIFICATION THAT NOT RELATED USER * //
      await ctx.prisma.notification.deleteMany({
        where: {
          AND: {
            userId: { in: filteredDeletedUsers?.map((val) => val.userId) },
            notificationMessage: { moduleId },
          },
        },
      });

      // //** ADD NOTIFICATION IN RELATED USERS AND ADMINS */
      await ctx.prisma.notification.createMany({
        data: mergeAdminAndRelatedUsers.map((val: string) => {
          return {
            notificationMessageId: createNotificationMessage.id,
            userId: val,
            activityLogId: createActivityLog.id,
          };
        }),
      });

      return;
    }
    //  END OF WHEN ACTION TYPE EQUAL WITH EDIT /

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

export default handleUpdateNotification;
