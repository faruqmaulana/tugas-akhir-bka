/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import { useRouter } from "next/router";
import { createElement, useEffect, useState } from "react";

import styles from "~/styles/partials/Aside.module.scss";

const MenuWithSub = (props: any) => {
  const {
    id,
    icon,
    title,
    submenu,
    index,
    isOpen,
    isAllAccess,
    handleCollapse,
    module,
  } = props;
  const router = useRouter();

  const [subModule, setSubModule] = useState<any[]>([]);

  useEffect(() => {
    const subModuleTemp: any[] = submenu?.map((menu: any) => {
      return { ...menu, url: menu.url.split("?type=")?.[0] };
    });
    setSubModule(isAllAccess ? submenu : subModuleTemp);
  }, [submenu, isAllAccess]);

  const handleActiveMenu = (sub: string): string | undefined => {
    const { type: currentType } = router.query;
    const [tempPath, tempType] = sub.split("?type=");
    const currentPath = router.pathname;
    const isActive =
      currentPath.includes(tempPath as string) && currentType === tempType;

    return isActive ? styles.active : "";
  };

  const handleBackground = (type: string): string => {
    if (type === "Baru") return "!bg-[#fb923c]";
    if (type === "Diajukan Ulang") return "!bg-[#FFD580]";
    if (type === "Disetujui") return "!bg-[#42C997]";
    if (type === "Ditolak") return "!bg-[#FF7070]";

    return "";
  };

  return (
    <li key={id}>
      <button
        type="button"
        className={`${styles.link} ${styles.link__dropdown} ${
          isOpen ? styles.open : ""
        }`}
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
        onClick={() => handleCollapse(index - 1)}
      >
        <div className={styles.icon}>{createElement(icon)}</div>
        <span className={`${styles.titleWithSub} ${isOpen ? styles.open : ""}`}>
          <p>{title}</p>
          <svg
            sidebar-toggle-item="true"
            className={`${styles.arrow} ${isOpen && styles.rotate}`}
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
          >
            <path
              id="Polygon_2"
              data-name="Polygon 2"
              d="M4.232.922a1,1,0,0,1,1.536,0L8.633,4.36A1,1,0,0,1,7.865,6H2.135a1,1,0,0,1-.768-1.64Z"
              transform="translate(6) rotate(90)"
              fill={`${isOpen ? "#ffffff" : "#a0c9f9"}`}
            />
          </svg>
        </span>
      </button>
      <ul className={`${styles.subMenu} ${isOpen ? styles.open : ""}`}>
        {subModule.map((sub: any) => {
          return (
            <li key={sub.id}>
              <Link
                passHref
                href={sub.url}
                className={`${styles.linkSub} ${handleActiveMenu(sub.url)}`}
              >
                <span className={styles.titleSub}>{sub.title}</span>
                {module !== "master-data" && (
                  <span
                    className={`${styles.counter} ${handleBackground(
                      sub.title
                    )}`}
                  >
                    {sub.counter}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export { MenuWithSub };
