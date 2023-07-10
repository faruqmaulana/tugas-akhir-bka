/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useRef, useState } from "react";

import styles from "~/styles/layout/Header.module.scss";
import HamburgerIcon from "../../svg/HamburgerIcon";
import ArrowIcon from "../../svg/ArrowIcon";
import PersonIcon from "../../svg/PersonIcon";
import LogoutIcon from "../../svg/LogoutIcon";
import { useRouter } from "next/router";
import { RoleManagementIcon } from "../../svg";
import { USER_NAME, USER_ROLE } from "~/common/constants";
import NotificationIcon from "../../svg/NotificationIcon";

const Header = ({ setShowAside, showAside }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const signOutRef = useRef<any>(null);

  const handleHamburgerButton = () => {
    setShowAside(!showAside);
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (!signOutRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
  });

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
      <div className="relative ml-auto mr-5 cursor-pointer">
        <div className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
          <span className=" text-[12px] font-bold text-white">33</span>
        </div>
        <NotificationIcon />
      </div>
      <div className="flex h-full items-center gap-5">
        <div className="relative h-full" ref={signOutRef}>
          <button
            type="button"
            className={styles.profileCorner}
            onClick={() => setOpen(!open)}
          >
            <div className={styles.info}>
              <h1 className={styles.name}>{USER_NAME}</h1>
              <p className={styles.role}>{USER_ROLE}</p>
            </div>

            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </button>
          <div className={`${styles.submenu} `}>
            <ul className={`${styles.unordered} ${open && styles.open}`}>
              <li
                className={`${styles.list} ${
                  router.pathname === "/profile" && styles.active
                }`}
                onClick={() => {
                  setOpen(false);
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
                  setOpen(false);
                  void router.push("/informasi-login");
                }}
              >
                <RoleManagementIcon />
                <button type="button">Informasi Login</button>
              </li>
              <li className={`${styles.list}`}>
                <LogoutIcon />
                <button type="button">Sign out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
