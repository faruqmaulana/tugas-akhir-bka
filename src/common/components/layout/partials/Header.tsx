/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styles from "~/styles/layout/Header.module.scss";
import HamburgerIcon from "../../svg/HamburgerIcon";
import ArrowIcon from "../../svg/ArrowIcon";
import PersonIcon from "../../svg/PersonIcon";
import LogoutIcon from "../../svg/LogoutIcon";
import { RoleManagementIcon } from "../../svg";
import NotificationInfo from "../../ui/notification/NotificationInfo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { type Dispatch, type SetStateAction } from "react";
import { useHeader } from "~/common/hooks/layout/useHeader";
import { useSession } from "next-auth/react";

export type HeaderProps = {
  showAside: boolean;
  setShowAside: Dispatch<SetStateAction<boolean>>;
};

const Header = (props: HeaderProps) => {
  const { showAside } = props;
  const { router, user, handleHamburgerButton, handleSignOut } =
    useHeader(props);

  const { data } = useSession();

  return (
    <header className={`${styles.header} ${showAside && styles.full}`}>
      <button
        className={styles.hamburger}
        type="button"
        onClick={handleHamburgerButton}
      >
        <HamburgerIcon />
      </button>
      <h1 className={styles.title}>BIRO KEMAHASISWAAN DAN ALUMNI</h1>
      <div className="flex h-full items-center gap-5">
        <NotificationInfo />
        <div className="relative h-full">
          <HoverCard>
            <HoverCardTrigger>
              <button type="button" className={styles.profileCorner}>
                <div className={styles.info}>
                  <h1 className={styles.name}>
                    {user?.name || data?.user.name}
                  </h1>
                  <p className={styles.role}>{user?.role || data?.user.role}</p>
                </div>

                <div className={styles.arrow}>
                  <ArrowIcon />
                </div>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="overflow-hidden p-0">
              <ul className={`${styles.submenu}`}>
                <li
                  className={`${styles.list} ${
                    router.pathname === "/profile" && styles.active
                  }`}
                  onClick={() => {
                    void router.push("/profile");
                  }}
                >
                  <PersonIcon />
                  <button type="button">Profile</button>
                </li>
                <li
                  className={`${styles.list} ${
                    router.pathname === "/informasi-login" && styles.active
                  }`}
                  onClick={() => {
                    void router.push("/informasi-login");
                  }}
                >
                  <RoleManagementIcon />
                  <button type="button">Informasi Login</button>
                </li>
                <li className={`${styles.list}`} onClick={handleSignOut}>
                  <LogoutIcon />
                  <button type="button">Sign out</button>
                </li>
              </ul>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  );
};

export { Header };
