/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useState } from "react";

export type InputProps = {
  disabled?: boolean;
  leftAddonComponent?: React.ReactNode | string;
  className?: string;
  placeholder: string;
  value?: string;
  label?: string;
  type?: string;
  register?: any;
  additionalInfo?: string;
  selectData?: any[];
  onChange?: (value: string) => void;
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
    additionalInfo = undefined,
    register,
    selectData = undefined,
  } = props;
  const [inputType, setInputType] = useState(type === "date" ? "text" : type);
  const [tempValue, setValue] = useState(value);
  // Handle input value change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };
  return (
    <div className={`relative mt-auto flex flex-col gap-1 ${className}`}>
      {label && <p className="text-[15px] font-medium">{label}</p>}
      <div className="relative flex flex-wrap items-stretch">
        {type === "select" && (
          <div className="relative w-full">
            <select
              disabled={disabled}
              {...(register || {})}
              className={`focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-transparent px-4 py-2 pr-8 leading-tight shadow focus:outline-none ${
                disabled
                  ? "cursor-not-allowed !text-gray-500 opacity-80"
                  : "hover:border-gray-500"
              }`}
            >
              {selectData &&
                selectData?.map((val) => (
                  <option
                    key={val.id}
                    value={val.id}
                    selected={
                      value === val.id ||
                      value?.toLowerCase() === val?.name?.toLowerCase()
                    }
                  >
                    {val.title || val.name}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        )}
        {type === "textarea" && (
          <textarea
            {...(register || {})}
            className={`peer block min-h-[auto] w-full rounded border border-primary bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus-visible:border-primary peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary ${
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
            className={`bg-grey-900 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-900 dark:placeholder:text-neutral-200 ${
              disabled ? "cursor-not-allowed opacity-60" : ""
            }`}
            id="basic-addon1"
          >
            {leftAddonComponent}
          </span>
        )}
        {(type === "text" ||
          type === "date" ||
          type === "number" ||
          type === "password" ||
          type === "color") && (
          <input
            {...(register || {})}
            disabled={disabled}
            type={inputType}
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
            className={`relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary ${
              !leftAddonComponent ? "rounded-l" : ""
            }
          ${
            value
              ? "dark:placeholder:text-neutral-900 "
              : "dark:placeholder:text-neutral-400 "
          }`}
            value={tempValue}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby="basic-addon1"
            onChange={handleInputChange}
          />
        )}
      </div>
      {additionalInfo && (
        <p className="text-sm text-red-500 lg:absolute lg:-bottom-5">
          *{additionalInfo}
        </p>
      )}
    </div>
  );
};

export default Input;
