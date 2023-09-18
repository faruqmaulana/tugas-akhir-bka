import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonForm?: string;
  children: ReactNode;
  buttonIcon?: ReactNode;
  loaderIcon?: ReactNode;
  className?: string;
  hasChecklistPoint?: any;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isSuccess?: boolean;
  isDanger?: boolean;
  isDisabled?: boolean;
  isGray?: boolean;
  isGrayGradient?: boolean;
  isPurple?: boolean;
  isSubmit?: boolean;
  isSmall?: boolean;
  isMedium?: boolean;
  isLarge?: boolean;
  isUppercase?: boolean;
  isLoading?: boolean;
  hover?: boolean;
};
