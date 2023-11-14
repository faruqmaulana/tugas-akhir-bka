/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, type RegisterOptions } from "react-hook-form";
import { CurrencyInput } from "input-currency-react";
import React from "react";

export type InputCurrencyType = {
  control: any;
  register?: (
    name: string,
    options?: RegisterOptions
  ) => (ref: HTMLInputElement | null) => void;
};

const InputCurrency = (props: InputCurrencyType) => {
  const { control, register } = props;

  if (typeof window !== "undefined") {
    return (
      <Controller
        {...(register || {})}
        name={register?.name || "temp"}
        control={control}
        render={({ field: { value, onChange } }) => (
          <CurrencyInput
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] !text-left text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-900 dark:focus:border-primary"
            value={value}
            options={{
              allowNegative: false,
              precision: 0,
              style: "currency",
              alwaysNegative: false,
              locale: "id-ID", // Format Type
              i18nCurrency: "IDR", // Symbol
            }}
            onChangeEvent={(_, maskedValue) => {
              onChange(maskedValue);
            }}
            required={true}
          />
        )}
      />
    );
  }

  return null;
};

export default InputCurrency;
