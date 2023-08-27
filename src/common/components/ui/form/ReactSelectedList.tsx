import React from "react";
import {
  type ReactSelectOptionType,
  type handleDeleteSelectedDataType,
} from "./ReactSelect";

import { Switch } from "../switch/switch";
import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/popover";
import { type RegisterOptions } from "react-hook-form";

export type ReactSelectedList = {
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
  trigger?: (fieldName?: string | string[]) => Promise<boolean>;
  selectedData: ReactSelectOptionType[];
  handleSwitch?: (value: string) => void;
  handleDeleteSelectedData?: (params: handleDeleteSelectedDataType) => void;
};

const ReactSelectedList = (props: ReactSelectedList) => {
  const {
    register,
    selectedData,
    trigger,
    handleSwitch,
    handleDeleteSelectedData,
  } = props;
  return (
    <div className="flex flex-col gap-2">
      {selectedData.map((value) => (
        <div key={value.value} className="flex flex-row items-center gap-2">
          <Popover>
            <PopoverTrigger
              type="button"
              title={
                value.disableDelete
                  ? "Data default tidak bisa dihapus"
                  : "Hapus data"
              }
              className="flex cursor-pointer rounded-full border border-red-600 bg-red-300 p-[3px] hover:bg-red-200"
              onClick={() => {
                if (handleDeleteSelectedData && !value.disableDelete) {
                  handleDeleteSelectedData({
                    context: value,
                  });

                  // IMMEDIATELLY UPDATE ERROR STATE
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
            {value.disableDelete && (
              <PopoverContent className="rounded-full border-red-500 bg-red-50 px-3 text-xs text-red-600 md:text-base">
                Data default tidak bisa dihapus
              </PopoverContent>
            )}
          </Popover>

          <p className="min-w-[110px]">{value.label}</p>
          {handleSwitch && (
            <div className="flex flex-row items-center gap-2">
              <Switch
                title={value.isKetua ? "" : "Jadikan ketua"}
                checked={value.isKetua}
                onClick={() => {
                  if (handleSwitch) {
                    handleSwitch(value.value);
                  }
                }}
              />
              {value.isKetua ? "Ketua Tim" : "Anggota"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReactSelectedList;
