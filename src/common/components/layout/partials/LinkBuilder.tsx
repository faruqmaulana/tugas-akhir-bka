/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { createElement } from "react";

import styles from "~/styles/partials/Aside.module.scss";

const LinkBuilder = (props: any) => {
  const { id, url, title, pathName, icon, handleCloseCollapse } = props;

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
        {createElement(icon)}
        <span className={styles.title}>{title}</span>
      </Link>
    </li>
  );
};

export default LinkBuilder;
