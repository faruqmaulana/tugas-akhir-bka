/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { createElement } from "react";

import styles from "~/styles/partials/Aside.module.scss";

const LinkBuilder = (props: any) => {
  const { id, url, title, pathName, icon, module, handleCloseCollapse } = props;

  const exceptModule = ["dashboard", "user-management"];

  const handleActiveMenu = (
    _url: string,
    _pathName: string
  ): string | undefined => {
    const isActive = _pathName.includes(_url);

    return isActive ? styles.active : "";
  };

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
        {!exceptModule.includes(module) && <span className={styles.counter}>{20}</span>}
      </Link>
    </li>
  );
};

export default LinkBuilder;
