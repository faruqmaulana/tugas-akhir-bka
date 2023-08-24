/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select, { type SingleValue } from "react-select";
import { Switch } from "../switch/switch";
import { X } from "lucide-react";

export type ReactSelectOptionType = {
  value: string;
  label: string;
  disabled: boolean;
  isKetua?: boolean;
};

export type CustomReactSelectOptionsType = {
  id?: string;
  name?: string;
  title?: string;
};

export type ReactSelectType = {
  optionData: CustomReactSelectOptionsType[];
  defaultValue: string;
  placeholder: string;
  disabled?: boolean;
  register?: any;
  control: any;
  isLoading: boolean;
  error?: string;
  selectedData: ReactSelectOptionType[];
  handleSwitch?: (value: string) => void;
  handleDeleteSelectedData?: (value: string, isKetua: boolean) => void;
  handleSelectMultipleUser?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
};

export const ReactSelect = (props: ReactSelectType) => {
  const {
    isLoading,
    optionData,
    defaultValue,
    placeholder,
    disabled = false,
    register,
    control,
    error,
    selectedData,
    handleSwitch,
    handleSelectMultipleUser,
    handleDeleteSelectedData,
  } = props;

  const options: ReactSelectOptionType[] =
    optionData &&
    optionData.map((option: CustomReactSelectOptionsType) => {
      return {
        label: option.title || option.name,
        value: option.id,
      } as ReactSelectOptionType;
    });

  const defaultOption: ReactSelectOptionType[] =
    options && options?.filter((val) => val.value === defaultValue);

  const [currentValue, setCurrentValue] = useState<any>(defaultOption);

  const handleOptionChange = (
    onChange: (...event: any[]) => void,
    obj: ReactSelectOptionType
  ) => {
    if (handleSelectMultipleUser) {
      handleSelectMultipleUser(obj);
    }

    if (onChange && !handleSelectMultipleUser) {
      onChange(obj?.value);
    }

    const filterCurrentOption = options?.filter((val) => val === obj);
    setCurrentValue(filterCurrentOption);
  };

  const handleValue = () => {
    if (handleSelectMultipleUser) return "";
    return (disabled && defaultOption) || currentValue;
  };

  return (
    <>
      <Controller
        name={register?.name || "temp"}
        control={control}
        render={({ field: { ref, onChange } }) => (
          <div className="flex w-full flex-col gap-2">
            <Select
              ref={ref}
              isClearable
              isSearchable
              placeholder={`Pilih ${placeholder}`}
              className={`basic-single w-full rounded ${
                error
                  ? "error border !border-red-500 hover:border-red-500 focus:!border-red-500 focus:outline-none"
                  : ""
              }`}
              classNamePrefix="select"
              value={handleValue()}
              defaultValue={currentValue}
              isDisabled={disabled}
              isLoading={isLoading || !options}
              options={options}
              onChange={(val: any) => {
                handleOptionChange(onChange, val);
              }}
            />
            {selectedData.length > 0 && (
              <div className="flex flex-col gap-2">
                {selectedData.map((val, index) => (
                  <div
                    key={val.value}
                    className="flex flex-row items-center gap-2"
                  >
                    <div
                      title="Hapus data"
                      className="flex cursor-pointer rounded-full border border-red-600 bg-red-300 p-[3px] hover:bg-red-200"
                      onClick={() => {
                        if (handleDeleteSelectedData) {
                          handleDeleteSelectedData(val.value, val.isKetua!);
                        }
                      }}
                    >
                      <X className="m-auto" size={14} />
                    </div>
                    <p className="min-w-[110px]">{val.label}</p>
                    {handleSwitch && (
                      <div className="flex flex-row items-center gap-2">
                        <Switch
                          title={val.isKetua ? "" : "Jadikan ketua"}
                          checked={val.isKetua}
                          onClick={() => {
                            if (handleSwitch) {
                              handleSwitch(val.value);
                            }
                          }}
                        />
                        {val.isKetua ? "Ketua Tim" : "Anggota"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </>
  );
};
