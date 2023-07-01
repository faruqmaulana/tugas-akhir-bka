import { type ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  subHeaderClassName?: string;
  header?: string;
  subHeader?: string;
  style?: any;
};
