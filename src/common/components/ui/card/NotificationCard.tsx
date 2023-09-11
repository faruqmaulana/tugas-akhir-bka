/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { Button, ViewDetailButton } from "~/common/components/ui/button/.";
import TrashIcon from "../../svg/TrashIcon";
import InfoIcon from "../../svg/InfoIcon";

import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import Spinner from "../../svg/Spinner";
import { Anchor } from "~/common/components/ui/anchor/.";
import { StatusBagde } from "~/common/components/ui/badge/.";
import {
  type getActionUserType,
  type onOpenNotificationType,
} from "~/common/hooks/core/useNotification";

const NotificationCard = ({
  loadingState,
  userNotification,
  handleNotificationDrawer,
  onOpen,
  handleReadMessage,
}: {
  loadingState: { isLoading: boolean }[];
  userNotification: AllNotificationType;
  handleNotificationDrawer: (arg: AllNotificationType[0]) => void;
  onOpen: ({
    id,
    titleContent,
    content,
    showContent,
    captionButtonDanger,
    detailInfo,
    action,
  }: onOpenNotificationType) => void;
  handleReadMessage: (id: string, index: number) => void;
}) => {
  // const { handleTransformedStatus } = useStatus();

  const getActionUser = ({ data, id }: getActionUserType) => {
    return data.filter((val) => val.User.id === id)[0];
  };

  // const relatedMahasiwa = ({ data, id }: getActionUserType) => {
  //   return data.filter((val) => val.User.id === id)[0];
  // };

  if (!userNotification) return <Spinner />;

  return userNotification?.map((val, index) => (
    <div
      key={val.id}
      className={`mb-2 flex flex-col gap-3 rounded-md px-5 py-3 ${
        !val.readed ? "bg-slate-200" : "border-2 bg-white"
      }`}
    >
      <div className="flex justify-between">
        <StatusBagde status={val.notificationMessage.status} />
        <button
          className="m-auto ml-3 cursor-pointer"
          onClick={() => handleNotificationDrawer(val)}
        >
          <InfoIcon />
        </button>
        {/* <Popover>
          <PopoverTrigger type="button" className="ml-3 mr-auto">
          </PopoverTrigger>
          <PopoverContent className="rounded-md border-red-300 px-3 text-xs md:text-base">
            <p className="font-semibold">
              *Dokumen{" "}
              {handleTransformedStatus({
                status: val.notificationMessage.status,
                isNotification: true,
              })}
            </p>
            <table>
              <tr>
                <td className="font-semibold">Oleh&nbsp;</td>
                <td>
                  :&nbsp;
                  {
                    getActionUser({
                      data: val.notificationMessage.Notification,
                      id:
                        val.notificationMessage.actionByAdminId ||
                        val.notificationMessage.actionByMahasiswaId,
                    })?.User.name
                  }
                  &nbsp; (
                  {getActionUser({
                    data: val.notificationMessage.Notification,
                    id:
                      val.notificationMessage.actionByAdminId ||
                      val.notificationMessage.actionByMahasiswaId,
                  })?.User.prodi?.name || "Admin"}
                  )
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Pada&nbsp;</td>
                <td>
                  :&nbsp;
                  {changeDateFormat(val.notificationMessage.createdAt, true)}
                </td>
              </tr>
            </table>
            <p className="mt-3 font-semibold">*Detail info</p>
            {(val.notificationMessage.userInfo as PrismaJson.UserInfoType).map(
              (subval) => (
                <p key={subval.value}>
                  {
                    relatedMahasiwa({
                      data: val.notificationMessage.Notification,
                      id: subval.value,
                    })?.User.name
                  }{" "}
                  - {getUserLead(subval.isKetua)}
                </p>
              )
            )}
            {val.notificationMessage.catatan && (
              <React.Fragment>
                <p className="mt-3 font-semibold">*Catatan</p>
                <p>{val.notificationMessage.catatan}</p>
              </React.Fragment>
            )}
          </PopoverContent>
        </Popover> */}
        {!val.readed && (
          <button
            type="button"
            disabled={loadingState[index]?.isLoading}
            className={`relative text-sm underline ${
              loadingState[index]?.isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => handleReadMessage(val.id, index)}
          >
            Tandai Sudah Dibaca
            {loadingState[index]?.isLoading && (
              <Spinner
                width="15"
                height="15"
                className="absolute -left-5 -top-1 !text-white"
              />
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          {val.notificationMessage.description}
        </h2>
        <p className="font-semibold">
          {
            getActionUser({
              data: val.notificationMessage.Notification,
              id: val.notificationMessage.actionByMahasiswaId,
            })?.User.name
          }
          &nbsp;-&nbsp;
          {
            getActionUser({
              data: val.notificationMessage.Notification,
              id: val.notificationMessage.actionByMahasiswaId,
            })?.User.prodi?.name
          }
        </p>
        <div className="mt-2 flex flex-wrap justify-between gap-1">
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
                  detailInfo: val.notificationMessage.description,
                  content: "Data Berhasil Dihapus!",
                  action: "DELETE_NOTIFICATION",
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
