/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select, { type SingleValue } from "react-select";

export type ReactSelectOptionType = {
  value: string;
  label: string;
  disabled: boolean;
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
  onChange: (newValue: SingleValue<ReactSelectOptionType>) => void;
  control: any;
  isLoading: boolean;
};

export const ReactSelect = (props: ReactSelectType) => {
  const {
    isLoading,
    optionData,
    defaultValue,
    placeholder,
    disabled = false,
    onChange: customOnChange,
    register,
    control,
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
    if (onChange) {
      onChange(obj.value);
    }
    if (customOnChange) {
      customOnChange(obj);
    }

    const filterCurrentOption = options?.filter((val) => val === obj);
    setCurrentValue(filterCurrentOption);
  };

  return (
    <>
      <Controller
        name={register?.name || "temp"}
        control={control}
        render={({ field: { ref, onChange, value } }) => (
          <Select
            ref={ref}
            isClearable
            isSearchable
            placeholder={`Pilih ${placeholder}`}
            className="basic-single w-full"
            classNamePrefix="select"
            value={(disabled && defaultOption) || currentValue}
            defaultValue={currentValue}
            isDisabled={disabled}
            isLoading={isLoading || !options}
            options={options}
            onChange={(val: any) => {
              handleOptionChange(onChange, val);
            }}
          />
        )}
      />
    </>
  );
};