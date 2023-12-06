/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { useWidthViewport } from "~/common/hooks/core/useWidthViewport";
import { type MODULE_TYPE_CODE } from "~/common/enums/MODULE_TYPE_CODE";
import { type ModuleCountType } from "~/server/api/module/count/getAllModuleCount";

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
    setShowAside,
    moduleCount,
  } = props;
  const { viewportWidth } = useWidthViewport();
  const { role } = useCurrentUser();
  const exceptModule = ["dashboard", "user-management", "sk-rektor"];

  const handleActiveMenu = (
    _url: string,
    _pathName: string
  ): string | undefined => {
    const isActive = _pathName.includes(_url);

    return isActive ? styles.active : "";
  };

  const handleModuleCount = (moduleType: MODULE_TYPE_CODE): ModuleCountType => {
    const filterModule = moduleCount && moduleCount?.filter(
      (val: { module: string }) => val.module === moduleType
    )?.[0];

    return filterModule;
  };

  if (authorization && !authorization?.includes(role as Role)) return null;

  return (
    <li key={id}>
      <Link
        passHref
        href={url}
        className={`${styles.link} ${handleActiveMenu(url, pathName)}`}
        onClick={() => {
          if (viewportWidth && viewportWidth <= 767) {
            setShowAside(false);
          }
          handleCloseCollapse();
        }}
      >
        <div className={styles.icon}>{createElement(icon)}</div>
        <span className={styles.title}>{title}</span>
        {!exceptModule.includes(module) &&
          handleModuleCount(module)?.count > 0 && (
            <span
              className={`${styles.counter} ${
                handleModuleCount(module)?.count > 40 ? "!bg-[#FF7070]" : ""
              }`}
            >
              {handleModuleCount(module)?.count}
            </span>
          )}
      </Link>
    </li>
  );
};

export default LinkBuilder;
