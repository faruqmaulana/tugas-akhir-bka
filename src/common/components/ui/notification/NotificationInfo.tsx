import React from "react";
import NotificationIcon from "../../svg/NotificationIcon";

import Link from "next/link";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { StatusBagde } from "../badge";
import { Anchor } from "../anchor";
import { EmptyData } from "../empty";
import { useCurrentUser } from "~/common/hooks/module/profile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/popover";
import timeAgo from "~/common/helpers/timeAgo";
import { type getActionUserType } from "~/common/hooks/core/useNotification";
import { type NotificationType } from "~/server/api/module/notification/notification";

const NotificationInfo = () => {
  const {
    state: { notification },
  } = useGlobalContext();

  const { isAdmin } = useCurrentUser();

  const getActionUser = ({ data, id }: getActionUserType) => {
    return data.filter((val) => val.User.id === id)[0];
  };

  const handleAdminMessage = ({
    message,
    data,
    id,
  }: {
    message: string;
    data: NotificationType;
    id: string;
  }) => {
    return message.replace(
      "{{user}}",
      getActionUser({
        data,
        id,
      })?.User.name || ""
    );
  };

  const haveNotification = notification && notification.length !== 0;
  const unreadNotif =
    notification &&
    !!notification?.length &&
    notification?.filter((item) => !item.readed)?.length;
  const activeNotification = (unreadNotif as number) > 0;
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative cursor-pointer">
          {haveNotification && activeNotification && (
            <div className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
              <span className=" text-[12px] font-bold text-white">
                {unreadNotif}
              </span>
            </div>
          )}
          <NotificationIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-white">
        <div className="flex w-[300px] flex-col gap-1 p-2">
          <div className="flex flex-row justify-between border-b border-gray-400 pb-1">
            <span className="font-bold">Notifikasi Anda</span>
            {haveNotification && activeNotification && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                <span className="text-[12px] font-bold text-white">
                  {unreadNotif}
                </span>
              </div>
            )}
          </div>
          <div
            className={`flex max-h-36 flex-col overflow-y-auto ${
              !haveNotification ? "h-[5rem]" : ""
            }`}
          >
            {!haveNotification && <EmptyData />}
            {notification &&
              !!notification?.length &&
              notification?.slice(0, 5).map((val) => (
                <Anchor
                  key={val.id}
                  href={`/module/${val.notificationMessage.module}/detail/${val.notificationMessage.moduleId}`}
                  className="border-b border-t p-2 transition-all duration-200 hover:bg-gray-200"
                >
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: isAdmin
                        ? handleAdminMessage({
                            message: val.notificationMessage
                              .forAdminMessage as string,
                            data: val.notificationMessage.Notification,
                            id: val.notificationMessage.actionByMahasiswaId,
                          })
                        : (val.notificationMessage.forUserMessage as string),
                    }}
                  />
                  <div
                    key={val.notificationMessage.module}
                    className="mt-2 flex flex-row items-center justify-between gap-2"
                  >
                    <StatusBagde
                      size="xs"
                      status={val.notificationMessage.status}
                    />
                    <p className="text-xs">
                      {timeAgo(val.notificationMessage.createdAt)}
                    </p>
                  </div>
                </Anchor>
              ))}
          </div>
          {haveNotification && (
            <Link href="/notifikasi" className="mt-2">
              <span className="flex items-center justify-center rounded-lg bg-gray-200 py-1">
                Lihat semua
              </span>
            </Link>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationInfo;
