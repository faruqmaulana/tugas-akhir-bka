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

export type DatePickerProps = {
  control: any;
  error?: string;
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
};

export function DatePicker(props: DatePickerProps) {
  const { control, register, error } = props;
  const [date, setDate] = React.useState<Date>();
  return (
    <Controller
      {...(register || {})}
      name={register?.name || "temp"}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex w-full flex-wrap items-center justify-start rounded border bg-transparent px-3 py-[0.25rem] text-left font-normal text-neutral-700 shadow-sm hover:bg-accent hover:text-accent-foreground",
                !date && "text-muted-foreground",
                error ? "border-red-500" : "border-neutral-300"
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
      )}
    />
  );
}
