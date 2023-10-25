/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
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
};

const ReactSelectedList = (props: ReactSelectedList) => {
  const router = useRouter();
  const isChampionshipPage = router.pathname.includes("/module/kejuaraan");

  const {
    register,
    selectedData,
    trigger,
    handleSwitch,
    handleDeleteSelectedData,
    disabled,
  } = props;

  return (
    <table
      className={`w-fit border-spacing-10 overflow-auto ${
        disabled ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      <tbody className="space-y-4">
        {selectedData.map((value, index) => (
          <tr key={index}>
            <td
              className={`flex flex-row items-center gap-2 ${
                selectedData.length - 1 === index ? "pb-0" : "pb-2"
              }`}
            >
              <Popover>
                <PopoverTrigger
                  type="button"
                  title={
                    value.disableDelete
                      ? "Data default tidak bisa dihapus"
                      : "Hapus data"
                  }
                  className={`flex rounded-full border border-red-600 bg-red-300 p-[3px] ${
                    !disabled
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
              <p className="text-sm sm:text-base">{value.label} &nbsp;</p>
            </td>
            {!isChampionshipPage && (
              <td className="items-baseline">
                <p className="font-semibold mb-1 text-sm sm:text-base">
                  ({capitalizeFirstLetter(value.role)})
                </p>
              </td>
            )}
            {handleSwitch && (
              <td
                className={selectedData.length - 1 === index ? "pb-0" : "pb-2"}
              >
                <div className="ml-5 flex flex-row items-center gap-2">
                  <Switch
                    className={disabled ? "!cursor-not-allowed" : ""}
                    title={value.isKetua ? "" : "Jadikan ketua"}
                    checked={value.isKetua}
                    onClick={() => {
                      if (disabled) return;
                      if (handleSwitch) {
                        handleSwitch(value.value);
                      }
                    }}
                  />
                  <p className="w-max text-sm sm:text-base">
                    {getUserLead(value.isKetua)}
                  </p>
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
