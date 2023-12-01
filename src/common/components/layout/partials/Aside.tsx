/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Image from "next/image";
import Link from "next/link";
import ProfilePhoto from "../../../../../public/profile.jpg";
import UntagLogo from "../../../../../public/untag.jpg";
import LinkBuilder from "./LinkBuilder";
import { MenuWithSub } from "./MenuWithub";
import styles from "~/styles/partials/Aside.module.scss";
import { useAside } from "~/common/hooks/layout/useAside";
import { useSession } from "next-auth/react";

const Aside = ({ showAside }: any) => {
  const { router, listMenu, user, handleCollapse, handleCloseCollapse } =
    useAside();

  const { data } = useSession();

  return (
    <aside className={`${styles.wrapper} ${!showAside && styles.hide}`}>
      <div className={styles.logo}>
        <Link href="/dashboard" passHref>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={UntagLogo}
              alt="untag-logo"
              width="45"
              height="45"
              placeholder="blur"
              quality={10}
            />
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
            src={data?.user.image || ProfilePhoto}
            alt="profile photo"
            width="70"
            height="70"
          />
        </div>
        <h1 className={styles.name}>{user?.name || data?.user.name}</h1>
        <p className={styles.role}>{user?.role || data?.user.role}</p>
      </div>

      <div className={styles.menu}>
        <ul>
          {listMenu.map((item: any) => {
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
                index={item.id}
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
