/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Image from "next/image";
import Link from "next/link";
import ProfilePhoto from "../../../../../public/profile.jpg";
import UntagLogo from "../../../../../public/untag.jpg";
import { useState } from "react";
import LIST_MENU from "~/common/constants/MENU";
import { useRouter } from "next/router";
import LinkBuilder from "./LinkBuilder";
import { MenuWithSub } from "./MenuWithub";
import styles from "~/styles/partials/Aside.module.scss";
import { USER_NAME, USER_ROLE } from "~/common/constants";

const Aside = ({ showAside }: any) => {
  const router = useRouter();

  const [listMenu, setListMenu] = useState<any[]>(LIST_MENU);

  const handleCollapse = (indexList: number) => {
    const tempCollapseData = [...listMenu];

    tempCollapseData.map((list) => {
      if (tempCollapseData[indexList].type === list.type) {
        tempCollapseData[indexList].isOpen =
          !tempCollapseData[indexList]?.isOpen;
      } else {
        list.isOpen = false;
      }

      return false;
    });

    setListMenu(tempCollapseData);
  };

  const handleCloseCollapse = () => {
    const tempCollapse = [...listMenu];
    tempCollapse.forEach((value: any, indexList: number) => {
      if (value?.isOpen) {
        tempCollapse[indexList].isOpen = !tempCollapse[indexList]?.isOpen;
      }
    });
    setListMenu(tempCollapse);
  };

  return (
    <aside className={`${styles.wrapper} ${!showAside && styles.hide}`}>
      <div className={styles.logo}>
        <Link href="/dashboard" passHref>
          <div className="flex items-center justify-center gap-2">
            <Image
              src={UntagLogo}
              alt="untag-logo"
              width="45"
              height="45"
              placeholder="blur"
              quality={10}
            />
            <div className="h-[50px] border-l border-gray-400"></div>
            <div className="flex flex-col items-center">
              <p className="text-[11px]">Biro Kemahasiswaan dan Alumni</p>
              <p className="text-[12px]">Untag Surabaya</p>
            </div>
          </div>
        </Link>
      </div>

      <div className={styles.profile}>
        <div className={styles.photo}>
          <Image
            src={ProfilePhoto}
            alt="profile photo"
            width="70"
            height="70"
          />
        </div>
        <h1 className={styles.name}>{USER_NAME}</h1>
        <p className={styles.role}>{USER_ROLE}</p>
      </div>

      <div className={styles.menu}>
        <ul>
          {listMenu.map((item: any, index: number) => {
            return !item.submenu ? (
              <LinkBuilder
                {...item}
                key={item.id}
                pathName={router.pathname}
                handleCloseCollapse={handleCloseCollapse}
              />
            ) : (
              <MenuWithSub
                {...item}
                index={index}
                key={item.id}
                isAllAccess={true}
                handleCollapse={handleCollapse}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export { Aside };
