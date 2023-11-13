/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import {
  type ReactSelectOptionType,
  type handleDeleteSelectedDataType,
} from "./ReactSelect";
import { useRouter } from "next/router";
import { Switch } from "../switch/switch";
import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/popover";
import { type RegisterOptions } from "react-hook-form";
import { getUserLead } from "~/common/helpers";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";
import LoadingInput from "./LoadingInput";
import InfoIcon from "../../svg/InfoIcon";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { type AllUsersType } from "~/common/types/context/GlobalContextType";

export type ReactSelectedList = {
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
  trigger?: (fieldName?: string | string[]) => Promise<boolean>;
  selectedData: ReactSelectOptionType[];
  handleSwitch?: (value: string) => void;
  handleDeleteSelectedData?: (params: handleDeleteSelectedDataType) => void;
  disabled: boolean;
  isPreview?: boolean;
  isLoading?: boolean;
};

const ReactSelectedList = (props: ReactSelectedList) => {
  const router = useRouter();
  const { state } = useGlobalContext();
  const { allUsers } = state;
  const isChampionshipPage =
    router.pathname.includes("/module/kejuaraan") ||
    router.pathname.includes("/module/pkm");

  const {
    register,
    selectedData,
    trigger,
    handleSwitch,
    handleDeleteSelectedData,
    disabled,
    isPreview,
    isLoading,
  } = props;

  const isDisable = !isPreview && disabled;
  const [userInfo, setUserInfo] = useState<AllUsersType | undefined>(undefined);

  const handleLabel = (index: number, value: ReactSelectOptionType) => {
    if (isPreview) return `${index + 1}. ${value.label}`;

    return value.label;
  };

  const handleFilterData = (id: string) => {
    const filterData = allUsers.filter((val) => val.id === id)[0];
    setUserInfo(filterData);
  };

  const handlePengajuDokumen = (value: ReactSelectOptionType) => {
    if (value.value === state.pengajuDokumen) return true;

    return value.isKetua;
  };

  const userInfoComponent = (value: string) => (
    <Popover>
      <PopoverTrigger
        className="ml-auto mt-[4px]"
        onClick={() => handleFilterData(value)}
      >
        <InfoIcon height="10" width="10" />
      </PopoverTrigger>
      <PopoverContent className="rounded-md border-red-300 text-xs md:text-sm">
        <table className="border-separate border-spacing-1">
          <tr>
            <td className="font-semibold">Nama&nbsp;</td>
            <td>:&nbsp; {userInfo?.name || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">NBI&nbsp;</td>
            <td>:&nbsp; {userInfo?.npm || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">Prodi&nbsp;</td>
            <td>:&nbsp; {userInfo?.prodiName || "-"} &nbsp;</td>
          </tr>
          <tr>
            <td className="font-semibold">Semester&nbsp;</td>
            <td>:&nbsp; {userInfo?.semester || "-"} &nbsp;</td>
          </tr>
        </table>
      </PopoverContent>
    </Popover>
  );

  return (
    <table
      className={`w-fit border-spacing-10 overflow-auto 
      ${isPreview ? "-mt-2" : ""}
      ${isDisable ? "cursor-not-allowed opacity-70" : ""}
      `}
    >
      <tbody className="space-y-4">
        {selectedData.map((value, index) => (
          <tr key={index}>
            <td
              className={`flex flex-row items-center gap-2 ${
                selectedData.length - 1 === index ? "pb-0" : "pb-2"
              }`}
            >
              {!isPreview && (
                <Popover>
                  <PopoverTrigger
                    type="button"
                    title={
                      value.disableDelete
                        ? "Data default tidak bisa dihapus"
                        : "Hapus data"
                    }
                    className={`flex rounded-full border border-red-600 bg-red-300 p-[3px] ${
                      !isDisable
                        ? "cursor-pointer hover:bg-red-200"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (disabled) return;
                      if (handleDeleteSelectedData && !value.disableDelete) {
                        handleDeleteSelectedData({
                          context: value,
                        });

                        // IMMEDIATELY UPDATE ERROR STATE
                        if (trigger) {
                          setTimeout(() => {
                            void trigger(register?.name as string);
                          });
                        }
                      }
                    }}
                  >
                    <X className="m-auto" size={14} />
                  </PopoverTrigger>
                  {value.disableDelete && !disabled && (
                    <PopoverContent className="rounded-full border-red-500 bg-red-50 px-3 text-xs text-red-600 md:text-base">
                      Data default tidak bisa dihapus
                    </PopoverContent>
                  )}
                </Popover>
              )}
              <p
                className={`text-sm sm:text-base ${
                  isPreview ? "font-semibold" : ""
                }`}
              >
                {handleLabel(index, value)}
              </p>
            </td>
            {!isChampionshipPage && (
              <td className="items-baseline">
                <div className="ml-5 flex flex-row items-center gap-2">
                  <p className="mb-1 text-sm font-semibold sm:text-base">
                    (
                    {handlePengajuDokumen(value)
                      ? "Pengaju Dokumen"
                      : capitalizeFirstLetter(value.role)}
                    )
                  </p>
                  {isPreview &&
                    value.role === "MAHASISWA" &&
                    userInfoComponent(value.value)}
                </div>
              </td>
            )}

            {handleSwitch && (
              <td
                className={selectedData.length - 1 === index ? "pb-0" : "pb-2"}
              >
                <div className="ml-5 flex flex-row items-center gap-2">
                  {!isPreview && (
                    <Switch
                      className={isDisable ? "!cursor-not-allowed" : ""}
                      title={value.isKetua ? "" : "Jadikan ketua"}
                      checked={value.isKetua}
                      onClick={() => {
                        if (disabled) return;
                        if (handleSwitch) {
                          handleSwitch(value.value);
                        }
                      }}
                    />
                  )}
                  {isPreview && isLoading && <LoadingInput />}
                  <p
                    className={`w-max text-sm sm:text-base ${
                      isPreview ? "font-semibold" : ""
                    }`}
                  >
                    {isPreview
                      ? `( ${getUserLead(value.isKetua)} )`
                      : getUserLead(value.isKetua)}
                  </p>
                  {isPreview &&
                    value.role === "MAHASISWA" &&
                    userInfoComponent(value.value)}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReactSelectedList;
