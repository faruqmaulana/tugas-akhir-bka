/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { createElement } from "react";
import { useCurrentUser } from "~/common/hooks/module/profile";
import { type Role } from "@prisma/client";

import styles from "~/styles/partials/Aside.module.scss";

const LinkBuilder = (props: any) => {
  const {
    id,
    url,
    title,
    pathName,
    icon,
    module,
    counter,
    handleCloseCollapse,
    authorization,
  } = props;

  const { role } = useCurrentUser();
  const exceptModule = ["dashboard", "user-management", "sk-rektor"];

  const handleActiveMenu = (
    _url: string,
    _pathName: string
  ): string | undefined => {
    const isActive = _pathName.includes(_url);

    return isActive ? styles.active : "";
  };

  if (authorization && !authorization?.includes(role as Role)) return null;

  return (
    <li key={id}>
      <Link
        passHref
        href={url}
        className={`${styles.link} ${handleActiveMenu(url, pathName)}`}
        onClick={() => {
          handleCloseCollapse();
        }}
      >
        <div className={styles.icon}>{createElement(icon)}</div>
        <span className={styles.title}>{title}</span>
        {!exceptModule.includes(module) && (
          <span
            className={`${styles.counter} ${
              counter > 40 ? "!bg-[#FF7070]" : ""
            }`}
          >
            {counter}
          </span>
        )}
      </Link>
    </li>
  );
};

export default LinkBuilder;
