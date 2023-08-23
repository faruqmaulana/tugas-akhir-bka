/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import EyeIcon from "../../svg/EyeIcon";
import { ReactSelect, type ReactSelectOptionType } from "./ReactSelect";
import { type SingleValue } from "react-select";

export type InputProps = {
  disabled?: boolean;
  leftAddonComponent?: React.ReactNode | string;
  className?: string;
  placeholder: string;
  value?: string | Date | any;
  label?: string;
  type?: string;
  register?: any;
  additionalInfo?: string;
  selectData?: any;
  labelFontSize?: string;
  autocomplete?: string;
  error?: string;
  control?: any;
  isLoading?: boolean;
  selectedData?: ReactSelectOptionType[];
  onChange?: (value: string) => void;
  handleSwitch?: (value: string) => void;
  handleDeleteSelectedData?: (value: string, isKetua: boolean) => void;
  handleSelectOptionChange?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
};

const Input = (props: InputProps) => {
  const {
    disabled = false,
    leftAddonComponent = false,
    className = "",
    placeholder = "",
    value = "",
    label = "",
    type = "text",
    register,
    selectData = undefined,
    labelFontSize = "text-[15px]",
    autocomplete,
    error,
    control,
    handleSwitch,
    isLoading = false,
    selectedData = [],
    additionalInfo = undefined,
    handleSelectOptionChange,
    handleDeleteSelectedData,
  } = props;
  const [inputType, setInputType] = useState(type === "date" ? "text" : type);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      {label && <p className={`font-medium ${labelFontSize}`}>{label}</p>}
      <div className="relative flex flex-wrap items-stretch">
        {type === "select" && (
          <ReactSelect
            isLoading={isLoading}
            control={control}
            disabled={disabled}
            register={register}
            placeholder={placeholder}
            defaultValue={value}
            optionData={selectData}
            error={error}
            handleSwitch={handleSwitch}
            handleDeleteSelectedData={handleDeleteSelectedData}
            selectedData={selectedData}
            onChange={(newValue: SingleValue<ReactSelectOptionType>) => {
              if (handleSelectOptionChange) {
                return handleSelectOptionChange(newValue);
              }
            }}
          />
        )}
        {type === "textarea" && (
          <textarea
            {...(register || {})}
            className={`peer block min-h-[auto] w-full rounded border border-neutral-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] ease-linear focus:border-primary focus:text-neutral-700 focus:outline-none data-[te-input-state-active]:placeholder:opacity-100 
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-300"
            }
            ${
              value
                ? "dark:placeholder:text-neutral-900 "
                : "dark:placeholder:text-neutral-400 "
            }`}
            rows={4}
            placeholder={value || placeholder}
          />
        )}
        {leftAddonComponent && (
          <span
            className={`bg-grey-900 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-900 dark:placeholder:text-neutral-200 
            ${disabled ? "cursor-not-allowed opacity-60" : ""} 
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-300"
            }`}
            id="basic-addon1"
          >
            {leftAddonComponent}
          </span>
        )}
        {(type === "text" ||
          type === "file" ||
          type === "date" ||
          type === "number" ||
          type === "password" ||
          type === "color") && (
          <input
            {...(register || {})}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            autoComplete={autocomplete || "off"}
            disabled={disabled}
            type={showPassword ? "text" : inputType}
            onFocus={() => {
              if (type === "date") {
                setInputType("date");
              }
            }}
            onBlur={() => {
              if (type === "date") {
                setInputType("text");
              }
            }}
            data-te-inline="true"
            className={`relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary ${
              !leftAddonComponent ? "rounded-l" : ""
            }
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-300"
            }
          ${
            value
              ? "dark:placeholder:text-neutral-900 "
              : "dark:placeholder:text-neutral-400 "
          }`}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby="basic-addon1"
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 z-[99] -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {additionalInfo && (
        <p className="text-sm text-red-500">*{additionalInfo}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
