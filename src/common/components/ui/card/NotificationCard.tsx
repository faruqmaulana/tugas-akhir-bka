import React from "react";
import { NOTIFICATION } from "~/common/constants/NOTIFICATION";
import { handleBgColor } from "~/common/helpers/handleBgColor";
import { Button, ViewDetailButton } from "~/common/components/ui/button/.";
import TrashIcon from "../../svg/TrashIcon";
import InfoIcon from "../../svg/InfoIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/.";

const NotificationCard = ({ onOpen }: { onOpen: (args: any) => void }) => {
  return NOTIFICATION.map((val) => (
    <div
      key={val.id}
      className={`flex flex-col gap-3 rounded-md px-5 py-3 ${
        !val.isReaded ? "bg-slate-200" : "border-2"
      }`}
    >
      <div className="flex justify-between">
        <div
          className={`rounded-full px-2 py-1 text-xs font-semibold opacity-95 
        ${handleBgColor(val.status)}`}
        >
          {val.status}
        </div>
        <Popover>
          <PopoverTrigger type="button" className="mr-auto ml-3">
            <InfoIcon />
          </PopoverTrigger>
          <PopoverContent className="rounded-full border-red-500 bg-red-50 px-3 text-xs text-red-600 md:text-base">
            Data default tidak bisa dihapus
          </PopoverContent>
        </Popover>
        {!val.isReaded && (
          <span className="text-sm underline hover:cursor-pointer">
            Tandai Sudah Dibaca
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          {val.name}
          {val.detail !== "" ? ` - ${val.detail}` : ""}
        </h2>
        <p className="font-semibold">
          {val.nama_mahasiswa}&nbsp;-&nbsp;{val.prodi}
        </p>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">{val.createdAt}</p>
          <div className="flex justify-between gap-2">
            <ViewDetailButton />
            <Button
              isDanger
              isSmall
              className="flex w-fit items-center gap-2 !rounded-full text-center"
              onClick={() =>
                onOpen({
                  showContent: true,
                  detailInfo: `(${val.name} ${
                    val.detail !== "" ? ` - ${val.detail}` : ""
                  })`,
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
