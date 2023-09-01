import React from "react";
import NotificationIcon from "../../svg/NotificationIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/common/components/ui/hover-card";
import Link from "next/link";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { StatusBagde } from "../badge";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";
import { Anchor } from "../anchor";
import { EmptyData } from "../empty";

const NotificationInfo = () => {
  const {
    state: { notification },
  } = useGlobalContext();
  const haveNotification = notification && notification.length !== 0;
  const unreadNotif = notification?.filter((item) => !item.readed)?.length;
  const activeNotification = (unreadNotif as number) > 0;
  return (
    <HoverCard>
      <HoverCardTrigger>
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
      </HoverCardTrigger>
      <HoverCardContent className="flex w-[300px] flex-col gap-1">
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
          {notification?.map((val) => (
            <Anchor
              key={val.id}
              href={`/module/${val.notificationMessage.module}/detail/${val.notificationMessage.moduleId}`}
            >
              <div
                key={val.notificationMessage.module}
                className="flex cursor-pointer flex-row items-center justify-between gap-2 p-2 transition-all duration-200 hover:bg-gray-200"
              >
                <span className="truncate text-sm font-semibold">
                  Pengajuan -{" "}
                  {capitalizeFirstLetter(val.notificationMessage.module)}
                </span>
                <StatusBagde
                  size="sm"
                  status={val.notificationMessage.status}
                />
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
      </HoverCardContent>
    </HoverCard>
  );
};

export default NotificationInfo;
