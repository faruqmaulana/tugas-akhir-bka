/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as React from "react";
import { format } from "date-fns";

import { Calendar } from "~/common/components/ui/calendar/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/common/components/ui/popover/popover";
import CalendarIcon from "../../svg/CalendarIcon";
import { cn } from "~/common/utils";
import { id } from "date-fns/locale";
import { Controller, type RegisterOptions } from "react-hook-form";
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";
import LoadingInput from "../form/LoadingInput";

export type DatePickerProps = {
  disabled: boolean;
  isEditForm: boolean;
  editIconAction: React.ReactNode;
  control: any;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
  isPreview?: boolean;
  isLoading?: boolean;
};

export function DatePicker(props: DatePickerProps) {
  const {
    control,
    register,
    error,
    disabled,
    isEditForm,
    editIconAction,
    isPreview = false,
    isLoading,
  } = props;
  const [date, setDate] = React.useState<Date>();

  return (
    <Controller
      {...(register || {})}
      name={register?.name || "temp"}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Popover>
            <div className="flex w-full flex-row gap-[1px]">
              {/* RENDER WHEN PREVIEW DATA */}
              {isPreview && isLoading && <LoadingInput />}
              {isPreview && (date || value) && (
                <p className="text-base font-semibold">
                  {format(date || value, "PPP", { locale: id })}
                </p>
              )}
              {/* END OF RENDER WHEN PREVIEW DATA */}

              <PopoverTrigger asChild>
                <button
                  disabled={disabled}
                  className={cn(
                    " w-full flex-wrap items-center justify-start rounded border bg-transparent px-3 py-[0.25rem] text-left font-normal text-neutral-700 shadow-sm disabled:opacity-60",
                    isPreview ? "hidden" : "flex",
                    !date && "text-muted-foreground",
                    error ? "border-red-500" : "border-neutral-400",
                    disabled
                      ? "cursor-not-allowed"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {date || value ? (
                    format(date || value, "PPP", { locale: id })
                  ) : (
                    <span>Pilih Tanggal</span>
                  )}
                </button>
              </PopoverTrigger>
              {isEditForm && editIconAction}
            </div>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(e) => {
                  setDate(e);
                  onChange(e);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
