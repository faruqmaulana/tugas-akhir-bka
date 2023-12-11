/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { api } from "~/utils/api";
import { type ModuleCountType } from "~/server/api/module/count/getAllModuleCount";
import { useWidthViewport } from "~/common/hooks/core/useWidthViewport";

const Aside = ({ showAside, setShowAside }: any) => {
  const { router, listMenu, user, handleCollapse, handleCloseCollapse } =
    useAside();
  const { viewportWidth } = useWidthViewport();

  const { data } = useSession();
  const { data: moduleCount } =
    api.allModule.getAllModuleCount.useQuery<ModuleCountType[]>();

  const handleUserProfile = () => {
    if ((user?.imageMeta as PrismaJson.FileResponse)?.secure_url) {
      return (user?.imageMeta as PrismaJson.FileResponse)?.secure_url;
    }
    if (user?.image) return user?.image;
    if (data?.user.image) return data?.user.image;

    return ProfilePhoto;
  };

  return (
    <aside className={`${styles.wrapper} ${!showAside && styles.hide}`}>
      <div className={styles.logo}>
        <Link
          href="/dashboard"
          passHref
          onClick={() => {
            if (viewportWidth && viewportWidth <= 767) {
              setShowAside(false);
            }
          }}
        >
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

      <Link
        href="/profile"
        className={styles.profile}
        onClick={() => {
          if (viewportWidth && viewportWidth <= 767) {
            setShowAside(false);
          }
        }}
      >
        <div className={styles.photo}>
          <Image
            fill
            src={handleUserProfile()}
            alt="profile photo"
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1 className={styles.name}>{user?.name || data?.user.name}</h1>
        <p className={styles.role}>{user?.role || data?.user.role}</p>
      </Link>

      <div className={styles.menu}>
        <ul>
          {listMenu.map((item: any) => {
            return !item.submenu ? (
              <LinkBuilder
                {...item}
                key={item.id}
                pathName={router.pathname}
                setShowAside={setShowAside}
                moduleCount={moduleCount}
                handleCloseCollapse={handleCloseCollapse}
              />
            ) : (
              <MenuWithSub
                {...item}
                key={item.id}
                index={item.id}
                isAllAccess={true}
                moduleCount={moduleCount}
                setShowAside={setShowAside}
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
