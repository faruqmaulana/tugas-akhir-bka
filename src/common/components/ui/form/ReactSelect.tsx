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
  isKetua: boolean;
  disabled?: boolean;
};

export type CustomReactSelectOptionsType = {
  id?: string;
  name?: string;
  title?: string;
};

export type handleDeleteSelectedDataType = {
  context: ReactSelectOptionType;
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
  handleDeleteSelectedData?: (params: handleDeleteSelectedDataType) => void;
  handleSelectMultipleUser?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
  handleSelectOptionChange?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
  trigger?: (value: string) => void;
};

export const ReactSelect = (props: ReactSelectType) => {
  const {
    trigger,
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
    handleSelectOptionChange,
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
    if (handleSelectOptionChange) {
      handleSelectOptionChange(obj);
    }

    if (handleSelectMultipleUser) {
      handleSelectMultipleUser(obj);
    }

    if (onChange && !handleSelectMultipleUser) {
      onChange(obj?.value);
    }

    // IMMEDIATELLY UPDATE ERROR STATE
    if (trigger) {
      setTimeout(() => {
        trigger(register?.name);
      });
    }

    const filterCurrentOption = options?.filter((val) => val === obj);
    setCurrentValue(filterCurrentOption);
  };

  const handleValue = () => {
    if (handleSelectMultipleUser) return "";
    return (disabled && defaultOption) || currentValue;
  };

  const handlePlaceholder = () => {
    if (selectedData.length > 0 && handleSelectMultipleUser) {
      return `Tambah ${placeholder}`;
    }
    return `Pilih ${placeholder}`;
  };

  return (
    <>
      <Controller
        {...(register || {})}
        name={register?.name || "temp"}
        control={control}
        render={({ field: { ref, onChange } }) => (
          <div className="flex w-full flex-col gap-2">
            <Select
              ref={ref}
              isClearable
              isSearchable
              placeholder={handlePlaceholder()}
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
                {selectedData.map((value) => (
                  <div
                    key={value.value}
                    className="flex flex-row items-center gap-2"
                  >
                    <div
                      title="Hapus data"
                      className="flex cursor-pointer rounded-full border border-red-600 bg-red-300 p-[3px] hover:bg-red-200"
                      onClick={() => {
                        if (handleDeleteSelectedData) {
                          handleDeleteSelectedData({
                            context: value,
                          });

                          // IMMEDIATELLY UPDATE ERROR STATE
                          if (trigger) {
                            setTimeout(() => {
                              trigger(register?.name);
                            });
                          }
                        }
                      }}
                    >
                      <X className="m-auto" size={14} />
                    </div>
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
            )}
          </div>
        )}
      />
    </>
  );
};
