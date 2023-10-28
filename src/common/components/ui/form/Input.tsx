/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import EyeSlashIcon from "~/common/EyeSlashIcon";
import EyeIcon from "../../svg/EyeIcon";
import {
  ReactSelect,
  type handleDeleteSelectedDataType,
  type ReactSelectOptionType,
} from "./ReactSelect";
import { type SingleValue } from "react-select";
import { DatePicker } from "../calendar/DatePicker";
import CustomEditIcon from "../../svg/CustomEditIcon";
import { useCurrentUser } from "~/common/hooks/module/profile";
import InputFile from "./InputFile";
import { type FileResponse } from "~/common/libs/upload-file.lib";
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
  type UseFormTrigger,
} from "react-hook-form";

export type InputPropsType = {
  key?: string | number;
  isEditForm?: boolean;
  disabled?: boolean;
  leftAddonComponent?: React.ReactNode | string;
  className?: string;
  placeholder?: string;
  value?: string | Date | any;
  label?: string;
  type?: string;
  additionalInfo?: string;
  selectData?: any;
  labelFontSize?: string;
  autocomplete?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  control?: any;
  isLoading?: boolean;
  selectedData?: ReactSelectOptionType[];
  formFlag?: string;
  register?: any;
  fileData?: FileResponse;
  onChange?: (value: string) => void;
  handleSwitch?: (value: string) => void;
  handleDeleteSelectedData?: (params: handleDeleteSelectedDataType) => void;
  handleSelectMultipleUser?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
  handleSelectOptionChange?: (
    newValue: SingleValue<ReactSelectOptionType>
  ) => void;
  trigger?: UseFormTrigger<any>;
  isPreview?: boolean;
};

const Input = (props: InputPropsType) => {
  const { isAdmin } = useCurrentUser();

  const {
    formFlag,
    fileData,
    isEditForm = false,
    trigger,
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
    handleSelectMultipleUser,
    handleDeleteSelectedData,
    handleSelectOptionChange,
    isPreview = false,
  } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled || isEditForm);
  const editForm = isEditForm && !isAdmin;

  const editIconAction = (
    <CustomEditIcon
      disabled={isDisabled}
      onClick={() => {
        setIsDisabled(!isDisabled);
      }}
    />
  );

  if (isPreview && type === "text")
    return (
      <div className="relative col-span-2 flex flex-col gap-1 ">
        {label && <p className={`font-medium ${labelFontSize}`}>{label}</p>}
        <input
          {...(register || {})}
          readOnly
          className="font-semibold"
          type={type}
        />
      </div>
    );

  return (
    <div
      className={`relative flex flex-col gap-1 ${className} ${
        isPreview ? "!col-span-2" : ""
      }`}
    >
      {label && <p className={`font-medium ${labelFontSize}`}>{label}</p>}
      <div className="relative flex w-full flex-row items-stretch">
        {type === "select" && (
          <ReactSelect
            isPreview={isPreview}
            disabled={isDisabled}
            setIsDisabled={setIsDisabled}
            trigger={trigger}
            isLoading={isLoading}
            control={control}
            register={register}
            placeholder={placeholder}
            defaultValue={value}
            optionData={selectData}
            error={error}
            selectedData={selectedData}
            handleSwitch={handleSwitch}
            handleDeleteSelectedData={handleDeleteSelectedData}
            handleSelectMultipleUser={handleSelectMultipleUser}
            handleSelectOptionChange={handleSelectOptionChange}
            isEditForm={editForm}
            formFlag={formFlag}
          />
        )}
        {type === "textarea" && (
          <textarea
            disabled={isDisabled}
            {...(register || {})}
            className={`peer block min-h-[auto] w-full rounded border border-neutral-400 bg-transparent px-3 py-[0.32rem] leading-[1.6] ease-linear focus:border-primary focus:text-neutral-700 focus:outline-none data-[te-input-state-active]:placeholder:opacity-100 
            ${isDisabled ? "cursor-not-allowed opacity-60" : ""} 
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-400"
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
            className={`bg-grey-900 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-400 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-900 dark:placeholder:text-neutral-200 
            ${isDisabled ? "cursor-not-allowed opacity-60" : ""} 
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-400"
            }`}
            id="basic-addon1"
          >
            {leftAddonComponent}
          </span>
        )}
        {type === "date" && (
          <DatePicker
            isPreview={isPreview}
            control={control}
            register={register}
            error={error}
            disabled={isDisabled}
            isEditForm={editForm}
            editIconAction={editIconAction}
          />
        )}
        {(type === "text" ||
          type === "hidden" ||
          type === "number" ||
          type === "password" ||
          type === "color") && (
          <input
            {...(register || {})}
            autoComplete={autocomplete || "off"}
            disabled={isDisabled}
            type={showPassword ? "text" : type}
            data-te-inline="true"
            className={`relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary ${
              !leftAddonComponent ? "rounded-l" : ""
            }
            ${type === "password" ? "!pr-8" : ""}
            ${
              error
                ? "!border-red-500 focus:!border-red-500"
                : "border-neutral-400"
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
        {type === "file" && (
          <InputFile
            disabled={isDisabled}
            isEditForm={editForm}
            register={register}
            fileData={fileData}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className={`absolute top-1/2 z-[99] -translate-y-1/2 cursor-pointer ${
              editForm ? "right-[52px]" : "right-2"
            }`}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
        {editForm &&
          type !== "hidden" &&
          type !== "date" &&
          type !== "select" &&
          editIconAction}
      </div>
      {additionalInfo && (
        <p className="text-sm text-red-500">*{additionalInfo}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">
          {(error as string)
            .replaceAll("Required", "Required!")
            .replaceAll("!!", "!")}
        </p>
      )}
    </div>
  );
};

export default Input;
