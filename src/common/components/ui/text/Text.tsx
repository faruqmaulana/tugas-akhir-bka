import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const text = cva("", {
  variants: {
    intent: {
      primary: "text-primary",
      secondary: "text-secondary",
      white: "text-white",
      orange: "text-orange",
      grey: "text-grey-1000",
      normal: "text-black",
    },
    size: {
      sm: "text-sm",
      md: "text-[15px] font-medium",
      normal: "text-[20px] md:text-[24px] font-bold",
      lg: "text-[30px] font-bold",
    },
  },
  defaultVariants: {
    intent: "normal",
    size: "lg",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof text> {}

const Text: React.FC<TextProps> = ({
  intent,
  size,
  className,
  children,
  ...props
}) => {
  return (
    <div className={text({ intent, size, class: className })} {...props}>
      {children}
    </div>
  );
};

export default Text;
