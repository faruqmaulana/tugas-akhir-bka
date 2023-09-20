/* eslint-disable react/jsx-no-useless-fragment */
import Link from "next/link";
import React from "react";

export type AnchorElementType = {
  href: string | undefined | null | "";
  children: React.ReactNode;
  targetBlank?: boolean;
};

export interface AnchorProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "children">,
    AnchorElementType {}

const Anchor: React.FC<AnchorProps> = ({
  href,
  children,
  targetBlank = false,
  ...props
}: AnchorProps) => {
  if (href === "-") return "-";
  if (href && href !== "") {
    const removeTrailingSlash = href.replace(/\/$/, "");
    const link = removeTrailingSlash;
    const isRelative = link.startsWith("/");

    const target = !isRelative || targetBlank ? "_blank" : "_self";

    return (
      <Link href={link} target={target} {...props}>
        {children}
      </Link>
    );
  }

  return <span {...props}>{children}</span>;
};

export default Anchor;
