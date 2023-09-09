/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from "react";
import { Controller, type RegisterOptions } from "react-hook-form";
import Select, { type StylesConfig, type SingleValue } from "react-select";

import ReactSelectedList from "./ReactSelectedList";

export type ReactSelectOptionType = {
  value: string;
  label: string;
  isKetua: boolean;
  disabled?: boolean;
  disableDelete?: boolean;
};

export type CustomReactSelectOptionsType = {
  id?: string;
  name?: string;
  title?: string;
  keterangan?: string;
};

export type handleDeleteSelectedDataType = {
  context: ReactSelectOptionType;
};

export type ReactSelectType = {
  optionData: CustomReactSelectOptionsType[];
  defaultValue: string;
  placeholder: string;
  disabled?: boolean;
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
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
  trigger?: (fieldName?: string | string[]) => Promise<boolean>;
  control: any;
  isEditForm?: boolean;
  editIconAction: React.ReactNode;
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
    editIconAction,
    isEditForm,
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
        void trigger(register?.name);
      });
    }
    const clonedOptions = JSON?.parse(JSON?.stringify(options));
    const filterCurrentOption = clonedOptions?.filter(
      (val: ReactSelectOptionType) => val === obj
    );
    setCurrentValue(filterCurrentOption);
  };

  const handleValue = (value: string | undefined) => {
    if (value) {
      return options?.filter((opt: { value: string }) => opt.value === value);
    }

    if (handleSelectMultipleUser) return "";
    return (disabled && defaultOption) || currentValue;
  };

  const handlePlaceholder = () => {
    if (selectedData.length > 0 && handleSelectMultipleUser) {
      return `Tambah ${placeholder}`;
    }
    return `Pilih ${placeholder}`;
  };

  const customstyles: StylesConfig = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      borderColor: error ? "#ef4444" : "#a3a3a3",
    }),
  };

  return (
    <>
      <Controller
        {...(register || {})}
        name={register?.name || "temp"}
        control={control}
        render={({ field: { value, ref, onChange } }) => (
          <div
            className={`flex w-full flex-col gap-2 ${
              disabled ? "cursor-not-allowed" : ""
            }`}
          >
            <div className="flex flex-row gap-[1px]">
              <Select
                ref={ref}
                isClearable
                isSearchable
                placeholder={handlePlaceholder()}
                className={`basic-single w-full rounded`}
                classNamePrefix="select"
                value={handleValue(value)}
                defaultValue={currentValue}
                isDisabled={disabled}
                isLoading={isLoading || !options}
                options={options}
                onChange={(val: any) => {
                  handleOptionChange(onChange, val);
                }}
                styles={customstyles}
              />
              {isEditForm && editIconAction}
            </div>
            {selectedData.length > 0 && (
              <ReactSelectedList
                disabled={disabled}
                selectedData={selectedData}
                handleSwitch={handleSwitch}
                handleDeleteSelectedData={handleDeleteSelectedData}
              />
            )}
          </div>
        )}
      />
    </>
  );
};
