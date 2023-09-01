/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { Button, ViewDetailButton } from "~/common/components/ui/button/.";
import TrashIcon from "../../svg/TrashIcon";
import InfoIcon from "../../svg/InfoIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/.";
import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import Spinner from "../../svg/Spinner";
import { Anchor } from "~/common/components/ui/anchor/.";
import { StatusBagde } from "~/common/components/ui/badge/.";

const NotificationCard = ({
  onOpen,
  userNotification,
  handleReadMessage,
}: {
  onOpen: (args: any) => void;
  handleReadMessage: (args: string) => void;
  userNotification: AllNotificationType;
}) => {
  if (!userNotification) return <Spinner />;
  return userNotification?.map((val) => (
    <div
      key={val.id}
      className={`flex flex-col gap-3 rounded-md px-5 py-3 ${
        !val.readed ? "bg-slate-200" : "border-2"
      }`}
    >
      <div className="flex justify-between">
        <StatusBagde status={val.notificationMessage.status} />
        <Popover>
          <PopoverTrigger type="button" className="ml-3 mr-auto">
            <InfoIcon />
          </PopoverTrigger>
          <PopoverContent className="rounded-md border-red-300 px-3 text-xs md:text-base">
            <p className="mb-2 font-semibold">*Dokumen diajukan</p>
            <table>
              <tr>
                <td className="font-semibold">Oleh : </td>
                <td>
                  {val.notificationMessage.createdBy.name} (
                  {val.notificationMessage.createdBy.prodi?.name})
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Pada : </td>
                <td>
                  {changeDateFormat(val.notificationMessage.createdAt, true)}
                </td>
              </tr>
            </table>
          </PopoverContent>
        </Popover>
        {!val.readed && (
          <button
            type="button"
            className="text-sm underline hover:cursor-pointer"
            onClick={() => handleReadMessage(val.id)}
          >
            Tandai Sudah Dibaca
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          {val.notificationMessage.notifMessage}
        </h2>
        <div className="flex flex-wrap">
          {val.notificationMessage.userInfo.map((subval, index) => (
            <p key={subval} className="font-semibold">
              {(index ? ", " : "") + subval}
            </p>
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">
            {changeDateFormat(val.notificationMessage.createdAt)}
          </p>
          <div className="flex justify-between gap-2">
            <Anchor
              href={`/module/${val.notificationMessage.module}/detail/${val.notificationMessage.moduleId}`}
            >
              <ViewDetailButton />
            </Anchor>
            <Button
              isDanger
              isSmall
              className="flex w-fit items-center gap-2 !rounded-full text-center"
              onClick={() =>
                onOpen({
                  id: val.id,
                  showContent: true,
                  detailInfo: val.notificationMessage.notifMessage,
                  content: "Data Berhasil Dihapus!",
                })
              }
            >
              <TrashIcon color="#FFFFFF" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default NotificationCard;
