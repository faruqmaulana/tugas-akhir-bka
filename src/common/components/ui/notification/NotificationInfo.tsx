import React from "react";
import NotificationIcon from "../../svg/NotificationIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/common/components/ui/hover-card";

const NotificationInfo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="relative cursor-pointer">
          <div className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <span className=" text-[12px] font-bold text-white">33</span>
          </div>
          <NotificationIcon />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
};

export default NotificationInfo;
