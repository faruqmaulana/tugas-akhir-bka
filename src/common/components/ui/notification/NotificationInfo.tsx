import React from "react";
import NotificationIcon from "../../svg/NotificationIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/common/components/ui/hover-card";
import { NOTIFICATION } from "~/common/constants/NOTIFICATION";
import Link from "next/link";

const NotificationInfo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="relative cursor-pointer">
          <div className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
            <span className=" text-[12px] font-bold text-white">33</span>
          </div>
          <NotificationIcon />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-[300px] flex-col gap-1">
        <div className="flex flex-row justify-between border-b border-gray-400 pb-1">
          <span className="font-bold">Notifikasi</span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
            <span className="text-[12px] font-bold text-white">33</span>
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto max-h-36">
          {NOTIFICATION.map((val) => (
            <div
              key={val.name}
              className="flex cursor-pointer p-2 flex-row items-center justify-between gap-2 transition-all duration-200 hover:bg-gray-200"
            >
              <span className="truncate font-semibold text-sm">{val.name}</span>
              <div
                className="rounded-full opacity-95 font-semibold px-2 text-xs"
                style={{ backgroundColor: val.color }}
              >
                {val.status}
              </div>
            </div>
          ))}
        </div>
        <Link href="/notifikasi" className="mt-2">
          <span className="flex justify-center rounded-lg bg-gray-200 items-center py-1">
            Lihat semua
          </span>
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};

export default NotificationInfo;