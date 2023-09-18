/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type Dispatch, type SetStateAction, useState } from "react";
import { Controller, type RegisterOptions } from "react-hook-form";
import Select, { type StylesConfig, type SingleValue } from "react-select";
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";

import ReactSelectedList from "./ReactSelectedList";
import { useGlobalContext } from "~/common/context/GlobalContext";
import CustomEditIcon from "../../svg/CustomEditIcon";
import { FORM_FLAG } from "~/common/enums/FORM_FLAG";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/popover";

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
  formFlag?: string;
  control: any;
  placeholder: string;
  disabled?: boolean;
  isLoading: boolean;
  isEditForm?: boolean;
  defaultValue: string;
  selectedData: ReactSelectOptionType[];
  optionData: CustomReactSelectOptionsType[];
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
  handleSwitch?: (value: string) => void;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  trigger?: (fieldName?: string | string[]) => Promise<boolean>;
  handleDeleteSelectedData?: (params: handleDeleteSelectedDataType) => void;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

export const ReactSelect = (props: ReactSelectType) => {
  const {
    formFlag,
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
    isEditForm,
    setIsDisabled,
  } = props;

  const {
    state: { user: userData },
  } = useGlobalContext();
  const currentUserId = userData?.id;
  const isCurrentUserLead =
    selectedData.filter((val) => val.value === currentUserId && val.isKetua)
      .length > 0;

  // EDITABLE WHEN CURRENT USER IS LEAD AND SELECT MULTIPLE USERS
  // EDITABLE WHEN SINGLE SELECT DATA
  const isEditAble =
    !formFlag ||
    (isCurrentUserLead &&
      formFlag === FORM_FLAG.IS_MUTIPLE_SELECT_MAHASISWA_FORM);

  const options: ReactSelectOptionType[] =
    optionData &&
    optionData?.map((option: CustomReactSelectOptionsType) => {
      return {
        label: option.title || option.name,
        value: option.id,
      } as ReactSelectOptionType;
    });

  const defaultOption: ReactSelectOptionType[] =
    options && options?.filter((val) => val.value === defaultValue);
  const [currentValue, setCurrentValue] = useState<unknown>(defaultOption);

  const handleOptionChange = (
    onChange: (...event: unknown[]) => void,
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
    control: (provided: Record<string, unknown>) => ({
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
              {isEditForm && (
                <Popover>
                  <PopoverTrigger>
                    <CustomEditIcon
                      disabled={disabled}
                      onClick={() => {
                        if (isEditAble) {
                          setIsDisabled(!disabled);
                        }
                      }}
                    />
                  </PopoverTrigger>
                  {!isEditAble && (
                    <PopoverContent className="max-w-[250px] rounded-full border-red-400 bg-red-50 px-5 text-sm text-red-600 md:text-base">
                      Perubahan anggota hanya bisa dilakukan oleh{" "}
                      <b>Ketua Tim</b>.
                    </PopoverContent>
                  )}
                </Popover>
              )}
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
